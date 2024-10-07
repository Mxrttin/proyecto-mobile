import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-infousuario',
  templateUrl: './infousuario.page.html',
  styleUrls: ['./infousuario.page.scss'],
})
export class InfousuarioPage implements OnInit {

  usuarioRecibido : any;

  direccion = {
    comuna: 'Providencia',
    region: 'Region Metropolitana',
    nombreCliente: 'Raul Miranda',
    direccion: 'las aguilas 0365'
  };

  constructor(private bd: ServicedbService, private router: Router, private activedroute: ActivatedRoute) { 
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
      }
    })
  }

  ngOnInit() {
  }

}
