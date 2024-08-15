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
  indiceAlterar: number = -1;
  mensagemErro: string = '';
  tituloBotaoSalvarProduto: string = 'cadastrar'

  produtos: Array<string> = [
    //"iphone 14",
    //"motorola g7",
    //"xioami 9",
    //"nokia"
  ]

  salvarProduto(){
    // limpar mensagem de erro
    this.mensagemErro = '';

    if (this.nomeProduto.length < 3){
      this.mensagemErro = "produto deve conter no minimo 3 caracteres";
      return;
    }

    // verificar se o produto está cadastrado
    let existeProduto = this.produtos.some(x => x === this.nomeProduto);
    if (existeProduto === true) {
      this.mensagemErro = `produto já cadastrado com o nome '${this.nomeProduto}'`;
    return;
    }
    // verificar se está no modo de cadastro
    if (this.indiceAlterar === -1) {
      // adicionar o nome do produto que o usuário preencheu no input na lista de produtos
      this.produtos.push(this.nomeProduto);
    } else {
      // alterar o nome do produto que o usuário escolheu para editar
      this.produtos[this.indiceAlterar] = this.nomeProduto;
      // reset para o usuário poder cadastrar
      this.indiceAlterar = -1;
      // redefinir o texto do botão para cadastrar, para que o usuário saiba que está cadastrando um produto
      this.tituloBotaoSalvarProduto = "cadastrar";
    }
    // limpar campo
    this.nomeProduto = "";
  }

  apagarProduto(nomeProduto: string){
    let indiceProduto = this.produtos.findIndex(x => x === nomeProduto);
    this.produtos.splice(indiceProduto, 1);
  }
  // preencher os campos com os dados do produto
  editarProduto(nomeProduto: string){
    this.indiceAlterar = this.produtos.findIndex(x => x === nomeProduto);
    this.tituloBotaoSalvarProduto = "editar";
    this.nomeProduto = nomeProduto;
  }
  // <button (click)="editarProduto(produto)">Editar</button>
}
