import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { About } from 'src/app/shared/interfaces/About';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styles: [],
})
export class PoliticasComponent implements OnInit {
  public terms: About = {};

  constructor(private bymiaService: BymiaService) {
    bymiaService.getTerms().subscribe(terms => (this.terms = terms));
  }

  ngOnInit(): void {}
}
