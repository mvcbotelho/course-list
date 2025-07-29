import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  // Mock
  loadCourses() {
    this.http.get<Course[]>(this.apiUrl).subscribe({
      next: (courses) => this.coursesSubject.next(courses),
      error: (err) => console.error('Erro ao carregar cursos:', err)
    });
  }

  addCourse(course: Course) {
    return this.http.post<Course>(this.apiUrl, course).subscribe(() => this.loadCourses());
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  updateCourse(course: Course) {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).subscribe(() => this.loadCourses());
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.loadCourses());
  }
}
