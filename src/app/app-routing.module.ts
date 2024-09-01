import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'detalleItem/:id',
    loadChildren: () => import('./pages/detalleItem/detalleItem.module').then(m => m.DetalleItemPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'Cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
    
  },
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'envio',
    loadChildren: () => import('./pages/envio/envio.module').then( m => m.EnvioPageModule)
  },
  {
    path: 'adminlogin',
    loadChildren: () => import('./pages/adminlogin/adminlogin.module').then( m => m.AdminloginPageModule)
  },
  {
    path: 'adminproductos',
    loadChildren: () => import('./pages/adminproductos/adminproductos.module').then( m => m.AdminproductosPageModule)
  },
  {
    path: 'agregarproductos',
    loadChildren: () => import('./pages/agregarproductos/agregarproductos.module').then( m => m.AgregarproductosPageModule)
  },
  {
    path: 'adminusuarios',
    loadChildren: () => import('./pages/adminusuarios/adminusuarios.module').then( m => m.AdminusuariosPageModule)
  },
  {
    path: 'adminprincipal',
    loadChildren: () => import('./pages/adminprincipal/adminprincipal.module').then( m => m.AdminprincipalPageModule)
  },
  {
    path: 'adminpedidos',
    loadChildren: () => import('./pages/adminpedidos/adminpedidos.module').then( m => m.AdminpedidosPageModule)
  },
  {
    path: 'detallepedido',
    loadChildren: () => import('./pages/detallepedido/detallepedido.module').then( m => m.DetallepedidoPageModule)
  },
  {
    path: 'infousuario',
    loadChildren: () => import('./pages/infousuario/infousuario.module').then( m => m.InfousuarioPageModule)
  },
  {
    path: 'editarproductos',
    loadChildren: () => import('./pages/editarproductos/editarproductos.module').then( m => m.EditarproductosPageModule)
  },
  {
    path: 'recuperarpassword',
    loadChildren: () => import('./pages/recuperarpassword/recuperarpassword.module').then( m => m.RecuperarpasswordPageModule)
  },
  {
    path: 'cambiarpassword',
    loadChildren: () => import('./pages/cambiarpassword/cambiarpassword.module').then( m => m.CambiarpasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },


  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
