import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FutureProject, ProjectIdea } from '../models/idea.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  private http = inject(HttpClient);

  public getFutureProjects(): Observable<FutureProject[]> {
    return this.http.get<FutureProject[]>(`${environment.apiUrl}/future-projects`);
  }

  public createFutureProject(project: Partial<FutureProject>): Observable<FutureProject> {
    return this.http.post<FutureProject>(`${environment.apiUrl}/future-projects`, project);
  }

  public getProjectIdeas(): Observable<ProjectIdea[]> {
    return this.http.get<ProjectIdea[]>(`${environment.apiUrl}/ideas`);
  }

  public createProjectIdea(idea: Partial<ProjectIdea>): Observable<ProjectIdea> {
    return this.http.post<ProjectIdea>(`${environment.apiUrl}/ideas`, idea);
  }
}
