import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../../services/lugares.service';
import { trigger, state, style, transition, animate} from '@angular/animations';
// ES6 Modules or TypeScript, para mostrar cartel de errores.
import swal from 'sweetalert2'

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  // para darle animacion a un objeto
  animations: [
    trigger('contenedorAnimable',[
      state('inicial',style({
        opacity: 0,
        // backgroundColor: 'green', // background-color
        // transform: 'rotate3d(0,0,0,0deg)' // rotamos en 3d, xyz,grado de rotacion
      })),
      state('final',style({
        opacity: 2,
        // backgroundColor: 'yellow', // background-color
        // transform: 'rotate3d(4,20,30,30deg)' // rotamos en 3d, xyz,grado de rotacion
      })),
      transition('inicial => final',animate(2000)),
      transition('final => inicial',animate(500))
    ]) //contenedorAnimable es el nombre del trigge elemento que dispara a este
  ]
})
export class LugaresComponent implements OnInit {
  title = 'Bienvenidos a Platzi Square';
  key_api ='AIzaSyDTjl21z5Wbr3KR8r56_-l35rLi-g2MfU4';
  lugares = null;
  state= 'inicial'; // contendra el estado inicial de la animacion, en este caso el 'inicial'
  // para cambiar los estados 'state'
  animar(){
    this.state = (this.state === 'final')? 'inicial' : 'final';
  }
  // escuchamos los estados mediante estos callback
  animacionInicia(e){
    console.log('Inicia');
    console.log(e);
  }
  animacionFinaliza(e){
    console.log('Terminado');
    console.log(e);
  }

  // llamado mediante un 
  constructor(private lugaresServicio: LugaresService ) { 
    // obtengo el array de lugares..
    // this.lugares = lugaresServicio.obtenerLugares();

    // vamos a sucribirno a un evento, vamos a indicarle firebase q estamos esperando los valores para asiganarlo en una vaariable
    lugaresServicio.obtenerLugares().valueChanges()
      .subscribe(lugares => {  
        this.state="final"; // para la animacion
        // this es mi variable y lugares es el pararametro qe nos llega de firebase
        this.lugares = lugares;
        // debugger;
        
        // para obtener los lugares mediante httpclient 
        // convertimos un object a un array
        // this.lugares = Object.keys(lugares).map(function(key) { 
        //   return lugares[key]; 
        // });
      },error =>{
        console.log(error);
        // alert('Tenemos algo de dificultades, disculpe las molestias. Error: '+error.statusText);
        swal({
          title: 'Error!',
          text: 'Tenemos algo de dificultades, disculpe las molestias.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      })

  }

  ngOnInit() {
  }
}
