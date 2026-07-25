import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage } from '../models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/contact`;

  public sendMessage(messageData: { name: string; email: string; subject?: string; message: string }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(this.apiUrl, messageData);
  }

  public getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.apiUrl);
  }
}
