import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases : Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada : number = 0
  public rodadaFrase : Frase = new Frase('','')

  public progresso : number = 0;

  public tentativas: number = 3;

  @Output()
  public encerrarjogo : EventEmitter<string> = new EventEmitter();

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event): void{
    this.resposta = (<HTMLInputElement>resposta.target).value
    console.log(this.resposta);
  }

  public verificarResposta() : void {

    if(this.rodadaFrase.frasePrBr.toLowerCase() == this.resposta.trim().toLowerCase()){

      // trocar pergunta da rodada
      this.rodada++

      //progresso
      this.progresso =  this.progresso + (100 / this.frases.length)

      if(this.rodada === 4){
        this.encerrarjogo.emit('vitoria')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()

      //limpar a resposta
      this.resposta = ''

    } else{
      //diminuir tentativas
      this.tentativas--;

      if(this.tentativas === -1){
        this.encerrarjogo.emit('derrota')
      }

    }
  }

  public atualizaRodada() : void {
    this.rodadaFrase = this.frases[this.rodada];
  }

}
