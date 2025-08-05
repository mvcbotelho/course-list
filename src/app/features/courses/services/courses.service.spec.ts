import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService, Course } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    {
      id: 1,
      name: 'Angular Básico',
      category: 'Front-End',
      description: 'Introdução ao Angular 20 e conceitos de SPA.',
      duration: 20
    },
    {
      id: 2,
      name: 'React Avançado',
      category: 'Front-End',
      description: 'Conceitos avançados de React e hooks.',
      duration: 30
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all courses', () => {
    service.carregarTodosOsCursos();

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should get course by id', () => {
    const courseId = 1;
    service.obterCursoPorId(courseId).subscribe(course => {
      expect(course).toEqual(mockCourses[0]);
    });

    const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should add new course', () => {
    const newCourse: Course = {
      id: 3,
      name: 'Vue.js Básico',
      category: 'Front-End',
      description: 'Introdução ao Vue.js',
      duration: 15
    };

    service.adicionarNovoCurso(newCourse);

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });

  it('should update course', () => {
    const updatedCourse: Course = {
      id: 1,
      name: 'Angular Básico Atualizado',
      category: 'Front-End',
      description: 'Introdução ao Angular 20 e conceitos de SPA.',
      duration: 25
    };

    service.atualizarCurso(updatedCourse);

    const req = httpMock.expectOne(`http://localhost:3000/courses/${updatedCourse.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);
  });

  it('should remove course', () => {
    const courseId = 1;
    service.removerCurso(courseId);

    const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should apply category filter', () => {
    service.carregarTodosOsCursos();
    
    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush(mockCourses);

    service.aplicarFiltroPorCategoria('Front-End');

    service.cursosFiltrados$.subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses.every(course => course.category === 'Front-End')).toBe(true);
    });
  });

  it('should clear filter', () => {
    service.carregarTodosOsCursos();
    
    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush(mockCourses);

    service.limparFiltro();

    service.cursosFiltrados$.subscribe(courses => {
      expect(courses.length).toBe(2);
    });
  });

  it('should get available categories', () => {
    service.carregarTodosOsCursos();
    
    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush(mockCourses);

    service.categoriasDisponiveis$.subscribe(categories => {
      expect(categories).toEqual(['Front-End']);
    });
  });
}); 