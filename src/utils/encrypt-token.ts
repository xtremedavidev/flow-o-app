import CryptoJS from "crypto-js";

export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(
    token,
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY as string,
  ).toString();
};

export const decryptToken = (encryptedToken: string): string => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedToken,
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY as string,
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
