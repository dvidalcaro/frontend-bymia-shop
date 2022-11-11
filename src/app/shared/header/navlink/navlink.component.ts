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
      links: '#'
    },

    {
      label: 'faq',
      links: '#'
    },

    {
      label: 'ofertas',
      links: '#'
    },

    {
      label: 'lanzamientos',
      links: '#'
    },

    {
      label: 'flash sales',
      links: '#'
    },

    {
      label: 'precio de lista',
      links: '#'
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
