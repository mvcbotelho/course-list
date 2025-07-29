import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss'
})

export class CourseListComponent implements OnInit {
  courses$ = this.coursesService.courses$;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.loadCourses();
  }
}
