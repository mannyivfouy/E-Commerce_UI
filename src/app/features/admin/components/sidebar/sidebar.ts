import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { AfterViewInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngAfterViewInit() {
    this.moveActiveBg();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => this.moveActiveBg(), 50);
    });
  }

  moveActiveBg() {
    const active = document.querySelector('.nav-link.active') as HTMLElement;
    const bg = document.querySelector('.active-bg') as HTMLElement;
    const container = document.querySelector('.sidebar-menu') as HTMLElement;

    if (active && bg && container) {
      const offset = active.offsetTop - container.offsetTop;

      bg.style.top = offset + 'px';
      bg.style.height = active.offsetHeight + 'px';
    }
  }
}
