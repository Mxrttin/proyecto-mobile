import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregarproductos',
  templateUrl: './agregarproductos.page.html',
  styleUrls: ['./agregarproductos.page.scss'],
})
export class AgregarproductosPage implements OnInit {

  precio!: number;

  constructor(private toastController : ToastController, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }


  guardar(){

    if(this.precio <= 0){  
      this.userAlert()
      return


    }else{
      this.registroToast('bottom')
      this.router.navigate(['/adminproductos'])

    }

  

  }

  async userAlert() {
    const alert = await this.alertController.create({
      header: "",
      message: "Precio no puede ser menor a 0",
      buttons: ['OK'],
    });

    await alert.present();
  }



  async registroToast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto agregado con exito',
      icon: 'checkmark-outline',
      duration: 2500,
      position: position,
    });

    await toast.present();
  }

}
