import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@angular/material';
import * as moment from 'moment';
import {RestService} from '../rest.service';
import {Campaign} from '../models/Campaign';
import {Response} from '../models/response';

export interface location {
  value: string;
  viewValue: string;
}

export interface dat {
  value: string;
  viewValue: string;
}
export interface sorting {
  value: string;
  viewValue: string;
}
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
  i: number =0;
  j:number = 10 ;
  locations: location[] = [
    {value: 'Malaysia', viewValue: 'Malaysia'},
    {value: 'Hungary', viewValue: 'Hungary'},
    {value: 'France', viewValue: 'France'},
    {value: 'Singapore', viewValue: 'Singapore'}
  ];
  dates: dat[] = [
    {value: 'Today', viewValue: 'Today'},
    {value: 'Tomorrow', viewValue: 'Tomorrow'},
    {value: 'Last week', viewValue: 'Last Month'},
    {value: 'Last Month ', viewValue: 'Last Month'},
    {value: 'Last year', viewValue: 'Last year'}
  ];
  sortings: sorting[] = [
    {value:'Dat' , viewValue: 'Date'},
    {value:'Stat' , viewValue: 'Status'},
    {value:'Alphabetical ' , viewValue: 'Alphabetical order'}
  ]

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
    this.service.getBetween(this.i,this.j).subscribe((data: Response) =>  {
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
      this.service.searchBy(this.i, this.j, "company", this.searchText).subscribe((data: Response) => {
        this.campaignList = data.data;
        this.listSize = data.dataSize;

      })
    }
  }
  sort() {
    this.service.sort(this.i,this.j).subscribe((data: Response) => {
      this.campaignList =data.data;
      this.listSize = data.dataSize;
    })
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

  getNext() {
    this.i = this.i+10;
    this.j = this.j+10;
    console.log(this.i) ;
    this.service.getBetween(this.i,this.j).subscribe((data: Response) =>  {
      console.log(data);
      this.campaignList = data.data;
      this.listSize = data.dataSize;
    })
  }
}

