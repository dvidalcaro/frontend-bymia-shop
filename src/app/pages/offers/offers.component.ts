import { Component, HostListener, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styles: [],
})
export class OffersComponent implements OnInit {
  offerProducts: FeaturedProduct[] = [];
  index: number = 0;
  limit: number = 4;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.innerHeight * 0.2 + window.scrollY >
      document.body.scrollHeight
    ) {
      if (this.bymiaService.loading) {
        return;
      }
      this.moreProducts();
    }
  }

  constructor(private bymiaService: BymiaService) {
    this.loadInitialProducts();
  }

  ngOnInit(): void {}

  loadInitialProducts() {
    this.bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        this.offerProducts = resp;
      });

    // Simulating initial loading by calling moreProducts twice after a delay
    setTimeout(() => this.moreProducts(), 1000);
    setTimeout(() => this.moreProducts(), 2000);
  }

  moreProducts() {
    this.index += 1;
    this.bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        resp.forEach(element => {
          const existingCategory = this.offerProducts.find(
            eo => eo.category === element.category
          );
          if (existingCategory) {
            existingCategory.products = [
              ...existingCategory.products,
              ...element.products,
            ];
          } else {
            this.offerProducts.push(element);
          }
        });
      });
  }
}
