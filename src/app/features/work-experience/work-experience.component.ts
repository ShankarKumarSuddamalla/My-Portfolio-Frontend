import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExperienceService } from '../../core/services/experience.service';
import { ToastService } from '../../core/services/toast.service';
import { Experience } from '../../core/models/experience.model';
import { ExperienceFormModalComponent } from './experience-form-modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Work Experience Timeline Management</h2>
          <p>Manage corporate roles, achievements, responsibilities, and technology stacks</p>
        </div>

        <button (click)="openCreateModal()" class="btn-primary">
          <i class="fa-solid fa-plus"></i>
          <span>Add Experience</span>
        </button>
      </div>

      <div class="exp-list">
        @for (exp of experiences(); track exp.id) {
          <div class="exp-card glass-card">
            <div class="exp-top">
              <div>
                <h3 class="role">{{ exp.role }}</h3>
                <span class="company">{{ exp.company }} — {{ exp.location }}</span>
              </div>
              <div class="exp-right">
                <span class="duration badge badge-accent">{{ exp.startDate | date:'MMM yyyy' }} - {{ exp.isCurrent ? 'Present' : (exp.endDate | date:'MMM yyyy') }}</span>
                <div class="action-btns">
                  <button (click)="openEditModal(exp)" class="icon-btn edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button (click)="deleteExperience(exp)" class="icon-btn delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>

            <ul class="resp-list">
              @for (r of exp.responsibilities; track r) {
                <li><i class="fa-solid fa-check text-emerald"></i> {{ r }}</li>
              }
            </ul>

            <div class="tech-row">
              @for (t of exp.technologyUsed; track t) {
                <span class="tech-badge">{{ t }}</span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .exp-list { display: flex; flex-direction: column; gap: 20px; }
    .exp-card { padding: 24px; }
    .exp-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; .role { font-size: 1.2rem; font-weight: 800; margin: 0; } .company { font-size: 0.9rem; color: var(--text-secondary); font-weight: 600; display: block; margin-top: 2px; } }
    .exp-right { display: flex; align-items: center; gap: 14px; }
    .resp-list { list-style: none; padding: 0; margin-bottom: 16px; li { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 6px; display: flex; gap: 8px; } }
    .tech-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech-badge { background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); padding: 4px 10px; border-radius: 4px; font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); }
    .action-btns { display: flex; gap: 6px; }
    .icon-btn { background: transparent; border: none; font-size: 1rem; cursor: pointer; padding: 6px; border-radius: 4px; &.edit { color: var(--accent-color); } &.delete { color: #f43f5e; } }
    .text-emerald { color: #10b981; }
  `]
})
export class WorkExperienceComponent implements OnInit {
  public experienceService = inject(ExperienceService);
  public toastService = inject(ToastService);
  public dialog = inject(MatDialog);

  public experiences = signal<Experience[]>([]);

  public ngOnInit(): void {
    this.loadExperiences();
  }

  public loadExperiences(): void {
    this.experienceService.getExperiences().subscribe(list => this.experiences.set(list));
  }

  public openCreateModal(): void {
    const ref = this.dialog.open(ExperienceFormModalComponent, { width: '650px' });
    ref.afterClosed().subscribe((res: Partial<Experience>) => {
      if (res) {
        this.experienceService.createExperience(res).subscribe({
          next: () => {
            this.toastService.success('Experience Added', 'New role entry recorded.');
            this.loadExperiences();
          }
        });
      }
    });
  }

  public openEditModal(exp: Experience): void {
    const ref = this.dialog.open(ExperienceFormModalComponent, { width: '650px', data: exp });
    ref.afterClosed().subscribe((res: Partial<Experience>) => {
      if (res) {
        this.experienceService.updateExperience(exp.id, res).subscribe({
          next: () => {
            this.toastService.success('Experience Updated', `${exp.company} entry updated.`);
            this.loadExperiences();
          }
        });
      }
    });
  }

  public deleteExperience(exp: Experience): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Experience',
        message: `Delete ${exp.role} at ${exp.company}?`,
        isDanger: true
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.experienceService.deleteExperience(exp.id).subscribe({
          next: () => {
            this.toastService.success('Deleted', 'Experience entry removed.');
            this.loadExperiences();
          }
        });
      }
    });
  }
}
