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

  private getInitials(name: string): string {
    return name
      .trim()
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  }

  private getGradient(): string {
    const color1 = this.stringToColor(this.fullName);
    const color2 = this.stringToColor(this.fullName + 'gradient');
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  }

  private stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  }
}
