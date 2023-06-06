import { Component, OnInit } from '@angular/core';
import { navLink } from 'src/app/shared/interfaces/navlink';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();
  links: navLink[] = [
    {
      label: 'Términos y condiciones',
      links: '/politicas-privacidad-y-servcios',
    },
    {
      label: 'Envíos',
      links: '/',
    },
    {
      label: 'Devolución',
      links: '/politicas-rma-y-garantia',
    },
    {
      label: 'Atención al Cliente',
      links: '/',
    },
    {
      label: 'Samsung',
      links: '/',
    },
    {
      label: 'Logitech',
      links: '/',
    },
    {
      label: 'Apple',
      links: '/',
    },
    {
      label: 'AMD',
      links: '/',
    },
    {
      label: 'Accesorios',
      links: '/',
    },
    {
      label: 'Laptops',
      links: '/',
    },
    {
      label: 'Celulares',
      links: '/',
    },
    {
      label: 'Workstation',
      links: '/',
    },
    {
      label: 'Tablets',
      links: '/',
    },
    {
      label: 'Audio',
      links: '/',
    },
    {
      label: 'Gaming',
      links: '/',
    },
    {
      label: 'Drones',
      links: '/',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
