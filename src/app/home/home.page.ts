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

  // items: any [] = [

  //   {
  //     id: '1',
  //     name: 'Hoodie',
  //     price: 40,
  //     status: true,
  //     cover: 'assets/image/hoodie-blue.webp',
  //     description: 'Hoodie corteiz Uk',
  //   },
  //   {
  //     id: '2',
  //     name: 'falda',
  //     price: 30,
  //     status: true,
  
  //     cover: 'assets/image/falda-denin.webp',
  //     description: 'falda denin corteiz UK',
  //   },
  //   {
  //     id: '3',
  //     name: 'short',
  //     price: 40,
  //     status: true,
  
  //     cover: 'assets/image/short-denin.webp',
  //     description: 'short alcatraz',
  //   },
  //   {
  //     id: '4',
  //     name: 'tan top',
  //     price: 20,
  //     status: true,
  
  //     cover: 'assets/image/tan-top-blanca.webp',
  //     description: 'tan top algodon',
  //   },
  //   {
  //     id: '5',
  //     name: 'Skepta tshirt',
  //     price: 80,
  //     status: true,
      
  
  //     cover: 'assets/image/skeptatshirt.webp',
  //     description: 'Skepta Edition',
  //   },
  //   {
  //     id: '6',
  //     name: 'short rosa',
  //     price: 17,
  //     status: true,
  
  //     cover: 'assets/image/short-rosa.webp',
  //     description: 'Short rosa',
  //   },
  //   {
  //     id: '7',
  //     name: 'club america',
  //     price: 90,
  //     status: true,
  
  //     cover: 'assets/image/club-america.webp',
  //     description: 'Especial edition',
  //   },
  //   {
  //     id: '8',
  //     name: 'carni special',
  //     price: 80,
  //     status: true,
  //     rating: 6.2,
  //     cover: 'assets/image/carni-special.webp',
  //     description: 'Especial edition',
  //   },
  //   //{
  //     //id: '9',
  //     ///name: 'Chandal Corteiz',
  //     //price: 150,
  //     //status: true,
  //     //cover: 'assets/image/Balenciago.webp',
  //     //description: 'Especial edition',
  //   //},
  //   {
  //     id: '9',
  //     name: 'Hoodie Mirror Balenciaga',
  //     price: 80,
  //     status: true,
  //     cover: 'assets/image/Mirror.png',
  //     description: 'Especial edition',
  //   },
  //   {
  //     id: '10',
  //     name: 'Crop balenciaga',
  //     price: 80,
  //     status: true,
  //     cover: 'assets/image/Balenciagazip.webp',
  //     description: 'Especial edition',
  //   },
    
    
  // ];

  allItems: any [] = [];
  

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


  // getItems() {
  //   this.allItems = this.items;
  //   this.items = [...this.allItems];
  // }

  // navigatedeTotalleItem(id: number) {
  //   const selectedItem = this.items.find(item => item.id === id.toString());
  //   if (selectedItem) {
  //     this.router.navigate([`/detalleItem/${id}`], {
  //       state: { item: selectedItem }
  //     });
  //   }
    
  // }

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



