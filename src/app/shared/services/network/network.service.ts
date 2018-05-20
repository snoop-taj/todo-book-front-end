import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NetworkService {

  BACKEND_DOMAIN = 'http://127.0.0.1';
  nameSpace = '/api';

  constructor(
    private _auth: AuthService,
    private _http: HttpClient
  ) { }

  public async request(type, url, options = {}, addNameSpace = true) {
    url = this.buildUrl(url, addNameSpace);
    
    options = Object.assign(this.getDefaultOptions(), options);

    return await this._http.request(type, url, options).toPromise();
  }

  getDefaultOptions()
  {
    return {
      headers: {
        Authorization: `Bearer ${this._auth.token}`
      }
    };
  }

  public buildUrl(url, addNameSpace) {
    let result = this.BACKEND_DOMAIN;

    if (addNameSpace) {
      result += this.nameSpace;
    }

    result += `/${url}`;

    return result;
  }

}
