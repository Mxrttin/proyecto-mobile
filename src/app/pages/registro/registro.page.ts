import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicedbService } from 'src/app/services/servicedb.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  rut!:number;
  correo: string='';
  telefono!:number;
  password: string = '';
  confirmarPassword: string = '';
  rol: number = 2


  constructor( private router : Router , private alertController: AlertController , private toastController : ToastController, private db : ServicedbService) { }

  ngOnInit() {
  }

  registro(){

    if(this.nombre == '' ||  this.apellido == '' ||  this.password == '' || this.confirmarPassword == ''){
      
      this.rellenarAlert()

    }else if (this.password != this.confirmarPassword){

      this.contraAlert()

    }else{

      this.registroToast('bottom')
      this.db.insertarUsuario(this.nombre,this.apellido,this.rut,this.correo,this.telefono,this.password,this.rol);
      this.router.navigate(['/login'])

    }

  }

  async rellenarAlert() {
    const alert = await this.alertController.create({
      header: "Falta rellenar un campo",
      message: "Rellene todos los campos",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async contraAlert() {
    const alert = await this.alertController.create({
      header: "Datos no coinciden",
      message: "Las contraseñas son diferentes",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async registroToast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Usuario registrado con exito',
      icon: 'checkmark-outline',
      duration: 2500,
      position: position,
    });

    await toast.present();
  }



}