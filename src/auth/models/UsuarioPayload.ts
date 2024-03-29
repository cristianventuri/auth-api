export interface UsuarioPayload  {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  expt?: number;
}