import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { Slider } from 'src/app/shared/interfaces/Slider';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styles: [],
})
export class SlidersComponent implements OnInit {
  public sliders: Slider[] = [];
  constructor(private bymiaService: BymiaService) {
    bymiaService.getSliders().subscribe(resp => (this.sliders = resp));
  }

  ngOnInit(): void {}
}
