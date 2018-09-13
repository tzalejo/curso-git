import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // variable q mantendra si un usuario se registro o no..valor boolean
  esLogueado = false;
  constructor( private autorizacionService: AutorizacionService){
    this.autorizacionService.servicioEsLogueado()
        .subscribe((result) =>{
          // 
          if (result && result.uid) {
            this.esLogueado = true;  
          } else {
            this.esLogueado = false;  
          }
        }, (error) =>{
          // si hay un error, por las dudas le decimos q no se registro..
          this.esLogueado = false;
        })
  }
}
