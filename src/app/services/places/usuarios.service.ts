import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mockedUsers from '../../resources/mockedData/users.json';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
  ) {
  }

  private readonly url = environment.api + 'api';

  public getUserById(id: number): User {
    return mockedUsers.users.find(u => u.id == id) as User;
  }

}
