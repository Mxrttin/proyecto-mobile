import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Talla } from './talla';
import { Categoria } from './categoria';
import { Producto } from './producto';
import { Usuario } from './usuario';
import { Region } from './region';
import { Comuna } from './comuna';

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
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, descripcion VARCHAR(100) NOT NULL,categoria INTEGER NOT NULL, foto BLOB, precio INTEGER NOT NULL, stock INTEGER NOT NULL,talla INTEGER NOT NULL, FOREIGN KEY(categoria) REFERENCES categoria(id_categoria), FOREIGN KEY(talla) REFERENCES talla(id_talla));";

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
  blueHoodie: string = 'assets/image/hoodie-blue.webp';

  registroProducto: string = "INSERT or IGNORE INTO producto(id_producto,nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (1, 'Hoodie','Hoodie corteiz Uk',1,'${this.blueHoodie}',80,50,3)";
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
  registroUsuarioCliente1: string = "INSERT or IGNORE INTO usuario(id_user,nombre,apellido,rut,correo,telefono,clave,foto,rol) VALUES (2,'Raul','Miranda',123456785,'raul@gmail.com',987654323,'12345','',2)";
  registroUsuarioCliente2: string = "INSERT or IGNORE INTO usuario(id_user,nombre,apellido,rut,correo,telefono,clave,foto,rol) VALUES (3,'Benjamin','Vega',123456784,'benjamin@gmail.com',987654325,'12345','',2)";

  //INSERT TABLA REGION
  registroRegion1: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (1,'Arica y Parinacota')";
  registroRegion2: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (2,'Tarapaca')";
  registroRegion3: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (3,'Antofagasta')";
  registroRegion4: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (4,'Atacama')";
  registroRegion5: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (5,'Coquimbo')";
  registroRegion6: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (6,'Valparaiso')";
  registroRegion7: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (7,'Metropolitana de Santiago')";
  registroRegion8: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (8,'Libertador General Bernardo OHiggins')";
  registroRegion9: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (9,'Maule')";
  registroRegion10: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (10,'Ñuble')";
  registroRegion11: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (11,'Biobio')";
  registroRegion12: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (12,'La Araucania')";
  registroRegion13: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (13,'Los Rios')";
  registroRegion14: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (14,'Los Lagos')";
  registroRegion15: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (15,'Aysén del General Carlos Ibáñez del Campo')";
  registroRegion16: string = "INSERT or IGNORE INTO region(id_region,nombre) VALUES (16,'Magallanes y de la Antártica Chilena')";

  //INSERT TABLA COMUNA
  registroComuna1: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (1,'Arica',1)"
  registroComuna2: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (2,'Iquique',2)"
  registroComuna3: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (3,'Calama',3)"
  registroComuna4: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (4,'Vallenar',4)"
  registroComuna5: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (5,'La Serena',5)"
  registroComuna6: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (6,'Concon',6)"
  registroComuna7: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (7,'Conchali',7)"
  registroComuna8: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (8,'Pichilemu',8)"
  registroComuna9: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (9,'Linares',9)"
  registroComuna10: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (10,'Bulnes',10)"
  registroComuna11: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (11,'Concepcion',11)"
  registroComuna12: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (12,'Lumaco',12)"
  registroComuna13: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (13,'Valdivia',13)"
  registroComuna14: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (14,'Purranque',14)"
  registroComuna15: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (15,'Aysen',15)"
  registroComuna16: string = "INSERT or IGNORE into comuna(id_comuna,nombre,region) VALUES (16,'Torres del paine',16)"

  //INSERT TABLA DIRECCION
  registroDireccion1: string = "INSERT or IGNORE into direccion(id_direccion,descripcion,comuna,usuario) VALUES (1,'Las Aguilas 0365',7,2)";
  registroDireccion2: string = "INSERT or IGNORE into direccion(id_direccion,descripcion,comuna,usuario) VALUES (2,'Las Vertientes 285',4,3)";

  //INSERT TABLA ESTADO
  registroEstadoEnProceso: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (1,'En proceso')";
  registroEstadoEnviado: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (2,'Enviado')";
  registroEstadoFinalizado: string = "INSERT or IGNORE into estado(id_estado,nombre) VALUES (2,'Finalizado')";

  //VARAIBLES PARA GUARDAR LOS REGISTROS RESULTANTES DE UN SElECT
  listadoRol = new BehaviorSubject([]);

  listadoTalla = new BehaviorSubject([]);

  listadoCategoria = new BehaviorSubject([]);

  listadoProducto = new BehaviorSubject([]);

  listadoUsuario = new BehaviorSubject([]);

  listadoRegion = new BehaviorSubject([]);

  listadoComuna = new BehaviorSubject([]);

  listadoDireccion = new BehaviorSubject([]);

  listadoEstado = new BehaviorSubject([]);


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

  fetchRegion(): Observable<Region[]>{
    return this.listadoRegion.asObservable();
  }

  fetchComuna(): Observable<Comuna[]>{
    return this.listadoComuna.asObservable();
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
        this.consultarUsuario();
        this.consultarRegion();
        this.consultaComuna();
        this.consultarSoloUsuario(),
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
      await this.database.executeSql(this.registroUsuarioCliente1,[]);
      await this.database.executeSql(this.registroUsuarioCliente2,[]);

      //insert tabla region
      await this.database.executeSql(this.registroRegion1,[]);
      await this.database.executeSql(this.registroRegion2,[]);
      await this.database.executeSql(this.registroRegion3,[]);
      await this.database.executeSql(this.registroRegion4,[]);
      await this.database.executeSql(this.registroRegion5,[]);
      await this.database.executeSql(this.registroRegion6,[]);
      await this.database.executeSql(this.registroRegion7,[]);
      await this.database.executeSql(this.registroRegion8,[]);
      await this.database.executeSql(this.registroRegion9,[]);
      await this.database.executeSql(this.registroRegion10,[]);
      await this.database.executeSql(this.registroRegion11,[]);
      await this.database.executeSql(this.registroRegion12,[]);
      await this.database.executeSql(this.registroRegion13,[]);
      await this.database.executeSql(this.registroRegion14,[]);
      await this.database.executeSql(this.registroRegion15,[]);
      await this.database.executeSql(this.registroRegion16,[]);

      //insert tabla comuna
      await this.database.executeSql(this.registroComuna1,[]);
      await this.database.executeSql(this.registroComuna2,[]);
      await this.database.executeSql(this.registroComuna3,[]);
      await this.database.executeSql(this.registroComuna4,[]);
      await this.database.executeSql(this.registroComuna5,[]);
      await this.database.executeSql(this.registroComuna6,[]);
      await this.database.executeSql(this.registroComuna7,[]);
      await this.database.executeSql(this.registroComuna8,[]);
      await this.database.executeSql(this.registroComuna9,[]);
      await this.database.executeSql(this.registroComuna10,[]);
      await this.database.executeSql(this.registroComuna11,[]);
      await this.database.executeSql(this.registroComuna12,[]);
      await this.database.executeSql(this.registroComuna13,[]);
      await this.database.executeSql(this.registroComuna14,[]);
      await this.database.executeSql(this.registroComuna15,[]);
      await this.database.executeSql(this.registroComuna16,[]);

      //insert tabla direccion
      await this.database.executeSql(this.registroDireccion1,[]);
      await this.database.executeSql(this.registroDireccion2,[]);

      //insert tabla estado
      await this.database.executeSql(this.registroEstadoEnProceso,[]);
      await this.database.executeSql(this.registroEstadoEnviado,[]);
      await this.database.executeSql(this.registroEstadoFinalizado,[]);

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

  //TERMINADO Y funcionando
  insertarProducto(nombre:string, descripcion:string, categoria:string, foto:string, precio:string, stock:string,talla:string){
    return this.database.executeSql('INSERT INTO producto(nombre,descripcion,categoria,foto,precio,stock,talla) VALUES (?,?,?,?,?,?,?)',[nombre,descripcion,categoria,foto,precio,stock,talla]).then(res=>{
      this.presentAlert("Insertar","Producto insertado")
      this.consultarProducto();
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }

  //FUNCIONANDO (VISTA DEL ADMIN)

  consultarSoloUsuario(){
    return this.database.executeSql('SELECT * FROM usuario WHERE rol = 2',[]).then(res=>{
      let users: Usuario[] = [];

      if(res.rows.length > 0){

        for(var i = 0; i < res.rows.length ; i++){

          users.push({

            id_user: res.rows.item(i).id_user,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            rut: res.rows.item(i).rut,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono,
            clave: res.rows.item(i).clave,
            foto: res.rows.item(i).foto,
            rol: res.rows.item(i).rol,
            descripcion_direccion: res.rows.item(i).descripcion_direccion,
            comuna_nombre: res.rows.item(i).comuna_nombre,
            region_nombre: res.rows.item(i).region_nombre,
          })
        }
      }
      this.listadoUsuario.next(users as any)
    })
  }

  consultarUsuario(){
    return this.database.executeSql('SELECT u.id_user, u.nombre, u.apellido, u.rut, u.correo , u.telefono, d.descripcion AS descripcion_direccion, c.nombre AS comuna_nombre, r.nombre AS region_nombre FROM usuario u JOIN direccion d ON d.usuario = u.id_user JOIN comuna c ON c.id_comuna = d.comuna JOIN region r ON r.id_region = c.region WHERE rol = 2',[]).then(res=>{
      let users: Usuario[] = [];

      if(res.rows.length > 0){

        for(var i = 0; i < res.rows.length ; i++){

          users.push({

            id_user: res.rows.item(i).id_user,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            rut: res.rows.item(i).rut,
            correo: res.rows.item(i).correo,
            telefono: res.rows.item(i).telefono,
            clave: res.rows.item(i).clave,
            foto: res.rows.item(i).foto,
            rol: res.rows.item(i).rol,
            descripcion_direccion: res.rows.item(i).descripcion_direccion,
            comuna_nombre: res.rows.item(i).comuna_nombre,
            region_nombre: res.rows.item(i).region_nombre,

          })
        }
      }
      this.listadoUsuario.next(users as any)
    })
  }

  visualizarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario WHERE id_user = ? ',[]).then(res=>{

    }).catch(e=>{
      this.presentAlert("Visualizar Usuario","Error: " + JSON.stringify(e));
    })
  }

  insertarUsuario(nombre:string, apellido:string, rut:number, correo:string, telefono:number,clave:string,rol:number){
    return this.database.executeSql("INSERT INTO usuario (nombre,apellido,rut,correo,telefono,clave,rol) VALUES (?,?,?,?,?,?,?)",[nombre,apellido,rut,correo,telefono,clave,rol]).then(res=>{
      this.presentAlert("Insertar","Usuario Insertado");
      this.consultarSoloUsuario();
    }).catch(e=>{
      this.presentAlert("Insertar", "Error: " + JSON.stringify(e));
    })
  }

  eliminarUsuario(id:string){
    return this.database.executeSql('DELETE FROM usuario WHERE id_user = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.consultarSoloUsuario();
    }).catch(e=>{
      this.presentAlert("Eliminar", "Error: " + JSON.stringify(e));
    })
  }

  //FUNCIONANDO
  consultarRegion(){
    return this.database.executeSql('SELECT * FROM region',[]).then(res=>{
      let regiones: Region[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          regiones.push({
            id_region: res.rows.item(i).id_region,
            nombre: res.rows.item(i).nombre,
          })
        }
      }
      this.listadoRegion.next(regiones as any)
    })
  }

  consultaComuna(){
    return this.database.executeSql('SELECT * FROM comuna',[]).then(res=>{
      let comunas: Comuna[] = [];

      if(res.rows.length > 0){

        for(var i = 0 ; i<res.rows.length; i++){
          comunas.push({
            id_comuna: res.rows.item(i).id_comuna,
            nombre: res.rows.item(i).nombre,
            region: res.rows.item(i).region,
          })
        }
      }
      this.listadoComuna.next(comunas as any)
    })
  }

}
