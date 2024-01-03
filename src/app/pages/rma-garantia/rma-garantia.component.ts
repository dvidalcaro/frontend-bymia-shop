import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { About } from 'src/app/shared/interfaces/About';

@Component({
  selector: 'app-rma-garantia',
  templateUrl: './rma-garantia.component.html',
  styles: [],
})
export class RmaGarantiaComponent implements OnInit {
  public refund: About = {};
  constructor(private bymiaService: BymiaService) {
    bymiaService.getRefund().subscribe(refund => (this.refund = refund));
  }

  ngOnInit(): void {}
}
