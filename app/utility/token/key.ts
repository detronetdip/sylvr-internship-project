import { readFileSync } from "fs";
import path from "path";
export function getPrivateKey(): string {
  const Path = path.resolve(__dirname, "..", "key", "private.pem");
  return readFileSync(Path, "utf8");
}
export function getPublicKey(): string {
  const Path = path.resolve(__dirname, "..", "key", "public.pem");
  return readFileSync(Path, "utf8");
}
