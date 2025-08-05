import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService, Course } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditing = false;
  courseId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(200)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.courseId = +params['id'];
        this.loadCourse(this.courseId);
      }
    });
  }

  private loadCourse(id: number): void {
    this.loading = true;
    this.coursesService.obterCursoPorId(id).subscribe({
      next: (course) => {
        this.courseForm.patchValue(course);
        this.loading = false;
      },
      error: (error) => {
        this.showMessage('Erro ao carregar dados do curso', 'error');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.loading = true;
      const courseData = this.courseForm.value;

      if (this.isEditing && this.courseId) {
        const updatedCourse: Course = { ...courseData, id: this.courseId };
        this.coursesService.atualizarCurso(updatedCourse).subscribe({
          next: () => {
            this.showMessage('Curso atualizado com sucesso!', 'success');
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            this.showMessage('Erro ao atualizar curso', 'error');
            this.loading = false;
          }
        });
      } else {
        this.coursesService.adicionarNovoCurso(courseData).subscribe({
          next: () => {
            this.showMessage('Curso criado com sucesso!', 'success');
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            this.showMessage('Erro ao criar curso', 'error');
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
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

  getErrorMessage(fieldName: string): string {
    const field = this.courseForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.getError('minlength').requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }
    if (field?.hasError('min')) {
      return 'Valor mínimo é 1';
    }
    if (field?.hasError('max')) {
      return 'Valor máximo é 200';
    }
    return '';
  }
}
