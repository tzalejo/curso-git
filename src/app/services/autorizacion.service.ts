import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import swal from 'sweetalert2';
import { Router } from '@angular/router'; // para redirigir una vez logueado
// importo la libreria completa de firebase
import * as firebase from 'firebase/app';

@Injectable()
export class AutorizacionService {
  
  constructor(private angularFileAuth: AngularFireAuth, private router: Router) { 
    this.servicioEsLogueado();
  }

  /**
   * githubLogin funcion para loguearse con hithub
   * 
   */
  public githubLogin() {
    this.angularFileAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then((result) => {
          console.log(result);// para ver q devuelve..
          swal({
            title: 'Informativa',
            text: 'El usuario se loggeado con éxito!',
            type: 'success',
            confirmButtonText:'Aceptar'
          });
          this.router.navigate(['lugares']);
        })
        .catch((error) => {
          swal({
            title: 'Error',
            text: 'Un error ha ocurrido! - ' + error,
            type: 'error',
            confirmButtonText:'Aceptar'
          });
        })
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
          this.router.navigate(['lugares']);
          // console.log(response); // muestro q devuelve response
        })
        .catch((error)=>{
          swal({
            title: 'Error',
            text: 'Un error ha ocurrido! - ' + error,
            type: 'error',
            confirmButtonText:'Aceptar'
          });
          // console.log(error); // muestro q devuelve error
        });
  };
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
          this.router.navigate(['lugares']);
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
  };
  // esta funcion la vamos a usar si un usuario se registro
  public servicioEsLogueado(){
    // este objeto solo existe cuando el usuario esta registrado..
    return this.angularFileAuth.authState;
  };

  // funcion para cerrar sesion..
  public servicioLogout(){
    this.angularFileAuth.auth.signOut();
    swal({
      title: 'Sesión',
      text: 'Sesion Cerrada',
      type: 'success',
      confirmButtonText:'Aceptar'
    });
    this.router.navigate(['lugares']);
  }

  // esta funcion me permite obtener el email del login
  // public servicioObtenerEmail(){
  //   return this.angularFileAuth.auth.currentUser.email;
  // }
  
}