import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar implements OnInit {
  @Input() fullName: string = '';
  initials: string = '';
  gradientBackground: string = '';

  ngOnInit(): void {
    this.initials = this.getInitials(this.fullName);
    this.gradientBackground = this.getGradient();
  }

  getInitials(name: string): string {
    return name
      .trim()
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  }

  getGradient(): string {
    const hue = this.getHue(this.fullName);
    const hue2 = (hue + 30) % 360; // small shift for gradient

    return `linear-gradient(135deg,
    hsl(${hue}, 70%, 60%),
    hsl(${hue2}, 70%, 50%)
  )`;
  }

  getHue(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
  }
}
