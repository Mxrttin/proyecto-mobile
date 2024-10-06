import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Talla } from './talla';
import { Categoria } from './categoria';
import { Producto } from './producto';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicedbService {

  //variable para la conexion a la base de datos
  public database!: SQLiteObject;

  //variables de creacion de tablas

  //TABLA ROL
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  //TABLA TALLA
  tablaTalla: string = "CREATE TABLE IF NOT EXISTS talla(id_talla INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(10) NOT NULL);";

  //TABLA CATEGORIA
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  //TABLA PRODUCTO
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, descripcion VARCHAR(100) NOT NULL,categoria INTEGER NOT NULL, foto TEXT NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL,talla INTEGER NOT NULL, FOREIGN KEY(categoria) REFERENCES categoria(id_categoria), FOREIGN KEY(talla) REFERENCES talla(id_talla));";

  //TABLA USUARIO
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_user INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(100) NOT NULL, rut TEXT NOT NULL, correo TEXT NOT NULL, telefono TEXT NOT NULL, clave TEXT NOT NULL, foto TEXT, rol INTEGER NOT NULL, FOREIGN KEY(rol) REFERENCES rol(id_rol));";

  //TABLA REFGION
  tablaRegion: string = "CREATE TABLE IF NOT EXISTS region(id_region INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL);";

  //TABLA COMUNA
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, region INTEGER NOT NULL, FOREIGN KEY(region) REFERENCES region(id_region));";

  //TABLA DIRECCION
  tablaDireccion: string = "CREATE TABLE IF NOT EXISTS direccion(id_direccion INTEGER PRIMARY KEY autoincrement, descripcion TEXT NOT NULL, comuna INTEGER NOT NULL, usuario INTEGER NOT NULL, FOREIGN KEY(comuna) REFERENCES comuna(id_comuna), FOREIGN KEY(usuario) REFERENCES usuario(id_user));";

  //TABLA ESTADO
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  //TABLA PEDIDO
  tablaPedido: string = "CREATE TABLE IF NOT EXISTS pedido(id_pedido INTEGER PRIMARY KEY autoincrement, fecha_pedido TEXT NOT NULL, usuario INTEGER NOT NULL, direccion INTEGER NOT NULL, total INTEGER NOT NULL, estado INTEGER NOT NULL, carrito INTEGER NOT NULL DEFAULT 0, FOREIGN KEY(usuario) REFERENCES usuario(id_user), FOREIGN KEY(direccion) REFERENCES direccion(id_direccion), FOREIGN KEY(estado) REFERENCES estado(id_estado));";

  //TABLA DETALLE
  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalle(id_detalle INTEGER PRIMARY KEY autoincrement, pedido INTEGER NOT NULL, producto INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal INTEGER NOT NULL, FOREIGN KEY(pedido) REFERENCES pedido(id_pedido), FOREIGN KEY(producto) REFERENCES producto(id_producto));";

  //VARIABLES PARA HACER INSERTS EN LAS TABLAS

  //INSERTS TABLA ROL LISTA
  registroRol: string = "INSERT or IGNORE INTO rol(id_rol, nombre) VALUES (1, 'Administrador')";
  registroRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre) VALUES (2,'Cliente')"

  //INSERT TABLA TALLA  LISTO
  registroTallaXS: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (1,'XS')";
  registroTallaS: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (2,'S')";
  registroTallaM: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (3,'M')";
  registroTallaL: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (4,'L')";
  registroTallaXL: string = "INSERT or IGNORE INTO talla(id_talla,nombre) VALUES (5,'XL')";

  //INSERT TABLA CATEGORIA LISTO
  registroCategoriaPoleron: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES (1, 'Poleron')";
  registroCategoriaPolera: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES (2, 'Polera')";
  registroCategoriaPantalon: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES (3, 'Pantalon')";
  registroCategoriaShort: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES (4, 'Short')";
  registroCategoriaFalda: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES (5, 'Falda')";
  registroCategoriaCamisa: string = "INSERT OR IGNORE INTO categoria(id_categoria,nombre) VALUES (6, 'Camisa')";

  //INSERT TABLA PRODUCTO
  registroProducto: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (1, 'Hoodie','Hoodie corteiz Uk',1,'assets/image/hoodie-blue.webp',80,50,3)";
  registroProducto2: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (2, 'Falda','falda denin corteiz UK',5,'assets/image/falda-denin.webp',30,50,1)";
  registroProducto3: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (3, 'Short','short alcatraz',4,'assets/image/short-denin.webp',40,50,1)";
  registroProducto4: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (4, 'tan top','tan top algodon',2,'assets/image/tan-top-blanca.webp',20,50,1)";
  registroProducto5: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (5, 'Skepta tshirt','Skepta Edition',6,'assets/image/skeptatshirt.webp',80,50,1)";
  registroProducto6: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (6, 'short rosa','Short rosa',4,'assets/image/short-rosa.webp',17,50,1)";
  registroProducto7: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (7, 'club america','Especial edition',2,'assets/image/club-america.webp',90,50,1)";
  registroProducto8: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (8, 'carni special','Especial edition',2,'assets/image/carni-special.webp',80,50,1)";
  registroProducto9: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (9, 'Hoodie Mirror Balenciaga','Especial edition',1,'assets/image/Mirror.png',80,50,1)";
  registroProducto10: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (10, 'Crop balenciaga','Especial edition',1,'assets/image/Balenciagazip.webp',80,50,1)";

  //INSERT TABLA USUARIO
  registroUsuarioaAdmin: string = "INSERT or IGNORE INTO usuario(id_user,nombre,apellido,rut,correo,telefono,clave,foto,rol) VALUES (1,'Martin','Irarrazabal',123456789,'martin@gmail.com',987654321,'12345','',1)";

  //VARAIBLES PARA GUARDAR LOS REGISTROS RESULTANTES DE UN SElECT
  listadoRol = new BehaviorSubject([]);

  listadoTalla = new BehaviorSubject([]);

  listadoCategoria = new BehaviorSubject([]);

  listadoProducto = new BehaviorSubject([]);

  listadoUsuario = new BehaviorSubject([]);

  //VARIABLE PARA MANIPIULAR EL ESTADO DE LA BASE DE DATOS (SOLO UNA)
  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearDB()

   }

  //FUNCIONES DE RETORNO DE OBSERVABLES
  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }

  fetchTalla(): Observable<Talla[]>{
    return this.listadoTalla.asObservable();
  }

  fetchCategoria(): Observable<Categoria[]>{
    return this.listadoCategoria.asObservable();
  }

  fetchProducto(): Observable<Producto[]>{
    return this.listadoProducto.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listadoUsuario.asObservable();
  }

  //FUNCION PARA VER EL ESTADO DE LA BASE DE DATOS
  dbState(){
    return this.isDBReady.asObservable();
  }

  async presentAlert(titulo:string,msj:string){
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    })
    await alert.present();
  }

  // FUNCION PARA CREAR LA BASE DE DATOS
  //SIMEPRE SE EJECUTA EN EL CONSTRUCTOR
  crearDB(){
    //verificar la plataforma
    this.platform.ready().then(()=>{
       //procedemos a crear la base de datos
      this.sqlite.create({
        name: 'ocultoStudio1.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar y guardar la conexion a la Base de datos
        this.database = db;
        //llamar a la funcion de creacion de tablas
        this.crearTablas();
        this.consultarProducto();
        //modificar el observable del status de la base de datos
        this.isDBReady.next(true);
      }).catch(e =>{
        this.presentAlert("Creacion de base de datos", "Error creando la BD: " + JSON.stringify(e));
      })
    })
  }


  async crearTablas(){
    try{
      //mandar a ejecutar las tablas en el orden especifico
      await this.database.executeSql(this.tablaRol,[]);
      await this.database.executeSql(this.tablaTalla,[]);
      await this.database.executeSql(this.tablaCategoria,[]);
      await this.database.executeSql(this.tablaProducto,[]);
      await this.database.executeSql(this.tablaUsuario,[]);
      await this.database.executeSql(this.tablaRegion,[]);
      await this.database.executeSql(this.tablaComuna,[]);
      await this.database.executeSql(this.tablaDireccion,[]);
      await this.database.executeSql(this.tablaEstado,[]);
      await this.database.executeSql(this.tablaPedido,[]);
      await this.database.executeSql(this.tablaDetalle,[]);

      //generamos los insert en caso que existan
      //insert tabla rol
      await this.database.executeSql(this.registroRol,[]);
      await this.database.executeSql(this.registroRol2,[]);

      //insert tabla talla
      await this.database.executeSql(this.registroTallaXS,[]);
      await this.database.executeSql(this.registroTallaS,[]);
      await this.database.executeSql(this.registroTallaM,[]);
      await this.database.executeSql(this.registroTallaL,[]);
      await this.database.executeSql(this.registroTallaXL,[]);

      //insert tabla categoria
      await this.database.executeSql(this.registroCategoriaCamisa,[]);
      await this.database.executeSql(this.registroCategoriaPolera,[]);
      await this.database.executeSql(this.registroCategoriaPoleron,[]);
      await this.database.executeSql(this.registroCategoriaPantalon,[]);
      await this.database.executeSql(this.registroCategoriaShort,[]);
      await this.database.executeSql(this.registroCategoriaFalda,[]);

      //insert tabla producto
      await this.database.executeSql(this.registroProducto,[]);
      await this.database.executeSql(this.registroProducto2,[]);
      await this.database.executeSql(this.registroProducto3,[]);
      await this.database.executeSql(this.registroProducto4,[]);
      await this.database.executeSql(this.registroProducto5,[]);
      await this.database.executeSql(this.registroProducto6,[]);
      await this.database.executeSql(this.registroProducto7,[]);
      await this.database.executeSql(this.registroProducto8,[]);
      await this.database.executeSql(this.registroProducto9,[]);
      await this.database.executeSql(this.registroProducto10,[]);

      //insert tabla usuario
      await this.database.executeSql(this.registroUsuarioaAdmin,[]);

    }catch(e){
      this.presentAlert("Creacion de tablas","Error creando las tablas: " + JSON.stringify(e));
    }
  }


  //PAGINA PRINCIPAL Y ADMIN  
  consultarProducto(){
    return this.database.executeSql('SELECT * FROM producto',[]).then(res=>{
      let items: Producto[] = [];

      if(res.rows.length > 0){

        for (var i = 0 ; i < res.rows.length ; i++){

          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
            categoria: res.rows.item(i).categoria, 
            foto: res.rows.item(i).foto,
            precio: res.rows.item(i).precio,
            stock: res.rows.item(i).stock,
            talla: res.rows.item(i).talla,
          })
        }
      }
      this.listadoProducto.next(items as any);
    })
  }

  //TERMINADO Y FUNCIONANDO
  ModificarProducto( id:string, nombre:string, descripcion:string, precio:string, stock:string ){
    return this.database.executeSql('UPDATE producto SET nombre = ?, descripcion = ?, precio = ? , stock = ? WHERE id_producto=?.',[nombre,descripcion,precio,stock,id]).then(res=>{
      this.presentAlert("Modificar producto","Producto Modificado"),
      this.consultarProducto;
    }).catch(e=>{
      this.presentAlert("Modificar","Error: " + JSON.stringify(e));
    })
  }

   //TERMINADO Y FUNCIONANDO (PAGINA PRINCIPAL)
  visualizarProducto(){
    return this.database.executeSql('SELECT * FROM producto WHERE id_producto = ?',[]).then(res=>{

    }).catch(e=>{
      this.presentAlert("Visualizar","Error: " + JSON.stringify(e));
    })
  }

}
