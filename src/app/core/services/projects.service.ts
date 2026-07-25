import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  public getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  public createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  public updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  public deleteProject(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
