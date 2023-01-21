import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { About } from '../shared/interfaces/About';
import { Slider } from '../shared/interfaces/Slider';
import { TopLevel } from '../shared/interfaces/TopLevel';

const url = 'http://back-test.bymiashop.com/api/front';
const headers = new HttpHeaders({
  Authorization:
    'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
});

@Injectable({
  providedIn: 'root',
})
export class BymiaService {
  private sliders: Slider[] = [];
  private about: About = {};
  private faqs: TopLevel[] = [];

  constructor(private http: HttpClient) {
    // console.log('Bymia Service ready');
  }

  public getSliders() {
    if (this.sliders.length > 0) {
      return of(this.sliders);
    } else {
      return this.http
        .get<Slider[]>(`${url}/sliders`, { headers })
        .pipe(tap(sliders => (this.sliders = sliders)));
    }
  }
  public getAbout() {
    if (this.about.id) {
      return of(this.about);
    } else {
      return this.http
        .get<About>(`${url}/about-us`, { headers })
        .pipe(tap(about => (this.about = about)));
    }
  }
  public getFaqs() {
    if (this.faqs.length > 0) {
      return of(this.faqs);
    } else {
      return this.http
        .get<TopLevel[]>(`${url}/faqs`, { headers })
        .pipe(tap(faqs => (this.faqs = faqs)));
    }
  }
}
