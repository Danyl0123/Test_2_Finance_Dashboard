import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.css'],
})
export class FiltersPanelComponent {
  issuanceStartFrom: string = '';
  issuanceStartTo: string = '';
  issuanceEndFrom: string = '';
  issuanceEndTo: string = '';
  showOverdueOnly: boolean = false;
  @Output() filterChange = new EventEmitter<{
    issuanceStartFrom: string;
    issuanceStartTo: string;
    issuanceEndFrom: string;
    issuanceEndTo: string;
    showOverdueOnly: boolean;
  }>();

  onFilterChange() {
    this.filterChange.emit({
      issuanceStartFrom: this.issuanceStartFrom,
      issuanceStartTo: this.issuanceStartTo,
      issuanceEndFrom: this.issuanceEndFrom,
      issuanceEndTo: this.issuanceEndTo,
      showOverdueOnly: this.showOverdueOnly,
    });
  }
}
