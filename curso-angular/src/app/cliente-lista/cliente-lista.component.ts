import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-lista.component.html',
  styleUrl: './cliente-lista.component.css'
})

export class ClienteListaComponent {
  nomeCliente: string = "";
  indiceCliente: number = -1;
  avisoErro: string = "";
  tituloBotaoSalvarCliente: string = "cadastrar"


  clientes: Array<string> = []

  salvarCliente() {
    this.avisoErro = "";

    if (this.nomeCliente.length < 2) {
      this.avisoErro = "o nome deve conter ao menos 2 caracteres";
      return;
    } if (this.nomeCliente.length > 100) {
      this.avisoErro = "o nome deve conter ao menos 100 caracteres"
      return;
    }

    let temCliente = this.clientes.some(x => x === this.nomeCliente);
    if (temCliente === true) {
      this.avisoErro = `este cliente já está cadastrado"${this.nomeCliente}"`;
      return;
    }
    if (this.indiceCliente === -1) {
      this.clientes.push(this.nomeCliente);
    } else {
      this.clientes[this.indiceCliente] = this.nomeCliente;
      this.indiceCliente = -1;
      this.tituloBotaoSalvarCliente = "cadastrar";
    }
    this.nomeCliente = "";
  }

  deletarCliente(nomeCliente: string) {
    let indiceCliente = this.clientes.findIndex(x => x === nomeCliente);
    this.clientes.splice(indiceCliente, 1);
  }

  alterarCliente(nomeCliente: string) {
    this.indiceCliente = this.clientes.findIndex(x => x === nomeCliente);
    this.tituloBotaoSalvarCliente = "editar";
    this.nomeCliente = nomeCliente;
  }
}