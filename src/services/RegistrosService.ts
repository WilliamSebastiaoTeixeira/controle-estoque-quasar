import { http } from './index'

export interface Unidade {
  dataValidade: string
  descricao: string
}

export interface ProdutoUnidades {
  produto: string
  unidades: Unidade[]
}

export interface Message {
  message: string
}

export default class RegistroService {
  async registrarEntrada(produtos: ProdutoUnidades[]): Promise<Message> {
    const { data } = await http.post('/registro/registrar-entrada', { produtos: produtos })
    return data
  }
}
