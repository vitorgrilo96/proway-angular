import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { FilmeListaComponent } from './filme-lista/filme-lista.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, // diretiva usada para criar links que permitem a navegação entre componentes
    RouterLinkActive, // diretiva usada para aplicar classes css dinamicamente em um link
    RouterOutlet, // componente angular que atua como um componente de ancoragem ou container onde os componentes serão renderizados
    FormsModule, 
    NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nome: string = `TV tubalão`;
}