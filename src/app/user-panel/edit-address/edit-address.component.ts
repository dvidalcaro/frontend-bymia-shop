import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  user: User;
  countryPhoneCode: string = '';
  countryCodes: CountryCode[] = [];
  countryCode!: CountryCode | undefined;
  state_code!: StateCode[];
  city_code!: CityCode[];
  countryFlag: string = '';
  countryAlt: string = '';
  userProfile!: UserProfile;
  billinData!: LatestBillingData;
  addresses!: MyAddresses[];

  type_User: string | undefined = '';
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
    private userService: UserService
  ) {
    this.user = new User();

    this.userService.getMyData().subscribe(resp => {
      if (resp.status === true) {
        this.userProfile = resp;

        this.billinData = this.userProfile.customerData.latest_billing_data!;
        console.log(this.billinData);

        this.billinData.country_id = 62;
        this.user.country_id = 62;

        this.loading = false;
        bymiaService.getCountryCode().subscribe(resp => {
          this.countryCodes = resp;
          console.log(resp);
        });
        this.changeCity('62');
        this.bymiaService
          .getCityCodeById(this.billinData.state_id)
          .subscribe(res => {
            this.city_code = res;
          });

        console.log('ciudad', this.city_code);

        setTimeout(() => {
          this.showData = true;
          this.countryCode = this.countryCodes.find(country => {
            return country.id === this.billinData?.country_id;
          });
          this.countryFlag = this.countryCode!.flag;
          this.countryPhoneCode = this.countryCode!.phonecode;
        }, 1000);
      }

      console.log(this.userProfile);
    });
  }

  getFlagPhone(country_id: any) {
    this.countryCode = this.countryCodes.find(country => {
      return country.id === country_id.country_id;
    });

    this.countryFlag = this.countryCode!.flag;
    this.countryPhoneCode = this.countryCode!.phonecode;
    this.user.cel_phone = '';
  }

  changeCity(id: string) {
    this.bymiaService.getStateById(parseInt(id)).subscribe(res => {
      this.state_code = res;
    });
  }
  changeState(id: number) {
    console.log(id);

    this.bymiaService.getCityCodeById(id).subscribe(res => {
      this.city_code = res;
    });
    this.billinData.city_id = undefined;
    console.log(this.billinData);
  }

  clearDateOfBirthError() {
    this.errorResponse.date_of_birth = '';
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Modificando a ' + this.billinData.name,
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.userService
      .editLatestBillinData(this.billinData, this.billinData.code_id)
      .subscribe(resp => {
        console.log(this.billinData);

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
