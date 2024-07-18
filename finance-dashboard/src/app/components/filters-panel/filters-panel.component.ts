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
  issuanceStart: string = '';
  issuanceEnd: string = '';
  showOverdueOnly: boolean = false;

  @Output() filterChange = new EventEmitter<{
    issuanceStart: string;
    issuanceEnd: string;
    showOverdueOnly: boolean;
  }>();

  onFilterChange() {
    this.filterChange.emit({
      issuanceStart: this.issuanceStart,
      issuanceEnd: this.issuanceEnd,
      showOverdueOnly: this.showOverdueOnly,
    });
  }
}
