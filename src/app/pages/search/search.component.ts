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
  public query: string = '';
  public filters: string[] = [];
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
  ) {
    this.bymiaService.currentSearchlist.subscribe(result => {
      if (this.searchProducts.length > 0) {
        result.forEach(element => {
          this.searchProducts.find(eo => {
            if (eo.category === element.category) {
              eo.products = [...eo.products, ...element.products];
            }
          });
        });
      } else {
        this.searchProducts = result;
      }
      // console.log(this.searchProducts);
    });
  }

  moreProducts() {
    this.index += 1;
    this.bymiaService.getSearchedProducts(
      this.query,
      this.filters?.join('&'),
      this.index,
      this.limit
    );
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.query = params.query;
      this.filters = params.filters;

      // console.log('Search receive', params);
      // console.log('filters join', this.filters?.join('&'));
      this.searchProducts = [];
      // console.log(typeof this.filters);
      if (typeof this.filters == 'string') {
        this.filters = [this.filters];
      }
      this.bymiaService.getSearchedProducts(
        this.query,
        this.filters?.join('&'),
        this.index,
        this.limit
      );
    });
    setTimeout(() => {
      this.moreProducts();
    }, 1000);
  }
}
