import { Injectable } from '@angular/core';
import { KeyEnum } from '../resources/keyEnum.enum';

@Injectable()
export class CacheService {

  constructor() {
  }

  public getkey(key: KeyEnum, session: boolean): any {
    try {
      const dato = session ? sessionStorage.getItem(key) : localStorage.getItem(key);
      if(dato){
        const datoResponse = JSON.parse(dato);
        return datoResponse;
      } else {
        return null;
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  public setKey(key: KeyEnum, obj: Object, session: boolean): void {
    try {
      this.limpiarclave(key, session);
      session ? sessionStorage.setItem(key, JSON.stringify(obj)) : localStorage.setItem(key, JSON.stringify(obj));
    }
    catch (error) {
      console.error(error);
    }
  }

  public limpiarclave(key: KeyEnum, session: boolean): void {
    try {
      session ? sessionStorage.removeItem(key) : localStorage.removeItem(key);
    }
    catch (error) {
      console.error(error);
    }
  }

  public limpiarCache(session: boolean, local: boolean): void {
    try {
      if (session) {
        sessionStorage.clear();
      }

      if (local) {
        localStorage.clear();
      }
    }
    catch (error) {
      console.error(error);
    }
  }

}
