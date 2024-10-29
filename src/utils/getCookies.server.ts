"use server"

import { cookies } from "next/headers";

export async function getCookiesFromServer() {
  return cookies().get("token")?.value;
}