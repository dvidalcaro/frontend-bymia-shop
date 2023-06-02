import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { HomeSection } from 'src/app/shared/interfaces/HomeSection';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  homeSections: HomeSection[] = [];
  constructor(public bymiaService: BymiaService) {
    bymiaService.getSections().subscribe(resp => {
      this.homeSections = resp;
    });
  }

  ngOnInit(): void {}
}
