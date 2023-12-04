import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BymiaService } from 'src/app/services/bymia.service';
import { orderGenerate } from 'src/app/shared/interfaces/OrderGenerate-interface';
import {
  CityCode,
  StateCode,
} from 'src/app/shared/interfaces/countryCode-interface';
import {
  orderDetails,
  orderInformation,
} from 'src/app/shared/interfaces/order-interface';
import { BillData } from 'src/app/user/models/bill-data.model';
import { Product } from 'src/app/user/models/product.model';
import { Recipient } from 'src/app/user/models/recipient.model';
import { UserService } from 'src/app/user/services/user.service';
import Swal from 'sweetalert2';

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
  orderId: number = 86;
  orderById!: orderInformation;
  isChecked = new FormControl(false);
  state_code!: StateCode[];
  city_code!: CityCode[];
  city_code_Recipient!: CityCode[];
  orderGenerate: any = {};
  loading: boolean = true;
  // Objeto con respuestas deerror en el formulario
  errorResponse = {
    name: 'El campo Nombre es requerido y debe contener al menos 3 caracteres',
    identity_type:
      'El campo Tipo de identificación es requerido y debe contener al menos 3 caracteres',
    identity_number:
      'El campo Número de identificación es requerido y debe contener al menos 3 caracteres',
    country_id: 'Debes seleccionar un país',
    state_id: 'Debes seleccionar un estado',
    city_id: 'Debes seleccionar una ciudad',
    address:
      'El campo Dirección es requerido y debe contener al menos 3 caracteres',
    code_zip:
      'El campo Código postal es requerido y debe contener al menos 3 caracteres',
    phone:
      'El campo Teléfono es requerido y debe contener al menos 3 caracteres',
    email: 'Debe ingresar un correo válido',
  };

  // Declaracion formulario de facturacion

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
    additional_info: new FormControl(''),
  });

  // Declaracion formulario de envio
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
    additional_info: new FormControl(''),
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
    private route: ActivatedRoute,
    private bymiaService: BymiaService
  ) {
    this.bymiaService.getStateById(62).subscribe(res => {
      this.state_code = res;
    });

    // eliminar
    // this.billdata = this.userService.getOrder().bill_data;
    // this.recipients = this.userService.getOrder().recipients;
    // this.products = this.userService.getOrder().items?.map(item => {
    //   return { ...item, subtotal: item.quantity * item.price };
    // });

    // this.quantityProducts = this.products?.reduce(
    //   (acc, cur) => acc + cur.quantity,
    //   0
    // );
    // this.total = this.products?.reduce((acc, cur) => acc + cur.subtotal, 0);

    // this.tax = 0;
  }
  changeState(id: string) {
    this.bymiaService.getCityCodeById(parseInt(id)).subscribe(res => {
      this.city_code = res;
    });
  }
  changeStateRecipient(id: string) {
    this.bymiaService.getCityCodeById(parseInt(id)).subscribe(res => {
      this.city_code_Recipient = res;
    });
  }
  getDataForm() {
    this.orderGenerate.id = this.orderId;
    this.orderGenerate.billData = this.formBillData.value;
    this.orderGenerate.recipient = this.isChecked.value
      ? this.formRecipient.value
      : this.formBillData.value;

    this.userService
      .endOrder(this.orderGenerate, this.orderId)
      .subscribe(res => {
        if (res.status) {
          Swal.fire({
            title: 'Orden finalizada con exito',
            text: 'Gracias por tu compra',
            icon: 'info',
            confirmButtonText: 'Cerrar',
          });

          this.router.navigate(['orders']);
        } else {
          Swal.fire({
            title: 'Ocurrio un Error',
            text: 'Consultenos para mayor información',
            icon: 'warning',
            confirmButtonText: 'Cerrar',
          });
        }
        return res;
      });

    /* console.log(this.formBillData.value); */
    /* console.log(this.formBillData.value);
    console.log(this.formRecipient.value); */
  }
  /* endOrder() {
    this.userService.endOrder().subscribe(res => {});
  } */

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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['id']; // Reemplaza 'miParametro' con tu nombre de parámetro real
      if (!this.orderId) {
        this.router.navigate(['home']);
      }
      this.userService.getOrderById(this.orderId).subscribe(res => {
        this.orderById = res;
        this.loading = false;
      });
    });
  }
}
