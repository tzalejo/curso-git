import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutorizacionService } from './autorizacion.service';

@Injectable()

export class MyGuardService implements CanActivate{
  esLogueado = false;
  constructor(private autorizacionService: AutorizacionService) {
    this.autorizacionService.servicioEsLogueado()
      .subscribe((result) => {
        // 
        if (result && result.uid) {
          this.esLogueado = true;
        }
        else {
          this.esLogueado = false;
        }
      }, (error) => {
        // si hay un error, por las dudas le decimos q no se registro..
        this.esLogueado = false;
      });
  }
  canActivate() {
    // para
    return this.esLogueado;
  }
}
