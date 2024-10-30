import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { spotify } from "@/lib/auth/auth";
import { createSpotifyUserUseCase } from "@/use-cases/users";
import { getAccountBySpotifyIdUseCase } from "@/use-cases/accounts";
import { setSession } from "@/lib/auth/session";
import { afterLoginUrl } from "@/app-config";
import { getGoogleAccountByEmail } from "@/data-access/accounts";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("spotify_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("spotify_code_verifier")?.value ?? null;

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
    const tokens = await spotify.validateAuthorizationCode(code);
    const response = await fetch(
      "https://openidconnect.spotifyapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );

    const spotifyUser: SpotifyUser = await response.json();

    // if already linked then just mutate session/tokens
    const existingSpotifyAccount = await getAccountBySpotifyIdUseCase(
      spotifyUser.id
    );

    if (existingSpotifyAccount) {
      await setSession({
        userId: existingSpotifyAccount.userId,
        spotifyAccessToken: tokens.accessToken,
        spotifyRefreshToken: tokens.refreshToken,
        spotifyAccessTokenExpiresAt: tokens.accessTokenExpiresAt,
      });

      return new Response(null, {
        status: 302,
        headers: {
          Location: afterLoginUrl,
        },
      });
    }

    // not likend yet. now we'll link (but first we'll have to see if spotify account exists with this email. if yes, then we'll just link the spotify account to user.if not, we'll create new user and then link the account )
    const spotifyAccount = await getGoogleAccountByEmail(spotifyUser.email);

    let userId: number;
    if (!spotifyAccount) userId = await createSpotifyUserUseCase(spotifyUser);
    else userId = spotifyAccount.userId;

    await setSession({
      userId,
      spotifyAccessToken: tokens.accessToken,
      spotifyRefreshToken: tokens.refreshToken!,
      spotifyAccessTokenExpiresAt: tokens.accessTokenExpiresAt,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: afterLoginUrl,
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
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

export type SpotifyUser = {
  country: string;
  display_name: string;
  email: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  product: string;
  uri: string;
};
