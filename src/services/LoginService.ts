import { http } from './index'

export interface LoginRequest {
  email: string
  senha: string
}

export interface Usuario {
  _id: string,
  nome: string
}

export interface LoginResponse {
  token: string,
  usuario: Usuario
}

export default class LoginService {
  async login(params: LoginRequest): Promise<LoginResponse> {
    console.log(params)
    const { data } = await http.post('/login', params)
    return data
  }
}
