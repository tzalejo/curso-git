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
  credencial = null; // para almacenar el credencial del usuario logueado

  constructor( private autorizacionService: AutorizacionService){
    this.autorizacionService.servicioEsLogueado()
        .subscribe((result) =>{
          // 
          if (result && result.uid) {
            this.esLogueado = true;
            this.credencial = result; //autorizacionService.servicioObtenerEmail();  
            // setTimeout(() => {
            //   this.usuarioLogin= this.autorizacionService.serviciObtenerUsuario().currentUser.email;
            //   // console.log(this.usuarioLogin);
            // },500);
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
