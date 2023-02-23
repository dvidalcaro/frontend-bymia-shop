import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { Categories } from 'src/app/shared/interfaces/Categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: Categories[] = [];
  loading: boolean = true;

  constructor(bymiaService: BymiaService) {
    bymiaService.getCategoriesList().subscribe(resp => {
      this.categoriesList = resp;
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
