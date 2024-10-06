import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.page.html',
  styleUrls: ['./adminproductos.page.scss'],
})
export class AdminproductosPage implements OnInit {

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

  constructor(private router: Router, private db: ServicedbService) { }

  ngOnInit() {
    this.db.dbState().subscribe(data =>{
      if(data){
        this.db.fetchProducto().subscribe(res=>{
          this.arregloProductos = res;
        })
      }
    })
  }

  modificar(item:any){
    let navigationExtras : NavigationExtras = {
      state:{
        productoEnviado: item
      }
    }
    this.router.navigate(['/editarproductos'],navigationExtras);
  }

}
