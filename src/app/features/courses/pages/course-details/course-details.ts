import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService, Course } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss'
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  loading = true;
  error = false;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      this.loadCourse(courseId);
    });
  }

  private loadCourse(id: number): void {
    this.loading = true;
    this.error = false;

    this.coursesService.obterCursoPorId(id).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.showMessage('Erro ao carregar dados do curso', 'error');
      }
    });
  }

  editCourse(): void {
    if (this.course) {
      this.router.navigate(['/courses', this.course.id, 'edit']);
    }
  }

  backToList(): void {
    this.router.navigate(['/courses']);
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }

  getCategoriaColor(categoria: string): string {
    const cores: { [key: string]: string } = {
      'Front-End': 'primary',
      'Back-End': 'accent',
      'UI/UX': 'warn',
      'Mobile': 'primary',
      'DevOps': 'accent',
      'Data Science': 'warn'
    };
    return cores[categoria] || 'primary';
  }
}
