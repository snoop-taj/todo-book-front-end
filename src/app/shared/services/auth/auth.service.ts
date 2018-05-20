import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../entities/User';
import { Router } from '@angular/router';

const BACKEND_DOMAIN = 'http://127.0.0.1';

@Injectable()
export class AuthService {
  public currentUser : User
  private _cachedToken;

  constructor(
    private _http : HttpClient,
    private router: Router
  ) { }

  register(user : User) {
    return this._http.post(this.buildUrl('/api/auth/register'), {
      name: user.fullName,
      email: user.email,
      password: user.password
    }).toPromise();
  }

  async login(user: User) {
    try {
      const response = await this._http.post(this.buildUrl('/api/auth/login'), {
        email: user.email,
        password: user.password
      }).toPromise();

      const accessToken = response['access_token'];

      if (!accessToken) {
        return false;
      }

      this.token = accessToken;

      return true;

    } catch(error) {
      if (error.status === 401) {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
      }
      return false;
    }
  }

  async fetchCurrentUserInfo() {
    try {
      const response = await this._http.get(this.buildUrl('/api/auth/personal_detail'), {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).toPromise();

      this.currentUser = new User(
        response['name'],
        response['email'],
        null,
        response['id']
      );

      return this.currentUser;
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
      }
      throw error;
    }
  }

  get token() {
    if (this._cachedToken) {
      return this._cachedToken;
    }

    const tokenFromStorage = localStorage.getItem('access_token');

    if (tokenFromStorage) {
      this._cachedToken = tokenFromStorage;
      return tokenFromStorage;
    }
  }

  set token(value) {
    this._cachedToken = value;

    if(value) {
      localStorage.setItem('access_token', value);
      localStorage.setItem('isLoggedin', 'true');
    } else {
      localStorage.removeItem('access_token');
      localStorage.setItem('isLoggedin', 'false');
    }
  }

  buildUrl(path) {
    return BACKEND_DOMAIN + path;
  }
}
