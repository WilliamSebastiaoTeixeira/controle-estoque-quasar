import { http } from './index'

export interface Registro {
  pageTotal?: number
  _id: string,
  dataEntrada: string | null,
  dataSaida: string | null,
  entrada: boolean,
  produtos: {
    nome: string
    unidades: {
      descricao: string
      dataValidade: string
    }[]
  }[],
  usuario: {
    nome: string,
    email: string
  }
}

export interface Unidade {
  dataValidade: string | null
  descricao: string
  dataInserido?: string
  dataRemovido?: string
  _id?: string
}

export interface ProdutoUnidades {
  produto: string
  unidades: Unidade[]
}

export interface IdProdutoUnidades {
  [key: string]: string[]
}

export interface Message {
  message: string
}

interface Pagination<T> {
  list: T[],
  pageTotal: number
}

export default class RegistroService {
  async registrarEntrada(produtos: ProdutoUnidades[]): Promise<Message> {
    const { data } = await http.post('/registro/registrar-entrada', { produtos: produtos })
    return data
  }

  async registrarSaida(produtos: IdProdutoUnidades[]): Promise<Message> {
    const { data } = await http.post('/registro/registrar-saida', { produtos: produtos })
    return data
  }

  async listRegistros(pagination?: { skip: number, limit: number, termo: string }): Promise<Pagination<Registro>> {
    if (pagination) {
      const { data } = await http.get('/registro/list', { params: pagination })
      return data
    }
    const { data } = await http.get('/registro/list')
    return data
  }

  async listUnidadesByProduto(produtoId: string): Promise<Message> {
    const { data } = await http.post('/registro/list-produto-unidades', { produtoId: produtoId })
    return data
  }
}
