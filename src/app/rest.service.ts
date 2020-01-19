import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLS} from './constants/URLS';
import {Observable} from 'rxjs';
import {Response} from './models/response';
import {Campaign} from './models/Campaign';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  headers = new HttpHeaders().append('x-access-token', localStorage.getItem("token"));
  constructor(private http: HttpClient) {

    console.log(localStorage.getItem("token"));
  }

  public getBetween(startIndex, endIndex) :Observable<Response> {
    return this.http.post<Response>(URLS.BASEURL + URLS.GET,{indexStart : startIndex, indexEnd: endIndex},{headers : this.headers});
  }
  public searchBy(startIndex, endIndex,searchParam,value) :Observable<Response> {
    return this.http.post<Response>(URLS.BASEURL + URLS.SEARCH,
      {indexStart : startIndex, indexEnd: endIndex,searchParam: searchParam,value:value},
      {headers : this.headers});
  }
  public sort(startIndex, endIndex) :Observable<Response> {
    return this.http.post<Response>(URLS.BASEURL + URLS.SORT,{indexStart : startIndex, indexEnd: endIndex},
      {headers : this.headers});
  }
}
