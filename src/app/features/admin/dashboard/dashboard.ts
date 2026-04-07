import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { DashboardStats } from '../../../models/dashboard.model';
import { DashboardService } from '../../../core/services/dashboard-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCard, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats!: DashboardStats;
  loading: boolean = true;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getDashboardStats();
  }

  getDashboardStats() {
    this.loading = true;

    this.dashboardService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
