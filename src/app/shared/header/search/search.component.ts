import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor(private sharedService: SharedService) { }


  openSearch(){
    this.sharedService.openBarSearch()
  }

  ngOnInit(): void {
  }

}
