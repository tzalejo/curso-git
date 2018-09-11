import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// para usar firebase
import { AngularFireDatabase } from 'angularfire2/database';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  id = null;
  lugares: any = [];
  // para trabajar http utilizaremos ese url
  API_ENDPOINT="https://platzisquere-215116.firebaseio.com"; // no esta funcionado, porque necesita obtener clave api

  constructor(
    private router: ActivatedRoute, 
    private afDB: AngularFireDatabase, 
    private http : Http, 
    private httpClient: HttpClient) { 
      this.id = this.router.snapshot.params['id'];
  }

  public obtenerLugares(){
    // estamos llamando al api de firebase y obteneiendo los lugares, firebase devuelve una promesa
    return  this.afDB.list('lugares/');
    
    // usamos httpclient para obtener lugares, se modifico lugares.component.ts
    // return this.httpClient.get(this.API_ENDPOINT+'/.json').pipe(map(resultado=>{
    //   const data  = resultado['lugares'];
    //   return data ;
    // }));
  }
  public guardarLugar(lugar){
    // console.log(lugar);
    // alamceno en firebase con un id genereado con date.now y los datos (lugar)
    // aca estamos trabajando con Sockets.
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);

    // aca usaremos httpClient
    // establecemo la cabecera
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    // this.httpClient.post(this.API_ENDPOINT+'/lugares.json',lugar,{headers:headers}).subscribe() ;
  }
  public editarLugar(lugar){
    // alamceno en firebase con un id genereado con date.now y los datos (lugar)
    this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
  }
  public obtenerGeoData(direccion){
    //http://maps.google.com/maps/api/geocode/json?address=
    // vamos a llamar a la urls para obtener infomacion de google maps
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
  }

  public obtenerLugar(id){
    // obtenemos un lugar especifico..
    return this.afDB.object('lugares/'+id);
  }
}
