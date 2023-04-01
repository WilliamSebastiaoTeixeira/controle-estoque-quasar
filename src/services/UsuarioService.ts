import { http } from './index'

export interface Usuario {
  nome: string
  email: string
  senha: string
}

export interface Message {
  message: string
}
export default class UsuarioService {
  async listUsuarios(): Promise<Usuario[]> {
    const { data } = await http.get('/users/list')
    return data
  }

  async createUsuario(usuario: Usuario): Promise<Message> {
    const { data } = await http.post('/users/create', { ...usuario })
    return data
  }

  async UpdateUsuario(usuario: Usuario): Promise<Message> {
    const { data } = await http.post('/users/update', { ...usuario })
    return data
  }

  async deleteUsuario(_id: String): Promise<Message> {
    const { data } = await http.post('/users/delete', { _id: _id })
    return data
  }
}
