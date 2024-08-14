import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent {
  nomeProduto: string = "";

  produtos: Array<string> = [
    //"iphone 14",
    //"motorola g7",
    //"xioami 9",
    //"nokia"
  ]

  cadastrarProduto(){
    // verificar se o produto está cadastrado
    let existeProduto = this.produtos.some(x => x === this.nomeProduto);
    if (existeProduto === true)
    return;

    // adicionar o nome do produto que o usuario preencheu no input na lista de produtos
    this.produtos.push(this.nomeProduto);
    // limpar campo
    this.nomeProduto = "";
  }

  apagarProduto(nomeProduto: string){
    let indiceProduto = this.produtos.findIndex(x => x === nomeProduto);
    this.produtos.splice(indiceProduto, 1);
  }
}
