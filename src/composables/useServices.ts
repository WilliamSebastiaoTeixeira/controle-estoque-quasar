import LoginService from '../services/LoginService'
import UsuarioService from '../services/UsuarioService'

export function useServices() {
  return {
    loginService: new LoginService(),
    usuarioService: new UsuarioService()
  }
}
