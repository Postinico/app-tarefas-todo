import { Component } from '@angular/core';
import { Tarefa } from 'src/Models/Tarefa.Models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }

  public modo='lista';
  public Tarefas: Tarefa[] = [];
  public Titulo: string ="Tarefas";
  public form: FormGroup;
 
  constructor(private fb: FormBuilder) {
    this.form= this.fb.group({
      titulo:['',Validators.compose([
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.required
      ])]
    })

      this.Carregar();
  }
  Adicionar(){
    //this.form.value =>{titulo:'teste'}
    const titulo = this.form.controls['titulo'].value;
    const id = this.Tarefas.length +1;
    this.Tarefas.push(new Tarefa(titulo,false,id)); 
    this.Salvar();
    this.Limpar();
  }
  Alterar(){
    this.Titulo ='Hello Young';
  }
  Remover(tarefa:Tarefa){
    const index= this.Tarefas.indexOf(tarefa);
    if (index !== -1) {
      this.Tarefas.splice(index,1);
      this.Salvar();
    }
  }
  Salvar(){
    const data = JSON.stringify(this.Tarefas);
    localStorage.setItem('Tarefas',data);
    this.modo='lista';
    this.Limpar();
  }
  Carregar(){
    const data = localStorage.getItem('Tarefas');
    if (data) {
      this.Tarefas = JSON.parse(data);
    }
    else{
      this.Tarefas = [];
    }
    
  }
  Limpar(){
    this.form.reset();
  }
  Concluir(tarefa: Tarefa){
    tarefa.done = true;
    this.Salvar();
  }
  Refazer(tarefa: Tarefa){
    tarefa.done = false;
    this.Salvar();

  }
  mudarModo(Modo: string){
    this.modo = Modo;

  }
}

