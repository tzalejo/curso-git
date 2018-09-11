// esta directiva lo que va hacer es contar los clic en los link 

// para generar directivas-:  ng g d directives/contar-click --specfalse
import { Directive, HostListener, HostBinding } from '@angular/core';

// selector: a[contar-click] es para aplicar a hipervinculo
@Directive({
  selector: 'li[contar-clicks]' // a[contar-clicks]
})
export class ContarClickDirective {
  clicksN:number = 1;
  // hostbanding() es similar al hostlistener pero del lado contrario, vamos a poder edir elemento del DOM desde la directiva
  // modifica la opacidad del elemento
  @HostBinding('style.opacity')opacity: number = .1;
  
  // hostlistener escuchar a los eventos de una forma muy sensilla
  // el primer argunto es el evento(html) a capturar, $envent.target es el boton q recibe
  @HostListener('click',['$event.target']) onclick(btn){ // en q momento se va a disparar el evento, es con el onclick(), btn es el boton
    console.log('a', btn, 'Numeros de Clicks', this.clicksN++);
    this.opacity+=.1; // modifico la opacidad
  }; 
     constructor() { }

}
