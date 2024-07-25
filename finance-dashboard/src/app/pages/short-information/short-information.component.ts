import { Component } from '@angular/core';
import { ShortTableComponent } from '../../components/short-table/short-table.component';

@Component({
  selector: 'app-short-information',
  standalone: true,
  imports: [ShortTableComponent],
  templateUrl: './short-information.component.html',
  styleUrl: './short-information.component.css',
})
export class ShortInformationComponent {
  constructor() {}
}
