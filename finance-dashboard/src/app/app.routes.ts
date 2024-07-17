import { Routes } from '@angular/router';
import { MainTableComponent } from './pages/main-table/main-table.component';
import { ShortInformationComponent } from './pages/short-information/short-information.component';

export const routes: Routes = [
  { path: ``, component: MainTableComponent },
  {
    path: `short-information`,
    component: ShortInformationComponent,
  },
];
