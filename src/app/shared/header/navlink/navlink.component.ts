import { Component, OnInit } from '@angular/core';
import { navLink } from '../../interfaces/navlink';
import { SharedService } from '../../shared.service';


@Component({
  selector: 'app-navlink',
  templateUrl: './navlink.component.html',
  styles: [
  ]
})
export class NavlinkComponent implements OnInit {

  switchBar: boolean=false;

  linksHeader: navLink[] = [
    {
      label: 'nosotros',
      links: 'nosotros'
    },

    {
      label: 'faq',
      links: 'faq'
    },

    {
      label: 'ofertas',
      links: 'ofertas'
    },

    {
      label: 'lanzamientos',
      links: 'lanzamientos'
    },

    {
      label: 'flash sales',
      links: 'flash-sales'
    },

    {
      label: 'precio de lista',
      links: 'precio-de-lista'
    }
  ];

  
  constructor( private sharedService:SharedService) {
    
   }

   closeBarSearch(){
    this.switchBar= false;
   }

   openBarSearch(){
     this.switchBar= true;
  }
   
  
  ngOnInit(): void {
  }

}
