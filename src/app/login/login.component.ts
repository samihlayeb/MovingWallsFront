import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Token} from '../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.user).subscribe((data : Token) => {
        console.log(data);
        let token = data.token;
        localStorage.setItem('token' , token);
        console.log(data);
      }, (error: HttpErrorResponse) => console.error(error.message),
      () => {
        console.log('login successfully');
      });
  }

  logout() {
    localStorage.clear();
  }

}
