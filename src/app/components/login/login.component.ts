import { Component } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // variable q vienen del formulario..
  login:any ={};
  constructor(private autorizacionService:AutorizacionService) {
  }

  logueo(){
    this.autorizacionService.servicioLogin(this.login.email,this.login.password);
    
  }

}
