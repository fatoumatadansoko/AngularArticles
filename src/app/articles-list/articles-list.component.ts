import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  imports: [CommonModule, RouterModule, HttpClientModule,RouterLink]
})
export class ArticlesListComponent implements OnInit {
  articles: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getArticles().subscribe(
      data => {
        // console.log('Articles fetched:', data);
        this.articles = data;
      },
      error => {
        console.error('Error fetching articles:', error);
      }
    );
  }
}
