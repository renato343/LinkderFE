import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(SERVER_API_URL + `api/register`, user);
  }
}
