import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { BymiaService } from 'src/app/services/bymia.service';
import {
  CityCode,
  CountryCode,
  StateCode,
} from 'src/app/shared/interfaces/countryCode-interface';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from '../../user/services/user.service';
import {
  MyAddresses,
  UserProfile,
} from 'src/app/shared/interfaces/UserProfileData.inteface';

import { LatestBillingData } from '../../shared/interfaces/UserProfileData.inteface';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {
  countryPhoneCode: string = '';
  countryCodes: CountryCode[] = [];
  countryCode!: CountryCode | undefined;
  state_code!: StateCode[];
  city_code!: CityCode[];
  countryFlag: string = '';
  countryAlt: string = '';

  addresses!: MyAddresses[];
  addresse!: MyAddresses | null;
  id_address!: number;
  index_address!: number;

  loading: boolean = true;
  showData: boolean = false;

  public remember = false;
  errorResponse = {
    identity_type: 'Debe ingresar un tipo de identificación',
    name: 'Debe ingresar un nombre de al menos 6 letras',
    identity_number: 'Debe ingresar un número de identificación',
    date_of_birth: 'Ej. de fecha válida: 1980-12-31',
    cel_phone: 'Debe ingresar un teléfono válido de al menos 6 digitos',
    city_id: 'Debes selecionar una ciudad ',
    address: 'Debes ingresar una dirección',
    zip_code: 'Debes ingresar un código postal',
  };
  errorServer = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private bymiaService: BymiaService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  getFlagPhone(country_id: any) {
    this.countryCode = this.countryCodes.find(country => {
      return country.id === country_id.country_id;
    });

    this.countryFlag = this.countryCode!.flag;
    this.countryPhoneCode = this.countryCode!.phonecode;
  }

  changeCity(id: string) {
    this.bymiaService.getStateById(parseInt(id)).subscribe(res => {
      this.state_code = res;
    });
  }
  changeState(id: number) {
    this.bymiaService.getCityCodeById(id).subscribe(res => {
      this.city_code = res;
    });
  }

  clearDateOfBirthError() {
    this.errorResponse.date_of_birth = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id_address = params['id'];
    });

    ////

    this.userService.getMyData().subscribe(resp => {
      if (resp.status === true) {
        this.addresses = resp.customerData.my_addresses;

        this.index_address = this.addresses.findIndex(
          item => item.code_id === Number(this.id_address)
        );

        this.addresse = this.addresses[this.index_address];
        this.addresse.identity_type = 'DNI';
        // this.addresses[this.index_address].identity_type;

        this.loading = false;
        this.bymiaService.getCountryCode().subscribe(resp => {
          this.countryCodes = resp;
        });
        this.changeCity('62');
        this.bymiaService
          .getCityCodeById(this.addresse.state_id)
          .subscribe(res => {
            this.city_code = res;
          });

        setTimeout(() => {
          this.showData = true;
          this.countryCode = this.countryCodes.find(country => {
            return country.id === this.addresse?.country_id;
          });
          this.countryFlag = this.countryCode!.flag;
          this.countryPhoneCode = this.countryCode!.phonecode;
        }, 1000);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Modificando dirección ' + this.addresse!.name,
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.userService
      .editAddress(this.addresse!, this.id_address)
      .subscribe(resp => {
        this.errorServer = false;
        Swal.fire({
          icon: 'success',
          title: 'Datos modificados correctamente',
          text: form.value.name,
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/my-data');
          }
        }),
          (err: {
            error: {
              validation: {
                identity_type: string;
                name: string;
                identity_number: string;
                date_of_birth: string;
                cel_phone: string;
                city_id: string;
                address: string;
                zip_code: string;
              };
              message: any;
            };
          }) => {
            this.errorServer = true;
            this.errorResponse = {
              identity_type: '',
              name: '',
              identity_number: '',
              date_of_birth: '',
              cel_phone: '',
              city_id: '',
              address: '',
              zip_code: '',
            };

            this.errorResponse = err.error.validation;
            Swal.fire({
              icon: 'error',
              title: err.error.message,
            });
          };
      });
  }
}
