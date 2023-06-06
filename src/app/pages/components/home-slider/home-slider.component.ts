import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { Slider } from 'src/app/shared/interfaces/Slider';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements OnInit {
  sliders: Slider[] = [];
  loading: boolean = true;

  constructor(private bymiaService: BymiaService) {
    bymiaService.getSliders().subscribe(resp => {
      this.sliders = resp;
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
