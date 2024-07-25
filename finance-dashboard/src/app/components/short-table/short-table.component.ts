import { Component, OnInit } from '@angular/core';
import { MetricsByMonth } from '../../data/interfaces/average-metrics';
import { User } from '../../data/interfaces/user.interface';
import { UserContentService } from '../../data/services/user-content.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  imports: [CommonModule],
  selector: 'app-short-table',
  standalone: true,
  templateUrl: './short-table.component.html',
  styleUrls: ['./short-table.component.css'],
})
export class ShortTableComponent implements OnInit {
  metrics: MetricsByMonth = {};
  topUsersByCredits: { user: string; count: number }[] = [];
  topUsersByInterest: { user: string; totalInterest: number }[] = [];
  topUsersByRatio: { user: string; ratio: number }[] = [];

  private subscription!: Subscription;

  constructor(private userContentService: UserContentService) {}

  ngOnInit(): void {
    this.subscription = this.userContentService.getData().subscribe((users) => {
      this.calculateMetrics(users);
      this.calculateTopUsers(users);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculateMetrics(users: User[]): void {
    const userCredits: { [key: string]: number } = {};
    const userPaidInterest: { [key: string]: number } = {};
    const userIssuedAmount: { [key: string]: number } = {};

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

      if (!userCredits[user.user]) {
        userCredits[user.user] = 0;
        userPaidInterest[user.user] = 0;
        userIssuedAmount[user.user] = 0;
      }

      userCredits[user.user] += 1;
      if (user.actual_return_date) {
        userPaidInterest[user.user] += user.percent;
      }
      userIssuedAmount[user.user] += user.body;
    });

    for (let month in this.metrics) {
      this.metrics[month].averageAmount = parseFloat(
        (
          this.metrics[month].totalAmount / this.metrics[month].totalCredits
        ).toFixed(2)
      );
    }
  }

  private calculateTopUsers(users: User[]): void {
    const userCredits: { [key: string]: number } = {};
    const userPaidInterest: { [key: string]: number } = {};
    const userIssuedAmount: { [key: string]: number } = {};

    users.forEach((user) => {
      if (!userCredits[user.user]) {
        userCredits[user.user] = 0;
        userPaidInterest[user.user] = 0;
        userIssuedAmount[user.user] = 0;
      }

      userCredits[user.user] += 1;
      userPaidInterest[user.user] += user.percent;
      userIssuedAmount[user.user] += user.body;
    });

    this.topUsersByCredits = Object.keys(userCredits)
      .map((user) => ({ user, count: userCredits[user] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    this.topUsersByInterest = Object.keys(userPaidInterest)
      .map((user) => ({ user, totalInterest: userPaidInterest[user] }))
      .sort((a, b) => b.totalInterest - a.totalInterest)
      .slice(0, 10);

    this.topUsersByRatio = Object.keys(userIssuedAmount)
      .map((user) => ({
        user,
        ratio: userIssuedAmount[user]
          ? userPaidInterest[user] / userIssuedAmount[user]
          : 0,
      }))
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 10);
  }

  getMonths(): string[] {
    return Object.keys(this.metrics);
  }
}
