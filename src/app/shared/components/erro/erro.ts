import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-erro',
  templateUrl: './erro.html',
})
export class Erro {
  readonly titulo = input.required<string>();
  readonly descricao = input<string>();
}
