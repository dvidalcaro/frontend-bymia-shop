import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BymiaService } from 'src/app/services/bymia.service';
import { HomeSection } from 'src/app/shared/interfaces/HomeSection';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  homeSections: HomeSection[] = [];
  showProduct: boolean = false;
  constructor(public bymiaService: BymiaService) {
    bymiaService.getSections().subscribe(resp => {
      this.homeSections = resp;
    });
  }

  products = [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      image:
        '../../../assets/img/MSI-GF63-Thin-Intel-Core-i5-10300H-8GB-RAM-256GB-SSD-NVIDIA-GeForce-GTX-1650-Windows-10-GF63-Thin-10.png',
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      image:
        '../../../assets/img/MSI-GF63-Thin-Intel-Core-i5-10300H-8GB-RAM-256GB-SSD-NVIDIA-GeForce-GTX-1650-Windows-10-GF63-Thin-10.png',
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      image:
        '../../../assets/img/MSI-GF63-Thin-Intel-Core-i5-10300H-8GB-RAM-256GB-SSD-NVIDIA-GeForce-GTX-1650-Windows-10-GF63-Thin-10.png',
    },
    {
      name: 'Producto 4',
      description: 'Descripción del producto 3',
      image:
        '../../../assets/img/MSI-GF63-Thin-Intel-Core-i5-10300H-8GB-RAM-256GB-SSD-NVIDIA-GeForce-GTX-1650-Windows-10-GF63-Thin-10.png',
    },
  ];

  showZoom() {
    this.showProduct = true;
  }

  closeZoom() {
    this.showProduct = false;
  }

  ngOnInit() {}
}
