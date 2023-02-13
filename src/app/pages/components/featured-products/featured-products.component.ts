import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: FeaturedProduct[] = [];

  tempRating = '<i class="bx bx-tada-hover bx-sm bxs-star"></i>';

  constructor(bymiaService: BymiaService) {
    bymiaService
      .getFeaturedProducts()
      .subscribe(resp => (this.featuredProducts = resp));
  }
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
  ngOnInit(): void {}
}
