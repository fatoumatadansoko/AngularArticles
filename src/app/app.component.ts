import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Assurez-vous que ce composant est autonome
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet] // Assurez-vous que RouterOutlet est importé ici
})
export class AppComponent {
  title = 'Angular Articles';
}
