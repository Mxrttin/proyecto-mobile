import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-editarproductos',
  templateUrl: './editarproductos.page.html',
  styleUrls: ['./editarproductos.page.scss'],
})
export class EditarproductosPage implements OnInit {
  productoRecibido: any;
  
  constructor(private bd: ServicedbService, private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoRecibido = this.router.getCurrentNavigation()?.extras?.state?.['productoEnviado'];
      }
    })
   }

  ngOnInit() {
  }

  modificar(){
    this.bd.ModificarProducto(this.productoRecibido.id_producto, this.productoRecibido.nombre,this.productoRecibido.descripcion, this.productoRecibido.precio, this.productoRecibido.stock);

    this.router.navigate(['/adminproductos'])
  }
}
