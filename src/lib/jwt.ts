import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

// Assina o JWT
export function signJwt(payload: object, expiresIn: SignOptions['expiresIn'] = '1h'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

// Verifica o JWT e retorna o payload se válido, ou null se inválido
export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}


// | Função      | O que faz                     | Uso típico                        |
// | ----------- | ----------------------------- | --------------------------------- |
// | `signJwt`   | Cria um token para um usuário | Quando o usuário faz login        |
// | `verifyJwt` | Valida o token recebido       | Em middleware ou rotas protegidas |