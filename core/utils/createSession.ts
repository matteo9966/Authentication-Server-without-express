import { randomBytes } from "crypto";
import { promisify } from "util";

const randomBPromisified = promisify(randomBytes);

export const generateSessionId =async()=>{
  const rBytes = await randomBPromisified(32)
  return rBytes.toString('hex')
}