import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../../../services/auth.service';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockCourses = [
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

  beforeEach(async () => {
    const coursesSpy = jasmine.createSpyObj('CoursesService', [
      'carregarTodosOsCursos',
      'aplicarFiltroPorCategoria',
      'limparFiltro'
    ]);
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        CourseListComponent
      ],
      providers: [
        { provide: CoursesService, useValue: coursesSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Mock observables
    coursesService.cursosFiltrados$ = jasmine.createSpyObj('Observable', ['subscribe']);
    coursesService.categoriasDisponiveis$ = jasmine.createSpyObj('Observable', ['subscribe']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    component.ngOnInit();
    expect(coursesService.carregarTodosOsCursos).toHaveBeenCalled();
  });

  it('should apply category filter', () => {
    const category = 'Front-End';
    component.onCategoriaSelecionada(category);
    expect(coursesService.aplicarFiltroPorCategoria).toHaveBeenCalledWith(category);
    expect(component.categoriaSelecionada).toBe(category);
  });

  it('should clear filter when "todas" is selected', () => {
    component.onCategoriaSelecionada('todas');
    expect(coursesService.limparFiltro).toHaveBeenCalled();
    expect(component.categoriaSelecionada).toBe('');
  });

  it('should clear current filter', () => {
    component.categoriaSelecionada = 'Front-End';
    component.limparFiltroAtual();
    expect(coursesService.limparFiltro).toHaveBeenCalled();
    expect(component.categoriaSelecionada).toBe('');
  });

  it('should check if filter is active', () => {
    component.categoriaSelecionada = '';
    expect(component.temFiltroAtivo()).toBe(false);

    component.categoriaSelecionada = 'Front-End';
    expect(component.temFiltroAtivo()).toBe(true);

    component.categoriaSelecionada = 'todas';
    expect(component.temFiltroAtivo()).toBe(false);
  });

  it('should navigate to course details', () => {
    spyOn(component['router'], 'navigate');
    const courseId = 1;
    
    component.verDetalhes(courseId);
    
    expect(component['router'].navigate).toHaveBeenCalledWith(['/courses', courseId]);
  });

  it('should navigate to edit course', () => {
    spyOn(component['router'], 'navigate');
    const courseId = 1;
    
    component.editarCurso(courseId);
    
    expect(component['router'].navigate).toHaveBeenCalledWith(['/courses', courseId, 'edit']);
  });

  it('should navigate to new course', () => {
    spyOn(component['router'], 'navigate');
    
    component.novoCurso();
    
    expect(component['router'].navigate).toHaveBeenCalledWith(['/courses/new']);
  });
});
