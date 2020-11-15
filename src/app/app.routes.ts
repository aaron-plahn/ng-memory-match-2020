import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/components/pages/home/home.component';
import { MenuComponent } from '@src/app/components/pages/menu/menu.component';
import { GameComponent } from '@src/app/components/pages/game/game.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'game/:id',
    component: GameComponent
  }
];
