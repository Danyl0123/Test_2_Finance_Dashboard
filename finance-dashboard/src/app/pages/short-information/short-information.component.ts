import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-short-information',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './short-information.component.html',
  styleUrl: './short-information.component.css',
})
export class ShortInformationComponent {}
