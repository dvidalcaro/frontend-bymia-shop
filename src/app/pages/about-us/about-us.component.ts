import { Component, OnInit } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { About } from 'src/app/shared/interfaces/About';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styles: [],
})
export class AboutUsComponent implements OnInit {
  public about: About = {};

  constructor(bymiaService: BymiaService) {
    bymiaService.getAbout().subscribe(about => (this.about = about));
  }

  ngOnInit(): void {
    //console.log(this.about);
  }
}
