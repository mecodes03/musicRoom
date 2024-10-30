import { GoogleUser } from "../app/api/oauth/google/callback/route";
import { SpotifyUser } from "../app/api/oauth/spotify/callback/route";
import { linkGoogleAccount, linkSpotifyAccount } from "../data-access/accounts";
import { createProfile } from "../data-access/profiles";
import { createUser, getUserByEmail } from "../data-access/users";

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser();
  }

  await linkGoogleAccount(existingUser.id, googleUser.email, googleUser.sub);

  await createProfile(existingUser.id, googleUser.name, googleUser.picture);

  return existingUser.id;
}

export async function createSpotifyUserUseCase(SpotifyUser: SpotifyUser) {
  let existingUser = await getUserByEmail(SpotifyUser.email);

  if (!existingUser) {
    existingUser = await createUser();
  }

  await linkSpotifyAccount(existingUser.id, SpotifyUser.email, SpotifyUser.id);

  await createProfile(
    existingUser.id,
    SpotifyUser.display_name,
    SpotifyUser.images[0].url
  );

  return existingUser.id;
}
