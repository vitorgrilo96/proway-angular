import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
  categoria: string | any;
}

@Component({
  selector: 'app-filme-editar',
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
    ProgressSpinnerModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './filme-editar.component.html',
  styleUrl: './filme-editar.component.css'
})
export class FilmeEditarComponent {
  protected carregandoFilme: Boolean = false;
  private id: string | null = null;
  protected filme: Filme | null = null;

  categorias = [
    { "id": "terror", "nome": "terror" },
    { "id": "suspense", "nome": "suspense" },
    { "id": "ação", "nome": "ação" },
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient) {
    //this.router.navigate(["/filmes"]);
  }

  ngOnInit() {
    //obter da rota atual o parâmetro id
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.consultar()
  }

  consultar() {
    this.carregandoFilme = true;
    this.httpClient.get<Filme>(`http://localhost:3000/filmes/${this.id}`).subscribe(x => {
      this.carregandoFilme = false;
      this.filme = x;
      console.log(x)
    });
  }

  salvar() {
    let dados = {
      nome: this.filme?.nome,
      duracao: this.filme?.duracao,
      autor: this.filme?.autor,
      lancamento: this.filme?.lancamento,
      orcamento: this.filme?.orcamento,
      categoria: this.filme?.categoria["nome"],
    }
    this.httpClient.put(`http://localhost:3000/filmes/${this.id}`, dados)
      .subscribe(x => this.router.navigate(["/filmes"]))
  }
}
