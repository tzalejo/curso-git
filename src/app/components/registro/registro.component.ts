import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
  // styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  // variable q vienen del formulario..
  resgistro:any ={};
  
  constructor(private autorizacionService: AutorizacionService) {
  }
  
  ngOnInit() {
  }
  // funcion q llama desde html registro.component.html
  registrar(){
    // console.log(this.resgistro.email);
    // console.log(this.resgistro.password);
    // debugger;
    // llamo el servicio de registro y envio el pass y email 
    this.autorizacionService.servicioRegistro(this.resgistro.email,this.resgistro.password);
  }

}
