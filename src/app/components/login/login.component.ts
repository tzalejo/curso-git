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
  // para loguearse, se llama al servicio de login y se envio email y pass 
  logueo(){
    this.autorizacionService.servicioLogin(this.login.email,this.login.password);  
  }
  
  // esta funcion me permitira poder me loguear con github..tmb se puede con face,google,telefono etc.
  // todo esto me permite la libreria de firebase, el cual tengo q activarlo en metodo de iniciar sesion
  githubLogin(){
    this.autorizacionService.githubLogin();  
  }

}
