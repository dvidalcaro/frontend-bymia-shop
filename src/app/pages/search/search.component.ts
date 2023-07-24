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
  public k: string = '';
  public c: string = '';
  public b: string = '';
  public t: string = '';
  public filters: string[] = [];
  searchProducts: FeaturedProduct;
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
    this.searchProducts = { category: 'search', products: [] };
    this.bymiaService.currentSearchlist.subscribe(result => {
      // console.log(result);
      this.searchProducts.products = [
        ...this.searchProducts.products,
        ...result,
      ];
      // if (this.searchProducts.length > 0) {
      //   result.forEach(element => {
      //     this.searchProducts.find(eo => {
      //       if (eo.category === element.category) {
      //         eo.products = [...eo.products, ...element.products];
      //       }
      //     });
      //   });
      // } else {
      //   this.searchProducts = result;
      // }
      // console.log(this.searchProducts);
    });
  }

  moreProducts() {
    this.index += 1;
    this.bymiaService.getSearchedProducts(
      this.k,
      this.c,
      this.b,
      this.t,
      this.index,
      this.limit
    );
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.index = 0;

      this.k = params.k;
      this.c = params.c;
      this.b = params.b;
      this.t = params.t;

      this.filters = [
        ...JSON.parse(params.c),
        ...JSON.parse(params.b),
        ...JSON.parse(params.t),
      ];

      // console.log(this.filters);

      this.searchProducts = { category: 'search', products: [] };

      this.bymiaService.getSearchedProducts(
        this.k,
        this.c,
        this.b,
        this.t,
        this.index,
        this.limit
      );
    });
    setTimeout(() => {
      this.moreProducts();
    }, 1000);
  }
}
