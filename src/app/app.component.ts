import { FormsModule } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RulesComponent } from "./rules/rules.component";

interface ReponseDisplay {
  reponse?: string;
  style?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RulesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  question: string = '';
  reponse: ReponseDisplay = {};
  displayRules: boolean = false;

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.verifierQuestion();
    }
  }

  verifierQuestion() {
    if (this.question) {
      const test = this.question.normalize("NFD").replace(/\p{Diacritic}/gu, "").toUpperCase();
      switch (test) {
        case 'BAYONNE':
          this.reponse = {
            reponse: '/r.jpg',
            style: 'w-50 fade-slow'
          }
          break;
        case 'GIBERT':
          this.reponse = {
            reponse: '/g.jpg',
            style: 'w-50 fade-slow'
          }
          break;
        case 'TECH':
          this.reponse = {
            reponse: '/t.jpg',
            style: 'w-50 fade-slow'
          }
          break;
        case 'AMOUR':
          this.reponse = {
            reponse: '/a.jpg',
            style: 'w-50 fade-slow'
          }
          break;
        default:
          const i = Math.floor(Math.random() * 6) + 1;
          this.reponse = {
            reponse: `/no${i}.gif`,
            style: 'w-25 fade-fast'
          }
          break;
      }
    }
  }

  affichageRegles(doitAfficher: boolean) {
    this.displayRules = doitAfficher;
  }
}