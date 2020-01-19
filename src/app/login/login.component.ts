import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Token} from '../models/token';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  rememberMe: boolean;
  constructor(private authService: AuthService, private router : Router) {
  }

  ngOnInit() {
    let user = localStorage.getItem("currentUser");
    if(user) {
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    let rememberMeNumber = this.rememberMe ? 1 : 0;
    this.authService.authenticate(this.user,rememberMeNumber).subscribe((data : Token) => {
        console.log(data);
        let token = data.token;
        localStorage.setItem('token' , token);
        localStorage.setItem('currentUser' , "{userName: 'mv', password : 'mv'}");
        console.log(data);
      }, (error: HttpErrorResponse) => console.error(error.message),
      () => {
        console.log('login successfully');
        this.router.navigateByUrl('/home');
      });
  }
}
