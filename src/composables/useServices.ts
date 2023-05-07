import LoginService from '../services/LoginService'
import UsuarioService from '../services/UsuarioService'
import ProdutosService from '../services/ProdutosService'
import RegistroService from 'src/services/RegistrosService'

export function useServices() {
  return {
    loginService: new LoginService(),
    usuarioService: new UsuarioService(),
    produtosService: new ProdutosService(),
    registroService: new RegistroService(),
  }
}
