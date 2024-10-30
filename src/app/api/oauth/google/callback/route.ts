import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { google } from "@/lib/auth/auth";
import { createGoogleUserUseCase } from "@/use-cases/users";
import { getAccountByGoogleIdUseCase } from "@/use-cases/accounts";
import { afterLoginUrl } from "@/app-config";
import { setSession } from "@/lib/auth/session";
import { getSpotifyAccountByEmail } from "@/data-access/accounts";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    console.log(tokens.refreshToken);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const googleUser: GoogleUser = await response.json();
    console.log("googleUserEmail : ", googleUser.email);

    const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub);
    console.log("accountByGoogleId : ", existingAccount?.email);

    if (existingAccount) {
      await setSession({
        userId: existingAccount.userId,
        googleAccessToken: tokens.accessToken,
        googleRefreshToken: tokens.refreshToken!,
        googleAccessTokenExpiresAt: tokens.accessTokenExpiresAt,
      });

      return new Response(null, {
        status: 302,
        headers: {
          Location: afterLoginUrl,
        },
      });
    }

    // not likend yet. now we'll link (but first we'll have to see if spotify account exists with this email. if yes, then we'll just link the google account to user.if not, we'll create new user and then link the account )
    const spotifyAccount = await getSpotifyAccountByEmail(googleUser.email);
    console.log("spotifyAccount : ", spotifyAccount?.email);

    let userId: number;

    if (!spotifyAccount) userId = await createGoogleUserUseCase(googleUser);
    else userId = spotifyAccount.userId;

    await setSession({
      userId,
      googleAccessToken: tokens.accessToken,
      googleRefreshToken: tokens.refreshToken!,
      googleAccessTokenExpiresAt: tokens.accessTokenExpiresAt,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: afterLoginUrl,
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
