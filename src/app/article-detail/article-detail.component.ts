import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatabaseService,Article } from '../database.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [CommonModule, RouterModule, HttpClientModule,RouterLink]  // Ajouter HttpClientModule ici
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.databaseService.getArticle(+id).subscribe(
          article => {
            this.article = article;
            console.log('Article fetched:', article);
          },
          error => {
            console.error('Error fetching article:', error);
          }
        );
      }
    });
  }
  
  deleteArticle(): void {
    if (this.article) {
      this.databaseService.deleteArticle(this.article.id!).subscribe(
        () => {
          console.log('Article deleted');
          this.router.navigate(['/articles']);
        },
        error => {
          console.error('Error deleting article:', error);
        }
      );
    }
  }}
