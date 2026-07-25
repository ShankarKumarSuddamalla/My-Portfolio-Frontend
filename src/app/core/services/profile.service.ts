import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/profile`;

  public getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }

  public updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(this.apiUrl, profile);
  }
}
