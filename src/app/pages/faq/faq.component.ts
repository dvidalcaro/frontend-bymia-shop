import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { TopLevel } from 'src/app/shared/interfaces/TopLevel';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styles: [],
})
export class FaqComponent implements OnInit {
  public topLevel: TopLevel[] = [];
  constructor(private bymiaService: BymiaService) {
    bymiaService.getFaqs().subscribe(faqs => (this.topLevel = faqs));
  }

  homeSlider: any;

  ngOnInit(): void {
    // console.log(this.topLevel);
  }
}
