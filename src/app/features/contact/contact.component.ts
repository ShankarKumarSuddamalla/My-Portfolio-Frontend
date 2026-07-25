import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { ContactMessage } from '../../core/models/contact.model';

@Component({
  selector: 'app-contact-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Contact Messages Inbox</h2>
          <p>Review direct inquiries, hiring opportunities, and consultation requests</p>
        </div>
      </div>

      <div class="messages-list">
        @for (msg of messages(); track msg.id) {
          <div class="msg-card glass-card" [class.unread]="!msg.isRead">
            <div class="msg-top">
              <div class="sender-info">
                <span class="sender-name">{{ msg.name }}</span>
                <span class="sender-email">&lt;{{ msg.email }}&gt;</span>
              </div>
              <span class="msg-date">{{ msg.createdAt | date:'medium' }}</span>
            </div>

            <div class="msg-subject" *ngIf="msg.subject">
              <strong>Subject:</strong> {{ msg.subject }}
            </div>

            <p class="msg-body">{{ msg.message }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .messages-list { display: flex; flex-direction: column; gap: 16px; }
    .msg-card { padding: 22px; border-left: 4px solid var(--border-color); &.unread { border-left-color: var(--primary-color); background: rgba(99, 102, 241, 0.05); } }
    .msg-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px; }
    .sender-name { font-weight: 800; font-size: 1.05rem; }
    .sender-email { font-size: 0.85rem; color: var(--primary-color); font-weight: 600; margin-left: 6px; }
    .msg-date { font-size: 0.78rem; color: var(--text-muted); font-weight: 600; }
    .msg-subject { font-size: 0.9rem; margin-bottom: 10px; color: var(--text-main); }
    .msg-body { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }
  `]
})
export class ContactManagementComponent implements OnInit {
  public contactService = inject(ContactService);
  public messages = signal<ContactMessage[]>([]);

  public ngOnInit(): void {
    this.contactService.getMessages().subscribe(list => this.messages.set(list));
  }
}
