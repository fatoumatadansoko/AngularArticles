import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  standalone: true,
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule,RouterLink]  // Ajouter HttpClientModule ici
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  articleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.articleId = +params.get('id')!;
      if (this.articleId) {
        this.databaseService.getArticle(this.articleId).subscribe(article => {
          this.articleForm.patchValue(article);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.articleId) {
      this.databaseService.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    } else {
      this.databaseService.createArticle(this.articleForm.value).subscribe(() => {
        this.router.navigate(['/articles']);
        console.log(this.articleForm)
      });
    }
  }
}
