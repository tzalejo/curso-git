import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private autorizacionService:AutorizacionService) {
    this.autorizacionService.servicioLogin('eamil','password');
   }

  ngOnInit() {
  }

}
