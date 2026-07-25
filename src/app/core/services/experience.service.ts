import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/experience`;

  public getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  public createExperience(exp: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, exp);
  }

  public updateExperience(id: string, exp: Partial<Experience>): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, exp);
  }

  public deleteExperience(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
