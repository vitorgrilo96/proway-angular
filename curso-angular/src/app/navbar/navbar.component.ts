import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ToastModule,
    MenubarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [MessageService]
})
export class NavbarComponent {
  constructor(private router: Router) { }

  items: MenuItem[] = [
    {"label": "home", command: () => this.navegar("/")},
    {"label": "filmes", command: () => this.navegar("/filmes")},
  ]
  navegar(navegateTo: string){
    this.router.navigate([navegateTo])
  }
}
