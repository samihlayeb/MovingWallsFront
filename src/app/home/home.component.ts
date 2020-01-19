import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@angular/material';
import * as moment from 'moment';
import {RestService} from '../rest.service';
import {Campaign} from '../models/Campaign';
import {Response} from '../models/response';

// export interface location {
//   value: string;
//   viewValue: string;
// }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sortedData: Campaign[];
  searchText : string;
  campaignList : Campaign[] = [];
  listSize : number ;
  expandMenu: boolean;
  // locations: location[] = [
  //   {value: 'Malaysia', viewValue: 'Malaysia'},
  //   {value: 'Hungary', viewValue: 'Hungary'},
  //   {value: 'France', viewValue: 'France'},
  //   {value: 'Singapore', viewValue: 'Singapore'}
  // ];

  constructor(private router: Router, private service: RestService) {
    this.sortedData = this.campaignList.slice();
  }

  ngOnInit() {
    moment.locale('EN');
    let user = localStorage.getItem('currentUser');
    if (!user) {
      this.router.navigateByUrl('/login');

    }
    this.getAll() ;
  }
  getAll() {
    this.service.getBetween(0,10).subscribe((data: Response) =>  {
      console.log(data);
      this.campaignList = data.data;
      this.listSize = data.dataSize;
    })
  }
  search() {
    if (this.searchText=="") {
      this.getAll();
    }
    else {
      this.service.searchBy(0, 10, "company", this.searchText).subscribe((data: Response) => {
        this.campaignList = data.data;
        this.listSize = data.dataSize;

      })
    }
  }


  expandSideBar(cta: HTMLDivElement) {
    cta.classList.toggle('active');
  }

  togglesidebarmenu(sidebarmenu: HTMLDivElement) {
    sidebarmenu.classList.remove('flowHide');
    sidebarmenu.classList.toggle('full-side-bar');
    this.expandMenu = !this.expandMenu;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  sortData(sort: Sort) {
    const data = this.campaignList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

  }
}

