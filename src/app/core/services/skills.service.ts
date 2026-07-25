import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/skills`;

  public getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  public createSkill(skill: Partial<Skill>): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }

  public updateSkill(id: string, skill: Partial<Skill>): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
  }

  public deleteSkill(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }
}
