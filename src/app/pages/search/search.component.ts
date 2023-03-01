import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BymiaService } from 'src/app/services/bymia.service';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public queryString: string = '';
  public filter: string = '';
  searchProducts: FeaturedProduct[] = [];
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private bymiaService: BymiaService
  ) {}

  moreProducts() {
    // this.index += 1;
    this.bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        resp.forEach(element => {
          this.searchProducts.find(eo => {
            if (eo.category === element.category) {
              eo.products = [...eo.products, ...element.products];
            }
          });
        });
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.queryString = params.key;
      this.filter = params.filter;

      // console.log('Search receive', params.key);
      this.bymiaService
        .getFeaturedProducts('destacados', this.index, this.limit)
        .subscribe(resp => {
          this.searchProducts = resp;
        });
      setTimeout(() => this.moreProducts(), 1000);
      // setTimeout(() => this.moreProducts(), 1000);
    });
  }
}
