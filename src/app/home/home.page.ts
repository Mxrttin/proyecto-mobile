import { Component, inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicedbService } from '../services/servicedb.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],


})
export class HomePage {

  arregloProductos: any = [

    {
      id_producto: '',
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: '',
      stock: '',
      foto : ''

    }

  ]

     
  constructor(private router: Router, private db: ServicedbService) {}

  ngOnInit () {
    this.db.dbState().subscribe(data =>{
      if(data){
        this.db.fetchProducto().subscribe(res=>{
          this.arregloProductos = res;
        })
      }
    })
  }

  navigateToCarrito(){
    this.router.navigate(['/home/login']);
  }

  visualizar(item:any){
    let navigationExtras : NavigationExtras = {
      state:{
        productoEnviado: item
      }
    }
    this.router.navigate(['/detalleItem'],navigationExtras);
  }
  

}



