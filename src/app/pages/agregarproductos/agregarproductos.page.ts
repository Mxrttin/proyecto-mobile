import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-agregarproductos',
  templateUrl: './agregarproductos.page.html',
  styleUrls: ['./agregarproductos.page.scss'],
})
export class AgregarproductosPage implements OnInit {

  imagen: any;
  precio: any ;
  nombre: string =''
  descripcion: string=''
  categoria:any
  stock:any
  talla:any

  constructor(private toastController : ToastController, private router: Router, private alertController: AlertController,private db : ServicedbService) { }

  ngOnInit() {
  }


  guardar(){

    if(this.precio <= 0){  
      this.userAlert()
      return


    }else{
      this.registroToast('bottom')
      this.db.insertarProducto(this.nombre,this.descripcion,this.categoria,this.imagen,this.precio,this.stock,this.talla)
      this.router.navigate(['/adminproductos'])

    }

  

  }


  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagen = image.webPath;

  };




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
