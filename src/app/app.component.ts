import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // variable q mantendra si un usuario se registro o no..valor boolean
  esLogueado = false;
  email = null; // para almacenar el email del usuario logueado
  constructor( private autorizacionService: AutorizacionService){
    this.autorizacionService.servicioEsLogueado()
        .subscribe((result) =>{
          // 
          if (result && result.uid) {
            this.esLogueado = true;
            this.email = autorizacionService.serviceObtenerEmail();  
          } else {
            this.esLogueado = false;  
          }
        }, (error) =>{
          // si hay un error, por las dudas le decimos q no se registro..
          this.esLogueado = false;
          swal({
            title: 'Error',
            text: 'Un error ha ocurrido!' + error,
            type: 'error',
            confirmButtonText:'Aceptar'
          });
        })
  }

  logout(){
    // llamamos al servicio de logout()
    this.autorizacionService.servicioLogout();
  }
}
