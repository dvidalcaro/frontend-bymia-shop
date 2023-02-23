import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  @Input() title: string = '';
  @Input() category: string = 'category';
  @Input() featuredProducts: FeaturedProduct[] = [];

  loading: boolean = true;

  tempRating = '<i class="bx bx-tada-hover bx-sm bxs-star"></i>';

  constructor() {}
  getRating(stars: number, reviews: string) {
    let result = '';
    while (stars > 0) {
      if (stars <= 0.5) {
        result += '<i class="bx bx-tada-hover bx-sm bxs-star-half"></i>';
      }
      if (stars > 0.5) {
        result += '<i class="bx bx-tada-hover bx-sm bxs-star"></i>';
      }
      stars -= 1;
    }

    return `${result} &nbsp;&nbsp;&nbsp; ${reviews} Reviews`;
  }
  public ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.featuredProducts) {
      this.loading = false;
      // console.log(changes);
    }
  }
}