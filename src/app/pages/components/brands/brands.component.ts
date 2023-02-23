import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { Brand } from 'src/app/shared/interfaces/Brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  brandsList: Brand[] = [];
  loading: boolean = true;

  constructor(bymiaService: BymiaService) {
    bymiaService.getBrands().subscribe(resp => {
      this.brandsList = resp;
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
