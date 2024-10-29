import { decryptToken } from "./encrypt-token";

export const getToken = (): string | null => {
  const encryptedToken = localStorage.getItem("token");
  if (!encryptedToken) {
    return null;
  }

 
  return decryptToken(encryptedToken);
};
