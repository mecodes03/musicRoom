import {
  getAccountBySpotifyId,
  getAccountByGoogleId,
} from "../data-access/accounts";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}

export async function getAccountBySpotifyIdUseCase(SpotifyId: string) {
  return await getAccountBySpotifyId(SpotifyId);
}
