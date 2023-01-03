import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  choiceTypeUser: boolean= false;

  constructor( private registerService: RegisterService ) { }

  registerUser(){
    console.log('clic')
    this.registerService.registerNewUser().subscribe(resp =>{
      alert('Usuario registrado con exito')
      console.log(resp)
    }, (err)=>{

      if (err === 400) {
        alert('Usuario ya registrado')
      }
      console.log('El status es: ' + err)
      console.log('Message: ' + err.error);
      
    })
  }
    
  closedpriceList(){
    
  }

  

  ngOnInit(): void {
  }

}
