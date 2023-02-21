import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { FeaturedProduct } from 'src/app/shared/interfaces/FeaturedProduct';

@Component({
  selector: 'app-flash-sales',
  templateUrl: './flash-sales.component.html',
  styles: [],
})
export class FlashSalesComponent implements OnInit {
  flashSalesProducts: FeaturedProduct[] = [];
  index: number = 0;
  limit: number = 4;

  constructor(private bymiaService: BymiaService) {
    bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        this.flashSalesProducts = resp;
      });
  }

  ngOnInit(): void {}
}
