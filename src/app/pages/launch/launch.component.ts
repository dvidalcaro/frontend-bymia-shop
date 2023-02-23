import { Component, OnInit } from '@angular/core';
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

  constructor(private bymiaService: BymiaService) {
    bymiaService
      .getFeaturedProducts('destacados', this.index, this.limit)
      .subscribe(resp => {
        this.launchedProducts = resp;
      });
  }

  ngOnInit(): void {}
}
