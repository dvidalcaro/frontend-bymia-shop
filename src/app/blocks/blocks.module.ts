import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logo3dComponent } from './logo3d/logo3d.component';
import { SlidersComponent } from './sliders/sliders.component';
import { HeroComponent } from './hero/hero.component'; 





@NgModule({
  declarations: [
    Logo3dComponent,
    SlidersComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
   
    
  ],
  exports:[
    Logo3dComponent,
    SlidersComponent,
    HeroComponent
  ]
  
 
})
export class BlocksModule { }
