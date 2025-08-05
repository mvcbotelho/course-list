import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Course {
  id: number;
  name: string;
  category: string;
  description: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API_URL = 'http://localhost:3000/courses';
  private todosOsCursosSubject = new BehaviorSubject<Course[]>([]);
  private filtroCategoriaSubject = new BehaviorSubject<string>('');

  public cursosFiltrados$: Observable<Course[]> = combineLatest([
    this.todosOsCursosSubject.asObservable(),
    this.filtroCategoriaSubject.asObservable().pipe(startWith(''))
  ]).pipe(
    map(([cursos, categoriaFiltro]) => {
      if (!categoriaFiltro || categoriaFiltro.trim() === '') {
        return cursos;
      }
      return cursos.filter(curso =>
        curso.category.toLowerCase().includes(categoriaFiltro.toLowerCase())
      );
    })
  );

  public categoriasDisponiveis$: Observable<string[]> = this.todosOsCursosSubject.asObservable().pipe(
    map(cursos => {
      const categorias = cursos.map(curso => curso.category);
      return [...new Set(categorias)].sort();
    })
  );

  constructor(private http: HttpClient) {
    this.carregarTodosOsCursos();
  }

  public carregarTodosOsCursos(): void {
    try {
      this.http.get<Course[]>(this.API_URL).subscribe({
        next: (cursos) => {
          this.todosOsCursosSubject.next(cursos);
        },
        error: (erro) => {
          this.todosOsCursosSubject.next([]);
        }
      });
    } catch (erro) {
      this.todosOsCursosSubject.next([]);
    }
  }

  public aplicarFiltroPorCategoria(categoria: string): void {
    this.filtroCategoriaSubject.next(categoria);
  }

  public limparFiltro(): void {
    this.filtroCategoriaSubject.next('');
  }

  public adicionarNovoCurso(curso: Course): Observable<Course> {
    return this.http.post<Course>(this.API_URL, curso);
  }

  public obterCursoPorId(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

  public atualizarCurso(curso: Course): Observable<Course> {
    return this.http.put<Course>(`${this.API_URL}/${curso.id}`, curso);
  }

  public removerCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
