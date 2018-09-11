import { Directive, OnInit, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({ selector: '[resaltar]' })
export class ResaltarDirective implements OnInit{
  
  // ElementRef(modulo): nos permite crear una referncia de html para manipular desde  codigo typescript 
  // Renderer2: me va a permitir tmb manipular los elementos de html pero mas enfocado a los atributos css
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    // para manupular el dom, osea el html
  }
  // recibimos un valor, en este la variable resaltar y es el nombre de nuestro selector 
  @Input('resaltar') plan:string ='';
  ngOnInit(){
    // vamos a dar estilo dependiendo del plan..
    if (this.plan === 'pagado'){
      // aplicamos estilo css al DOM, 
      // setStyle recibe 3 parametro , el elemento nativo, el atributo q qureemos modificar y el valor para  atributo
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color','yellow');
      this.renderer.setStyle(this.elRef.nativeElement, 'font-weight','bold');

    }
  }

}