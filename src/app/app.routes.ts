import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    // loadComponent:() => import('path') /* el componente debe ser export default*/
    loadComponent: ()=> import('@/calculator/views/calculator-view/calculator-view.component')
  },
  {
    path:'**',
    redirectTo: 'calculator'
  }
];
