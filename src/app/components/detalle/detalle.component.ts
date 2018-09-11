import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  id = null;
  lugar = null;

  constructor(private router: ActivatedRoute, private lugaresServices: LugaresService) { 
    
    this.id = this.router.snapshot.params['id'];
    // this.lugar = lugaresServices.buscarLugar(this.id);
    console.log(this.id);
    
  }
  
  ngOnInit() {
  }

}
