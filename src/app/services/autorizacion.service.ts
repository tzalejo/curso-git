import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import swal from 'sweetalert2';
@Injectable()
export class AutorizacionService {
  
  constructor(private angularFileAuth: AngularFireAuth) { 
  }
  public servicioLogin (email,pass){
    // console.log('emtodo del login');
    this.angularFileAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email,pass)
        .then((response)=>{
          // para mostrar mensaje utilizando swal
          swal({
            title: 'Informativa',
            text: 'El usuario se loggeado con éxito!',
            type: 'success',
            confirmButtonText:'Aceptar'
          });
          // console.log(response); // muestro q devuelve response
        })
        .catch((error)=>{
          swal({
            title: 'Error',
            text: 'Un error ha ocurrido!' + error,
            type: 'error',
            confirmButtonText:'Aceptar'
          });
          // console.log(error); // muestro q devuelve error
        })
  }
  public servicioRegistro(email,pass){
    // console.log('medotod de registro');
    this.angularFileAuth.auth.createUserWithEmailAndPassword(email,pass)
        .then((response)=>{
          // para mostrar mensaje utilizando swal
          swal({
            title: 'Informativa',
            text: 'El usuario se registro con éxito!',
            type: 'success',
            confirmButtonText:'Aceptar'
          });
          // console.log(response); // muestro q devuelve response
        })
        .catch((error)=>{
          swal({
            title: 'Error',
            text: 'Un error ha ocurrido!' + error,
            type: 'error',
            confirmButtonText:'Aceptar'
          });
          // console.log(error); // muestro q devuelve error
        })
  }
}