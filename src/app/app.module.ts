import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// componentes
import { AppComponent }      from './app.component';
import { DetalleComponent }  from './components/detalle/detalle.component';
import { LugaresComponent }  from './components/lugares/lugares.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CrearComponent }    from './components/crear/crear.component';
import { LoginComponent }    from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

//libreria para formateo de texto
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';

// directivas 
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClickDirective } from './directives/contar-click.directive';

// servicios
import { LugaresService } from './services/lugares.service'
import { AutorizacionService } from './services/autorizacion.service';
import { MyGuardService } from './services/my-guard.service';

// firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from'angularfire2/auth';
// router
import { Routes, RouterModule} from '@angular/router';
const appRoutes: Routes =[
  { path: '', component: LugaresComponent },
  { path: 'lugares', component: LugaresComponent},
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'crear/:id', component: CrearComponent, canActivate:[MyGuardService] }
];

@NgModule({
  declarations: [ // agregar los componentes
    AppComponent,
    ResaltarDirective,
    ContarClickDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
      
  ],
  imports: [ // vamos agregar los modulos q vamos a usar en nuestra aplicacion
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,  // me tiraba error en formModule, con esta libreria dejo de tirar..
    // firebase
    AngularFireAuthModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB79lSJEHGiYQ_VV17BdY_3sj9b6ICN310'
    })

  ],
  providers: [LugaresService,AutorizacionService, MyGuardService], // los servercios
  bootstrap: [AppComponent] // componente de inicio
})
export class AppModule { }
