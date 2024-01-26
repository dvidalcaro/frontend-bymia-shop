import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BymiaService } from 'src/app/services/bymia.service';
import {
  BillRecipientData,
  OrderGenerate,
} from 'src/app/shared/interfaces/OrderGenerate-interface';
import {
  CityCode,
  CountryCode,
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

import { environment } from 'src/environments/environment.prod';
import { CardnetService } from 'src/app/services/cardnet.service';

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
  orderId: number = 0;
  order!: orderInformation;
  isChecked = new FormControl(false);
  recipesAddressSelect = new FormControl('0');
  paymentType = new FormControl(null, Validators.required);
  fiscalInvoice = new FormControl(null, Validators.required);
  countries!: CountryCode[];
  state_code!: StateCode[];
  city_code!: CityCode[];
  city_code_Recipient!: CityCode[];
  orderGenerate: any = {};
  loading: boolean = true;
  bill_address_id: number | null = null;
  recipient_address_id: number | null = null;
  showFormRecipient: boolean = false;
  recipientFormIdentityType: string | null = null;

  // Objeto con respuestas deerror en el formulario
  errorResponse = {
    paymentType: 'Debe seleccionar una forma de pago.',
    fiscalInvoice: 'Debe seleccionar si desea factura con valor fiscal.',
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
    private bymiaService: BymiaService,
    private cardnetService: CardnetService
  ) {
    //

    // se asignan valores al objeto session key

    this.bymiaService.getStateById(62).subscribe(res => {
      this.state_code = res;
    });
  }
  changeCity(id: string) {
    this.bymiaService.getStateById(parseInt(id)).subscribe(res => {
      this.state_code = res;
    });
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
  changeRecipe(recipeSelect: any) {
    if (!recipeSelect) {
      this.resetNuevoDestinatario();
      this.showFormRecipient = true;
    } else {
      if (recipeSelect === '0') {
        this.showFormRecipient = false;
        this.recipient_address_id = this.bill_address_id;
      } else {
        this.fillFormRecipient(
          recipeSelect === '' ? this.formBillData.value : recipeSelect
        );
        this.showFormRecipient = true;
        this.recipient_address_id =
          recipeSelect === '' ? null : recipeSelect.address_id;
      }
    }
  }

  continueOrder() {
    if (this.paymentType.valid && this.fiscalInvoice.valid) {
      if (this.bill_address_id && !this.showFormRecipient) {
        return true;
      }
      if (
        this.bill_address_id &&
        this.showFormRecipient &&
        this.recipient_address_id
      ) {
        return true;
      }
      if (
        this.bill_address_id &&
        this.showFormRecipient &&
        this.formRecipient.valid
      ) {
        return true;
      }
      if (this.formBillData.valid && !this.showFormRecipient) {
        return true;
      }
      if (
        this.formBillData.valid &&
        this.showFormRecipient &&
        this.recipient_address_id
      ) {
        return true;
      }
      if (
        this.formBillData.valid &&
        this.showFormRecipient &&
        this.formRecipient.valid
      ) {
        return true;
      }
    }
    return false;
  }

  getDataForm() {
    this.orderGenerate.id = this.orderId;
    this.orderGenerate.billData = this.formBillData.value;
    this.orderGenerate.recipient = this.showFormRecipient
      ? this.formRecipient.value
      : this.formBillData.value;

    this.orderGenerate.same_address = !this.showFormRecipient; //si showFormRecipient es falso  entonces same_address es true.  esto indica que los datos de facturacion y de destinatario son los mismos
    this.orderGenerate.billData.address_id = this.bill_address_id;
    this.orderGenerate.paymentTypeId = this.paymentType.value;
    this.orderGenerate.fiscalInvoiceId = this.fiscalInvoice.value;
    if (this.showFormRecipient) {
      this.orderGenerate.recipient.address_id = this.recipient_address_id;
    }

    this.loading = true;
    this.userService
      .endOrder(this.orderGenerate, this.orderId)
      .subscribe(res => {
        if (res.status) {
          if (res.paymentTypeId == 1) {
            //si es transferencia
            Swal.fire({
              title: 'Orden finalizada con exito',
              text: 'Gracias por tu compra',
              icon: 'info',
              confirmButtonText: 'Cerrar',
            });
            this.router.navigate(['orders']);
          } else {
            const form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', res.urlCardnet);

            // Agrega los campos del formulario como entradas ocultas
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', 'SESSION');
            input.setAttribute('value', res.SESSION);
            form.appendChild(input);

            // Agrega el formulario al DOM y haz la submisión
            document.body.appendChild(form);
            form.submit();
          }
        } else {
          this.loading = false;
          Swal.fire({
            title: 'Ocurrio un Error',
            text: 'Consultenos para mayor información',
            icon: 'warning',
            confirmButtonText: 'Cerrar',
          });
        }
        return res;
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
  }

  fillFormBill(data: BillRecipientData) {
    // this.formBillData.disable();
    this.formBillData.get('name')?.setValue(data?.name);
    this.formBillData.get('identity_type')?.setValue(data?.identity_type);
    this.formBillData.get('identity_number')?.setValue(data?.identity_number);
    this.formBillData.get('country_id')?.setValue(data?.country_id);
    this.formBillData.get('state_id')?.setValue(data?.state_id);
    this.changeState(data?.state_id);
    this.formBillData.get('city_id')?.setValue(data?.city_id);
    this.formBillData.get('address')?.setValue(data?.address);
    this.formBillData.get('code_zip')?.setValue(data?.code_zip);
    this.formBillData.get('email')?.setValue(data?.email);
    this.formBillData.get('phone')?.setValue(data?.phone);
    this.formBillData.get('additional_info')?.setValue(data?.additional_info);
  }

  fillFormRecipient(data: BillRecipientData) {
    this.recipientFormIdentityType = data.identity_type;
    // this.formRecipient.disable();
    this.formRecipient.get('name')?.setValue(data?.name);
    this.formRecipient.get('identity_type')?.setValue(data?.identity_type);
    this.formRecipient.get('identity_number')?.setValue(data?.identity_number);
    this.formRecipient.get('country_id')?.setValue(data?.country_id);
    this.formRecipient.get('state_id')?.setValue(data?.state_id);
    this.changeStateRecipient(data?.state_id);
    this.formRecipient.get('city_id')?.setValue(data?.city_id);
    this.formRecipient.get('address')?.setValue(data?.address);
    this.formRecipient.get('code_zip')?.setValue(data?.code_zip);
    this.formRecipient.get('email')?.setValue(data?.email);
    this.formRecipient.get('phone')?.setValue(data?.phone);
    this.formRecipient.get('additional_info')?.setValue(data?.additional_info);
  }

  changeBillingData() {
    this.formBillData.reset();
    this.formBillData.enable();
    this.bill_address_id = null;
    this.formBillData.get('country_id')?.setValue('');
    this.formBillData.get('state_id')?.setValue('');
    this.city_code = [];
    this.formBillData.get('city_id')?.setValue('');
  }

  resetNuevoDestinatario() {
    this.formRecipient.reset();
    this.formRecipient.enable();
    this.recipient_address_id = null;
    this.formRecipient.get('identity_type')?.setValue(null);
    this.formRecipient.get('country_id')?.setValue('');
    this.formRecipient.get('state_id')?.setValue('');
    this.city_code_Recipient = [];
    this.formRecipient.get('city_id')?.setValue('');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['id']; // Reemplaza 'miParametro' con tu nombre de parámetro real
      if (!this.orderId || isNaN(this.orderId)) {
        this.router.navigate(['home']);
      }
      this.userService.getOrderById(this.orderId).subscribe(
        res => {
          this.order = res;

          this.loading = false;

          if (this.order.bill_address?.address_id) {
            this.bill_address_id = this.order.bill_address?.address_id;
            this.fillFormBill(this.order.bill_address);
          }
        },
        error => {
          if (error.status === 409) {
            // Manejo específico para el error 409 (Conflict)
            // Puedes acceder al mensaje de error y realizar acciones según sea necesario
            const errorMessage = error.error.message; // Ajusta esto según la estructura de tu mensaje de error

            // Realiza aquí las acciones necesarias en caso de un error 409
          } else {
            // Manejo de otros errores
            // Realiza aquí el manejo para otros tipos de errores
          }
          this.loading = false; // Asegúrate de manejar el estado de carga aquí
        }
      );
    });
  }
}
