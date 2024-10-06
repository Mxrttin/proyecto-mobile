import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicedbService } from 'src/app/services/servicedb.service';


@Component({
  selector: 'app-detalle-item',
  templateUrl: './detalleItem.page.html',
  styleUrls: ['./detalleItem.page.scss'],
})

export class DetalleItemPage implements OnInit {
  productoRecibido: any;
  cantidad : number = 1;

  constructor(private bd: ServicedbService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
      }
    })
  }

  ngOnInit() {}




  navigateToCarrito() {
    this.router.navigate(['/carrito']);
  }

  sumarCantidad() {
    this.cantidad += 1;
  }

  restarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
    }
  }


}