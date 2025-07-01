import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const encoder = new TextEncoder();
const JWT_SECRET = encoder.encode(secret);

export async function verifyJwtEdge(token: string): Promise<any | null> { // eslint-disable-line
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) { /* eslint-disable-line */
    console.error("JWT verification failed:", err);
    return null;
  }
}
