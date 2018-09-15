import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../../services/lugares.service'
import { Http } from '@angular/http';
import swal from 'sweetalert2'

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, map, debounce, debounceTime } from 'rxjs/operators'
// ES6 Modules or TypeScript, para mostrar cartel de errores.
import * as Rx from 'rxjs';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  id: any = null;
  lugar: any = {};
  lat = -54.832201;
  lng = -68.3620131;
  results$: Observable<any>;
  private searchField: FormControl;
  constructor(private router: ActivatedRoute, private lugarSercicio: LugaresService, private http: Http) {
    // obtengo id que envia para modificar o eliminar, si es new es porque agregamos un registro..
    this.id = this.router.snapshot.params['id'];
    // verifico si es crear un elemento cuando id= new o solo queremos ver un lugar
    if (this.id != 'new') {
      lugarSercicio.obtenerLugar(this.id).valueChanges()
        .subscribe((lugar) => {
          // pedimos los dataso del firebase, siempre utilizanodo subscribe..
          this.lugar = lugar;
        });
    }
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(query => this.http.get(`${URL}?address=${query}`)),
        map(response => response.json().results));
    this.results$.subscribe();
  }
  // me permitirar al hace click en la direccion rellenar los casilleros correspondientes
  obtenerDireccion(results) {
    console.log(results);
    /*
    {address_components: Array(8), formatted_address: "Tte. Gral. Juan Domingo Perón Sur 234, V9410GWA Ushuaia, Tierra del Fuego, Argentina", geometry: {…}, place_id: "ElVUdGUuIEdyYWwuIEp1YW4gRG9taW5nbyBQZXLDs24gU3VyID…JnZW50aW5hIhsSGQoUChIJA_Qvp20jTLwRZwPp9uhWsq0Q6gE", types: Array(1)}
    */
    this.lugar.calle = results.address_components[1].long_name +' '+results.address_components[0].long_name;
    this.lugar.ciudad = results.address_components[3].long_name;
    this.lugar.pais = results.address_components[5].long_name;
  }
  guardarLugar() {
    // obtenemos la geolocalizacion
    var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    // la fc obtenergeodata es para obtener las coordenas de una direccion dada, esto me devuelve una promesa
    this.lugarSercicio.obtenerGeoData(direccion)
      .subscribe((resultado) => { // una vez q no devuelve las coordenadas guardo la info en firebase
        // resultado.json().results[0].geometry.location.lng; nos devuelve el api de google
        // debugger; // me permite parar la ejecucion para verificar los valres de algunas variables..

        this.lugar.lat = this.lat;//resultado.json().results[0].geometry.location.lat; // latitud
        this.lugar.lng = this.lng;//resultado.json().results[0].geometry.location.lng; // longuitud
        // genero un id para usarlo en firebase
        if (this.id != 'new') {
          this.lugarSercicio.editarLugar(this.lugar);
          swal({
            title: 'Informativa',
            text: 'Editado con exito..!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          // cuando es new es porque es uno nuevo entonces genero un uno..
          this.lugar.id = Date.now();
          this.lugarSercicio.guardarLugar(this.lugar);
          // vamos dar un alerta 
          swal({
            title: 'Informativa',
            text: 'Negocio guardado correctamente..!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }
        // vaciamos el objeto lugar
        this.lugar = {};
      }, error => {
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
