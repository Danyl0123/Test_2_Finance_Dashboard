import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MainTableComponent } from './pages/main-table/main-table.component';
import { ShortInformationComponent } from './pages/short-information/short-information.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

export const routes: Routes = [
  {
    path: ``,
    component: NavBarComponent,
    children: [
      { path: ``, component: MainTableComponent },
      {
        path: `short-information`,
        component: ShortInformationComponent,
      },
    ],
  },
];
