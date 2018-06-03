import { Component, OnInit } from '@angular/core';
import { AuthService, NetworkService } from '../../../shared';
import { User } from '../../../../entities/User';
import { routerTransition } from '../../../router.animations';
import { UserElement } from '../../../../entities/UserElement';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users-friends',
  templateUrl: './users-friends.component.html',
  styleUrls: ['./users-friends.component.scss'],
  animations: [routerTransition()]
})
export class UsersFriendsComponent implements OnInit {
  
  currentUser: User
  users: User[]
  dataSource: MatTableDataSource<any>
  displayedColumns: Array<any>

  constructor(private _auth: AuthService, private _network: NetworkService) { }

  async ngOnInit() {
    this.currentUser = await this._auth.fetchCurrentUserInfo();
    this.users = await this.getUsersAndFriends();
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.getUserElement();
  }

  async getUsersAndFriends()
  {
    const friends = await this._network.request('get', 'users/friends') as Array<any>
    const users = await this._network.request('get', 'users') as Array<any>

    this.currentUser.friends = friends.map(
      item => new User(
        item['name'], item['email'], null, item['id']
      )
    )

    return users
      .filter(i => i.id !== this.currentUser.id)
      .map(
        item => new User(item['name'], item['email'], null, item['id'])
      );
  }

  getUserElement() {
    this.displayedColumns = ['userName', 'status', 'actions'];
    const userElement: UserElement[] = [];
    for (let user of this.users) {
      userElement.push(new UserElement({
        id: user.id,
        userName: user.fullName,
        status: this.currentUser.isFriendOf(user) ? 'Friend' : 'Stranger'
      }));
    }
    return userElement;
  }

  async addFriend(user: User) {
    const response = await this._network.request('post', `users/${user.id}/add_friend`) as Array<any>

    if (response['success']) {
      this.currentUser.friends.push(user);
    }

    this.dataSource.data = this.getUserElement();
  }

  async removeFriend(user: User) {
    const response = await this._network.request('post', `users/${user.id}/remove_friend`);

    if (response['success']) {
      this.currentUser.friends = this.currentUser.friends.filter(
        i => i.id !== user.id
      );
    }

    this.dataSource.data = this.getUserElement();
  }

}
