import { http } from './index'

export interface Produto {
  _id?: string
  nome: string
  qtdUnidades: number
  descricao: string
  subModulo?: string
}

export interface Message {
  message: string
}

export default class ProdutosService {
  async listProdutos(subModulo?: string): Promise<Produto[]> {

    if (subModulo) {
      const { data } = await http.get('/produtos/list', { params: { subModulo: subModulo } })
      return data
    }

    const { data } = await http.get('/produtos/list')
    return data
  }

  async createProduto(produto: Produto): Promise<Message> {

    if (produto.subModulo) {
      const { data } = await http.post('/produtos/create', { params: { subModulo: produto.subModulo }, ...produto })
      return data
    }

    const { data } = await http.post('/produtos/create', { ...produto })
    return data
  }

  async updateProduto(produto: Produto): Promise<Message> {
    const { data } = await http.post('/produtos/update', { ...produto })
    return data
  }

  async deleteProduto(_id: String): Promise<Message> {
    const { data } = await http.post('/produtos/delete', { _id: _id })
    return data
  }

  async getById(_id: string): Promise<Produto> {
    const { data } = await http.post('/produtos/find-by-id', { _id: _id })
    return data
  }

  async getByParam(param: string): Promise<Produto[]> {
    const { data } = await http.post('/produtos/list-by-param', { param: param })
    return data
  }
}
