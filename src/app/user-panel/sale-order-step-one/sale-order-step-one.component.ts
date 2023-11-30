import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  orderDetails,
  orderInformation,
} from 'src/app/shared/interfaces/order-interface';
import { BillData } from 'src/app/user/models/bill-data.model';
import { Product } from 'src/app/user/models/product.model';
import { Recipient } from 'src/app/user/models/recipient.model';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-sale-order-step-one',
  templateUrl: './sale-order-step-one.component.html',
  styles: [],
})
export class SaleOrderStepOneComponent implements OnInit {
  open: boolean = false;
  public products: Product[] | undefined = [];
  public total: number | undefined = 0;
  public billdata: BillData | undefined = undefined;
  public recipients: Recipient[] | undefined = [];

  public pickupData: boolean = false;
  public shippingData: boolean = false;

  public quantityProducts: number | undefined = 0;
  public tax: number = 0;
  public totalSale: number = 0;
  orderId!: number;
  orderById!: orderInformation;
  isChecked = new FormControl(false);

  formBillData = new FormGroup({
    name: new FormControl('', Validators.required),
    identity_type: new FormControl('', Validators.required),
    identity_number: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
    state_id: new FormControl('', Validators.required),
    city_id: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    code_zip: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    aditional_info: new FormControl('', Validators.required),
  });
  formRecipient = new FormGroup({
    name: new FormControl('', Validators.required),
    identity_type: new FormControl('', Validators.required),
    identity_number: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
    state_id: new FormControl('', Validators.required),
    city_id: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    code_zip: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    aditional_info: new FormControl('', Validators.required),
  });
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
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      const id = params['id']; // Reemplaza 'miParametro' con tu nombre de parámetro real
      if (!id) {
        this.router.navigate(['home']);
      }
      this.userService.getOrderById(id).subscribe(res => {
        this.orderById = res;
        console.log('resp:', res);
      });
    });

    console.log('Order', this.userService.getOrder());
    this.billdata = this.userService.getOrder().bill_data;
    this.recipients = this.userService.getOrder().recipients;

    this.products = this.userService.getOrder().items?.map(item => {
      return { ...item, subtotal: item.quantity * item.price };
    });
    console.log('Products:', this.products);

    this.quantityProducts = this.products?.reduce(
      (acc, cur) => acc + cur.quantity,
      0
    );
    this.total = this.products?.reduce((acc, cur) => acc + cur.subtotal, 0);

    this.tax = 0;
    console.log('Total', this.total);
  }

  endOrder() {
    this.userService.endOrder().subscribe(res => {
      console.log('resp:', res);
    });
  }

  selectRadio(value: string) {
    this.pickupData = value.indexOf('Pickup') > 0;
    this.shippingData = value.indexOf('Shipping') > 0;

    this.tax =
      this.total && value?.startsWith('international')
        ? 0
        : this.total
        ? this.total * 0.07
        : 0;
    this.totalSale = this.total ? this.total + this.tax : 0;
    // console.log('international:', value?.startsWith('international'));
    // console.log('pickupData:', this.pickupData);
    // console.log('select radio:', value);
  }

  ngOnInit(): void {}
}
