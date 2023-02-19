import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Banner } from 'src/app/shared/interfaces/Banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() bannerDesktop: Banner;
  @Input() bannerMobile: Banner;
  loading: boolean = true;

  constructor() {
    this.bannerDesktop = {
      id: 0,
      format: 'desktop',
      image: 'assets/banners/banner-1-desktop.jpg',
    };
    this.bannerMobile = {
      id: 1,
      format: 'mobile',
      image: 'assets/banners/banner-1-mobile.jpg',
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.loading = false;
    }
  }
}
