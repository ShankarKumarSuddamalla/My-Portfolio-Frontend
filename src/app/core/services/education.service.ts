import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../models/education.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/education`;

  public getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  public createEducation(edu: Partial<Education>): Observable<Education> {
    return this.http.post<Education>(this.apiUrl, edu);
  }

  public updateEducation(id: string, edu: Partial<Education>): Observable<Education> {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, edu);
  }

  public deleteEducation(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
