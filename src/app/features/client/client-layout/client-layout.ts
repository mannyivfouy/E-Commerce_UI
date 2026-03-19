import { Component } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-client-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css',
})
export class ClientLayout {

}
