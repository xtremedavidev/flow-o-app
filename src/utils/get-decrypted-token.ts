"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { decryptToken } from "./encrypt-token";

export async function getDecryptedToken(): Promise<string | undefined> {
  const token = cookies().get("token")?.value;

  if (!token) {
    revalidatePath("/");  
    return undefined;
  }

  const decryptedToken = decryptToken(decodeURIComponent(token));
  return decryptedToken;
}
