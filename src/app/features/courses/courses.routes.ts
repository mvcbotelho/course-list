import { Routes } from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list';
import { CourseDetailsComponent } from './pages/course-details/course-details';
import { CourseFormComponent } from './pages/course-form/course-form';
import { AuthGuard } from '../../guards/auth.guard';

export const COURSES_ROUTES: Routes = [
  { path: '', component: CourseListComponent },
  {
    path: 'new',
    component: CourseFormComponent,
    canActivate: [AuthGuard] // Protege criação de novos cursos
  },
  { path: ':id', component: CourseDetailsComponent },
  {
    path: ':id/edit',
    component: CourseFormComponent,
    canActivate: [AuthGuard] // Protege edição de cursos
  }
];
