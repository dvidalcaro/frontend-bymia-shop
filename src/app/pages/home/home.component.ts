import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { Banner } from 'src/app/shared/interfaces/Banner';
import { Categories } from 'src/app/shared/interfaces/Categories';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';
import { HomeSection } from 'src/app/shared/interfaces/HomeSection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  showLaptops: boolean = true;
  showSmartphone: boolean = false;
  showVideoCard: boolean = false;
  showCategories: boolean = false;
  showBanners: boolean = false;
  seeMore: string = 'Ver más';
  banners: Banner[] = [];
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

  homeSections: HomeSection[] = [];

  moreProducts: FeaturedProduct[] = [];
  index: number = 0;
  limit: number = 4;

  constructor(public bymiaService: BymiaService) {
    bymiaService
      .getCategoriesList()
      .subscribe(resp => (this.categoriesList = resp));

    bymiaService.getSections().subscribe(resp => {
      this.homeSections = resp;
    });

    bymiaService.getBanners().subscribe(resp => {
      this.banners = resp;
      this.showBanners = true;
    });

    bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        this.moreProducts = resp;
      });
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
