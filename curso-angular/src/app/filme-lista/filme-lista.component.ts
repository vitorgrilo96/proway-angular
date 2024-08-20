import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

interface Filme {
  id: number;
  nome: string;
  duracao: number;
  lancamento: string;
  autor: string;
  orcamento: number;
  categoria: string;
}

@Component({
  selector: 'app-filme-lista',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './filme-lista.component.html',
  styleUrl: './filme-lista.component.css'
})

export class FilmeListaComponent {
  filmes: Array<Filme> = [];
  carregandoFilmes: boolean = false;

  categorias = [
    { "id": "terror", "nome": "terror" },
    { "id": "suspense", "nome": "suspense" },
    { "id": "ação", "nome": "ação" },
  ]

  visible: boolean = false;

  nome: string = "";
  duracao: number = 0;
  lancamento: string = "";
  autor: string = "";
  orcamento: number = 0;
  categoria: any = "";

  constructor(
    private router: Router,
    private httpClient: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.carregandoFilmes = true;
    this.httpClient.get<Array<Filme>>("http://localhost:3000/filmes").subscribe(x => this.aposConsultar(x));
  }

  aposConsultar(dados: Array<Filme>) {
    this.filmes = dados;
    this.carregandoFilmes = false;
  }

  apagar(filme: Filme) {
    this.confirmationService.confirm({
      message: `deseja mesmo apagar '${filme.nome}'?`,
      header: 'cuida',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Sim",
      rejectLabel: "Não",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.httpClient.delete(`http://localhost:3000/filmes/${filme.id}`)
          .subscribe(x => this.apagouRegistro());
      },
      reject: () => {
        this.messageService.add({ severity: 'success', detail: 'não foi apagado', life: 3000 });
      }
    });
  }

  apagouRegistro() {
    this.messageService.add({detail: "filme apagado", severity: "success"});
    // atualizar os registros pois o filme foi apagado
    this.consultar();
  }

  salvar() {
    let dados = {
      nome: this.nome,
      duracao: this.duracao,
      autor: this.autor,
      orcamento: this.orcamento,
      categoria: this.categoria["nome"],
    }

    this.httpClient.post("http://localhost:3000/filmes", dados)
      .subscribe(x => this.aposSalvar(x));
  }

  aposSalvar(x: any) {
    this.limparCampos();
    this.consultar();
    this.visible = false;
  }

  limparCampos() {
    this.nome = "";
    this.duracao = 0;
    this.autor = "";
    this.lancamento = "";
    this.orcamento = 0;
    this.categoria = "";
  }

  editar(id: number) {
    this.router.navigate([`/filmes/${id}`]);
  }

  showDialog() {
    this.visible = true
  }
}