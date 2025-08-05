import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-course-list',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss'
})
export class CourseListComponent implements OnInit {
  public cursos$ = this.coursesService.cursosFiltrados$;
  public categorias$ = this.coursesService.categoriasDisponiveis$;
  public categoriaSelecionada = '';
  public carregando = false;

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregando = true;
    this.cursos$.subscribe(() => {
      this.carregando = false;
    });
  }

  onCategoriaSelecionada(categoria: string): void {
    if (categoria === 'todas') {
      this.limparFiltroAtual();
    } else {
      this.categoriaSelecionada = categoria;
      this.coursesService.aplicarFiltroPorCategoria(categoria);
    }
  }

  limparFiltroAtual(): void {
    this.categoriaSelecionada = '';
    this.coursesService.limparFiltro();
  }

  temFiltroAtivo(): boolean {
    return this.categoriaSelecionada !== '' && this.categoriaSelecionada !== 'todas';
  }

  verDetalhes(cursoId: number): void {
    this.router.navigate(['/courses', cursoId]);
  }

  editarCurso(cursoId: number): void {
    this.router.navigate(['/courses', cursoId, 'edit']);
  }

  novoCurso(): void {
    this.router.navigate(['/courses/new']);
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
