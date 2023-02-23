import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { Categories } from 'src/app/shared/interfaces/Categories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  showLaptops: boolean = true;
  showSmartphone: boolean = false;
  showVideoCard: boolean = false;
  showCategories: boolean = false;
  seeMore: string = 'Ver más';
  listCategories: string[] = [
    'Drones & Camcorders',
    'Gaming',
    'Graphics Cards',
    'Hard Drives and Memory',
    'Home Life',
    'Routers and Networking',
    'Smart Home',
    'image.png',
    'Printers',
    'TVs, Monitors Projectors',
    'Smart Watches',
    'Surveillance',
  ];

  categoriesList: Categories[] = [];

  constructor(public bymiaService: BymiaService) {
    bymiaService
      .getCategoriesList()
      .subscribe(resp => (this.categoriesList = resp));
    //console.log(this.categoriesList);
  }

  ngOnInit(): void {}

  showLaptopsNav() {
    this.showLaptops = true;
    this.showSmartphone = false;
    this.showVideoCard = false;
  }

  showSmarphoneNav() {
    this.showLaptops = false;
    this.showSmartphone = true;
    this.showVideoCard = false;
  }

  showVideoCardNav() {
    this.showLaptops = false;
    this.showSmartphone = false;
    this.showVideoCard = true;
  }

  showListCategories() {
    if (this.showCategories) {
      this.showCategories = false;
      this.seeMore = 'Ver más';
    } else {
      this.showCategories = true;
      this.seeMore = 'Ver menos';
    }
  }
}
