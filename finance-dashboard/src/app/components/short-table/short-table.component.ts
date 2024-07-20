import { Component, OnInit, Pipe } from '@angular/core';
import { AverageMetrics } from '../../data/interfaces/average-metrics';
import { User } from '../../data/interfaces/user.interface';
import { UserContentService } from '../../data/services/user-content.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-short-table',
  standalone: true,
  templateUrl: './short-table.component.html',
  styleUrls: ['./short-table.component.css'],
})
export class ShortTableComponent implements OnInit {
  metrics: AverageMetrics = {};

  constructor(private userContentService: UserContentService) {}

  ngOnInit(): void {
    this.userContentService.getData().subscribe((users) => {
      this.calculateMetrics(users);
    });
  }

  private calculateMetrics(users: User[]): void {
    users.forEach((user) => {
      const issuanceMonth = new Date(user.issuance_date).toLocaleString(
        'uk-UA',
        { month: 'long', year: 'numeric' }
      );

      if (!this.metrics[issuanceMonth]) {
        this.metrics[issuanceMonth] = {
          totalCredits: 0,
          totalAmount: 0,
          averageAmount: 0,
          totalInterest: 0,
          totalReturnedCredits: 0,
        };
      }

      this.metrics[issuanceMonth].totalCredits += 1;
      this.metrics[issuanceMonth].totalAmount += user.body;
      this.metrics[issuanceMonth].totalInterest += user.percent;
      if (user.actual_return_date) {
        this.metrics[issuanceMonth].totalReturnedCredits += 1;
      }
    });

    for (let month in this.metrics) {
      this.metrics[month].averageAmount = parseFloat(
        (
          this.metrics[month].totalAmount / this.metrics[month].totalCredits
        ).toFixed(2)
      );
    }
  }

  getMonths(): string[] {
    return Object.keys(this.metrics);
  }
}
