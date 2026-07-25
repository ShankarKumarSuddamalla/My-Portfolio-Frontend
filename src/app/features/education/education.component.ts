import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EducationService } from '../../core/services/education.service';
import { ToastService } from '../../core/services/toast.service';
import { Education } from '../../core/models/education.model';
import { EducationFormModalComponent } from './education-form-modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Education & Academic Credentials Management</h2>
          <p>Degrees, CGPA metrics, and university achievements</p>
        </div>

        <button (click)="openCreateModal()" class="btn-primary">
          <i class="fa-solid fa-plus"></i>
          <span>Add Education Record</span>
        </button>
      </div>

      <div class="edu-grid">
        @for (edu of educations(); track edu.id) {
          <div class="edu-card glass-card">
            <div class="card-header">
              <div>
                <h3 class="degree">{{ edu.degree }}</h3>
                <span class="institution">{{ edu.institution }} — {{ edu.fieldOfStudy }}</span>
              </div>
              <div class="action-btns">
                <button (click)="openEditModal(edu)" class="icon-btn edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button (click)="deleteEducation(edu)" class="icon-btn delete"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </div>

            <div class="card-meta">
              <span class="badge badge-emerald">CGPA: {{ edu.cgpa }}</span>
              <span class="timeframe">{{ edu.startDate | date:'yyyy' }} - {{ edu.endDate | date:'yyyy' }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .edu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; }
    .edu-card { padding: 24px; }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; .degree { font-size: 1.15rem; font-weight: 800; margin: 0; } .institution { font-size: 0.88rem; color: var(--text-secondary); display: block; margin-top: 2px; } }
    .card-meta { display: flex; align-items: center; gap: 14px; font-size: 0.82rem; }
    .action-btns { display: flex; gap: 6px; }
    .icon-btn { background: transparent; border: none; font-size: 1rem; cursor: pointer; padding: 6px; border-radius: 4px; &.edit { color: var(--accent-color); } &.delete { color: #f43f5e; } }
  `]
})
export class EducationComponent implements OnInit {
  public educationService = inject(EducationService);
  public toastService = inject(ToastService);
  public dialog = inject(MatDialog);

  public educations = signal<Education[]>([]);

  public ngOnInit(): void {
    this.loadEducation();
  }

  public loadEducation(): void {
    this.educationService.getEducation().subscribe(list => this.educations.set(list));
  }

  public openCreateModal(): void {
    const ref = this.dialog.open(EducationFormModalComponent, { width: '550px' });
    ref.afterClosed().subscribe((res: Partial<Education>) => {
      if (res) {
        this.educationService.createEducation(res).subscribe({
          next: () => {
            this.toastService.success('Record Created', 'Education entry added.');
            this.loadEducation();
          }
        });
      }
    });
  }

  public openEditModal(edu: Education): void {
    const ref = this.dialog.open(EducationFormModalComponent, { width: '550px', data: edu });
    ref.afterClosed().subscribe((res: Partial<Education>) => {
      if (res) {
        this.educationService.updateEducation(edu.id, res).subscribe({
          next: () => {
            this.toastService.success('Updated', `${edu.institution} record updated.`);
            this.loadEducation();
          }
        });
      }
    });
  }

  public deleteEducation(edu: Education): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Record', message: `Remove ${edu.degree} from ${edu.institution}?`, isDanger: true }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.educationService.deleteEducation(edu.id).subscribe({
          next: () => {
            this.toastService.success('Deleted', 'Education entry deleted.');
            this.loadEducation();
          }
        });
      }
    });
  }
}
