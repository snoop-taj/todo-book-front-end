import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { User } from '../../../../entities/User';

@Injectable()
export class UserService {
  private _cached : any = {};

  constructor(
    private _network: NetworkService
    ) { }

  async getUserDetails(id) {
    const cached = this._cached[id];

    if (cached) {
      if (cached.user) {
        return cached.user
      }

      return cached.fetchPromise;
    }

    const fetchPromise = new Promise(async (resolve) => {
      const response = await this._network.request('get', `users/${id}`) as Array<any>;

      const user = new User(response['name'], response['email'], null, response['id']);

      this._cached[id] = {
        user,
        fetchPromise: null
      };

      resolve(user);
    });

    this._cached[id] = {
      user: null,
      fetchPromise
    };

    return fetchPromise;
  }

}
