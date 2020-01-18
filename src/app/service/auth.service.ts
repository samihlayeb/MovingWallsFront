import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {URLS} from '../constants/URLS';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  authenticate(user : User) {
    return this.http.post(URLS.BASEURL + URLS.LOGIN,user);
  }
}
