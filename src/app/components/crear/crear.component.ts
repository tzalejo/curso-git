import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../../services/lugares.service'


// ES6 Modules or TypeScript, para mostrar cartel de errores.
import swal from 'sweetalert2'
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  id:any = null;
  lugar: any={};
  lat=-54.832201;
  lng=-68.3620131;
  constructor(private router: ActivatedRoute, private lugarSercicio : LugaresService) {
    // obtengo id que envia para modificar o eliminar, si es new es porque agregamos un registro..
    this.id = this.router.snapshot.params['id'];
    // verifico si es crear un elemento cuando id= new o solo queremos ver un lugar
    if (this.id != 'new'){
      lugarSercicio.obtenerLugar(this.id).valueChanges()
      .subscribe((lugar)=>{
        // pedimos los dataso del firebase, siempre utilizanodo subscribe..
        this.lugar  = lugar;   
      });
    }
   }

  ngOnInit() {
  }
  
  guardarLugar(){
    // obtenemos la geolocalizacion
    var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
    // la fc obtenergeodata es para obtener las coordenas de una direccion dada, esto me devuelve una promesa
    this.lugarSercicio.obtenerGeoData(direccion)
      .subscribe((resultado)=>{ // una vez q no devuelve las coordenadas guardo la info en firebase
        // resultado.json().results[0].geometry.location.lng; nos devuelve el api de google
        // debugger; // me permite parar la ejecucion para verificar los valres de algunas variables..
        
        this.lugar.lat = this.lat;//resultado.json().results[0].geometry.location.lat; // latitud
        this.lugar.lng = this.lng;//resultado.json().results[0].geometry.location.lng; // longuitud
        // genero un id para usarlo en firebase
        if(this.id != 'new'){
          this.lugarSercicio.editarLugar(this.lugar);
          swal({
            title: 'Informativa',
            text: 'Editado con exito..!',
            type: 'success',
            confirmButtonText:'Aceptar'
          });
        }else{
          // cuando es new es porque es uno nuevo entonces genero un uno..
          this.lugar.id =  Date.now();
          this.lugarSercicio.guardarLugar(this.lugar);
          // vamos dar un alerta 
          swal({
            title: 'Informativa',
            text: 'Negocio guardado correctamente..!',
            type: 'success',
            confirmButtonText:'Aceptar'
          });
        }
        // vaciamos el objeto lugar
        this.lugar = {};
      },error =>{
        // console.log(error);
        // alert('Hubo un problema, disculpa la molestias. Error: '+error.statusText);
        swal({
          title: 'Error!',
          text: 'Hubo un problema, disculpa la molestias. Intentar mas tarde.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      }); 
  }

}
