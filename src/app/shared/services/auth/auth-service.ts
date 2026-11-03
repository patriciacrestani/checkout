import { Injectable } from '@angular/core';
import { usuarioDataMock } from '../../../../mocks/data/usuario-data-mock';
import { Usuario } from '../../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  obterUsuarioLogado(): Usuario {
    return { ...usuarioDataMock };
  }
}
