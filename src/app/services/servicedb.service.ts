import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServicedbService {

  //variable para la conexion a la base de datos
  public database!: SQLiteObject;

  //variables de creacion de tablas

  //TABLA ROL
  tablaRol: string = "CREATE TABLE rol(id_rol INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  //TABLA TALLA
  tablaTalla: string = "CREATE TABLE talla(id_talla INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(10) NOT NULL);";

  //TABLA CATEGORIA
  tablaCategoria: string = "CREATE TABLE categoria(id_categoria INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  //TABLA PRODUCTO
  tablaProducto: string = "CREATE TABLE producto(id_producto INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, descripcion VARCHAR(100) NOT NULL,categoria INTEGER NOT NULL, foto TEXT NOT NULL, precio INTEGER NOT NULL, stock INTEGER NOT NULL,talla INTEGER NOT NULL, FOREIGN KEY(categoria) REFERENCES categoria(id_categoria), FOREIGN KEY(talla) REFERENCES talla(id_talla));";

  //TABLA USUARIO
  tablaUsuario: string = "CREATE TABLE usuario(id_user INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(100) NOT NULL, rut TEXT NOT NULL, correo TEXT NOT NULL, telefono TEXT NOT NULL, clave TEXT NOT NULL, foto TEXT, rol INTEGER NOT NULL, FOREIGN KEY(rol) REFERENCES rol(id_rol));";

  //TABLA REFGION
  tablaRegion: string = "CREATE TABLE region(id_region INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL);";

  //TABLA COMUNA
  tablaComuna: string = "CREATE TABLE comuna(id_comuna INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, region INTEGER NOT NULL, FOREIGN KEY(region) REFERENCES region(id_region));";

  //TABLA DIRECCION
  tablaDireccion: string = "CREATE TABLE direccion(id_direccion INTEGER PRIMARY KEY autoincrement, descripcion TEXT NOT NULL, comuna INTEGER NOT NULL, usuario INTEGER NOT NULL, FOREIGN KEY(comuna) REFERENCES comuna(id_comuna), FOREIGN KEY(usuario) REFERENCES usuario(id_user));";

  //TABLA ESTADO
  tablaEstado: string = "CREATE TABLE estado(id_estado INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL);";

  //TABLA PEDIDO
  tablaPedido: string = "CREATE TABLE pedido(id_pedido INTEGER PRIMARY KEY autoincrement, fecha_pedido TEXT NOT NULL, usuario INTEGER NOT NULL, direccion INTEGER NOT NULL, total INTEGER NOT NULL, estado INTEGER NOT NULL, carrito INTEGER NOT NULL DEFAULT 0, FOREIGN KEY(usuario) REFERENCES usuario(id_user), FOREIGN KEY(direccion) REFERENCES direccion(id_direccion), FOREIGN KEY(estado) REFERENCES estado(id_estado));";

  //TABLA DETALLE
  tablaDetalle: string = "CREATE TABLE detalle(id_detalle INTEGER PRIMARY KEY autoincrement, pedido INTEGER NOT NULL, producto INTEGER NOT NULL, cantidad INTEGER NOT NULL, subtotal INTEGER NOT NULL, FOREIGN KEY(pedido) REFERENCES pedido(id_pedido), FOREIGN KEY(producto) REFERENCES producto(id_producto));";

  constructor() { }
}
