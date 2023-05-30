import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-sale-order-step-one',
  templateUrl: './sale-order-step-one.component.html',
  styles: [],
})
export class SaleOrderStepOneComponent implements OnInit {
  open: boolean = false;
  Popup: any[] = [
    {
      selection: 'Pickup',
      title: 'Pickup - NO TIENE COSTO',
      description:
        'Retiro de productos en el warehouse Bymia en Miami. Almacenamos sin costo tu compra durante TREINTA (30) días. La empresa de envíos estará a cargo del cliente. En caso de envío internacional,  nuestro customer te solicitará el Certificado de Exportación.',
    },
    {
      selection: 'Envíos internacionales',
      title: 'Envíos nacionales e internacionales ',
      description:
        '1) Envíos internacionales (no abonan tax) \n a) Destinos Argentina y República Dominicana: solo por MiaCargo. \n Tu envío será facturado y lo pagarás en destino. Desde tu panel podrás \n seguir su trayectoria con el número de tracking.\n b) Otros destinos internacionales Envío con DHL: abonarás tu envío \n junto con tu compra y podrás seguir su trayectoria con el número de \n tracking desde tu panel de cliente. \n Para conocer los costos del envío a tu país, consultale a uno de nuestros \n representantes de  atención al cliente. \n c) Envíos nacionales (abonan tax) \n + Entregas a domicilio en Miami por USPS. \n Pagás el envío junto con tu factura de compra. \n + Entregas a domicilio en USA, menos Miami por DHL. \n Abonás tu envío junto con la compra y podrás seguir su trayectoria \n con el número de tracking asignado desde tu panel de cliente.',
    },
  ];
  constructor(private userService: UserService) {}

  endOrder() {
    this.userService.endOrder().subscribe(res => {
      console.log('resp:', res);
    });
  }

  ngOnInit(): void {}
}
