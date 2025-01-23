"use server";
import { invalidateSession, validateRequest } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const { session } = await validateRequest();

  if (!session) redirect("/connect");

  await invalidateSession(session.id);
  redirect("/signed-out");
}
