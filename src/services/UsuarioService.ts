import { http } from './index'

export interface Usuario {
  id?: string
  nome: string
  email: string
  senha: string
  permissoes: string[]
}

export interface MeuPerfil {
  nome: string
  email: string
  senha: string
}

export interface Permissoes {
  value: string
  label: string
}

export interface Message {
  message: string
}
export default class UsuarioService {
  async listUsuarios(): Promise<Usuario[]> {
    const { data } = await http.get('/users/list')
    return data
  }

  async listPermissoes(): Promise<Permissoes[]> {
    const { data } = await http.get('/users/permissoes')
    return data
  }

  async createUsuario(usuario: Usuario): Promise<Message> {
    const { data } = await http.post('/users/create', { ...usuario })
    return data
  }

  async updateUsuario(usuario: Usuario): Promise<Message> {
    const { data } = await http.post('/users/update', { ...usuario })
    return data
  }

  async getMeuPerfil(): Promise<Usuario> {
    const { data } = await http.get('/users/get-meu-perfil')
    return data
  }

  async updateMeuPerfil(usuario: MeuPerfil): Promise<Message> {
    const { data } = await http.post('/users/update-meu-perfil', { ...usuario })
    return data
  }

  async updateMeuPerfilPermissoes(permissoes: string[]): Promise<Message> {
    const { data } = await http.post('/users/update-meu-perfil-permissoes', { permissoes: permissoes })
    return data
  }

  async deleteUsuario(_id: String): Promise<Message> {
    const { data } = await http.post('/users/delete', { _id: _id })
    return data
  }
}
