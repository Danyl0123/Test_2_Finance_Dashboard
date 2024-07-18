import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-short-information',
  standalone: true,
  imports: [TableComponent, NavBarComponent],
  templateUrl: './short-information.component.html',
  styleUrl: './short-information.component.css',
})
export class ShortInformationComponent {}
