import { Component, HostListener, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styles: [],
})
export class LaunchComponent implements OnInit {
  launchedProducts: FeaturedProduct[] = [];
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
    bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        this.launchedProducts = resp;
      });
    setTimeout(() => this.moreProducts(), 1000);
    setTimeout(() => this.moreProducts(), 1000);
  }

  moreProducts() {
    // this.index += 1;
    this.bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        resp.forEach(element => {
          this.launchedProducts.find(eo => {
            if (eo.category === element.category) {
              eo.products = [...eo.products, ...element.products];
            }
          });
        });
      });
  }

  ngOnInit(): void {}
}
