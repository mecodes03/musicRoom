"use server";

import { getAccountByGoogleIdUseCase } from "../use-cases/accounts";

export async function testDb() {
  console.log("server action...");

  try {
    const account = await getAccountByGoogleIdUseCase("google_id");
    if (!account) {
      return { success: false, message: "Account not found" };
    }
    return { success: true, data: account };
  } catch (error) {
    console.error("Error fetching account:", error);
    return {
      success: false,
      message: "An error occurred while fetching the account",
    };
  }
}
