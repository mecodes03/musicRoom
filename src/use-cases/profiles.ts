import { getProfileByUserId } from "@/data-access/profiles";

export async function getProfileByUserIdUseCase(userId: number) {
  return getProfileByUserId(userId);
}
