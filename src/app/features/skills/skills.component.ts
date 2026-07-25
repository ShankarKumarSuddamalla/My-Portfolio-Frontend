import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SkillsService } from '../../core/services/skills.service';
import { ToastService } from '../../core/services/toast.service';
import { Skill } from '../../core/models/skill.model';
import { SkillFormModalComponent } from './skill-form-modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Technical Skills Taxonomy Management</h2>
          <p>Add, edit, or categorize core engineering skills and proficiency levels</p>
        </div>

        <button (click)="openCreateModal()" class="btn-primary">
          <i class="fa-solid fa-plus"></i>
          <span>Add Skill</span>
        </button>
      </div>

      <!-- Skills Table List -->
      <div class="table-container glass-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Category</th>
              <th>Proficiency</th>
              <th>Years Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (skill of skills(); track skill.id) {
              <tr>
                <td>
                  <div class="skill-cell">
                    <i [class]="skill.icon" class="skill-icon"></i>
                    <span class="skill-name">{{ skill.name }}</span>
                  </div>
                </td>
                <td><span class="badge badge-primary">{{ skill.category }}</span></td>
                <td>
                  <div class="prof-bar-wrapper">
                    <div class="prof-track"><div class="prof-fill" [style.width]="skill.proficiency + '%'"></div></div>
                    <span class="prof-val">{{ skill.proficiency }}%</span>
                  </div>
                </td>
                <td>{{ skill.yearsOfExperience }} Yrs</td>
                <td>
                  <div class="action-btns">
                    <button (click)="openEditModal(skill)" class="icon-btn edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button (click)="deleteSkill(skill)" class="icon-btn delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .table-container { padding: 8px; overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; th, td { padding: 14px 18px; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; } th { font-weight: 700; color: var(--text-muted); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; } }
    .skill-cell { display: flex; align-items: center; gap: 12px; font-weight: 700; .skill-icon { font-size: 1.2rem; color: var(--primary-color); } }
    .prof-bar-wrapper { display: flex; align-items: center; gap: 10px; width: 160px; .prof-track { flex: 1; height: 6px; background: rgba(255, 255, 255, 0.08); border-radius: 3px; overflow: hidden; .prof-fill { height: 100%; background: var(--primary-color); } } .prof-val { font-size: 0.8rem; font-weight: 700; } }
    .action-btns { display: flex; gap: 8px; }
    .icon-btn { background: transparent; border: none; font-size: 1rem; cursor: pointer; padding: 6px; border-radius: 4px; &.edit { color: var(--accent-color); } &.delete { color: #f43f5e; } &:hover { background: rgba(255, 255, 255, 0.08); } }
  `]
})
export class SkillsComponent implements OnInit {
  public skillsService = inject(SkillsService);
  public toastService = inject(ToastService);
  public dialog = inject(MatDialog);

  public skills = signal<Skill[]>([]);

  public ngOnInit(): void {
    this.loadSkills();
  }

  public loadSkills(): void {
    this.skillsService.getSkills().subscribe(list => this.skills.set(list));
  }

  public openCreateModal(): void {
    const ref = this.dialog.open(SkillFormModalComponent, { width: '540px' });
    ref.afterClosed().subscribe((res: Partial<Skill>) => {
      if (res) {
        this.skillsService.createSkill(res).subscribe({
          next: () => {
            this.toastService.success('Skill Added', 'New skill entry created.');
            this.loadSkills();
          }
        });
      }
    });
  }

  public openEditModal(skill: Skill): void {
    const ref = this.dialog.open(SkillFormModalComponent, { width: '540px', data: skill });
    ref.afterClosed().subscribe((res: Partial<Skill>) => {
      if (res) {
        this.skillsService.updateSkill(skill.id, res).subscribe({
          next: () => {
            this.toastService.success('Skill Updated', `${skill.name} updated.`);
            this.loadSkills();
          }
        });
      }
    });
  }

  public deleteSkill(skill: Skill): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Skill',
        message: `Delete "${skill.name}" from your skills list?`,
        isDanger: true
      }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.skillsService.deleteSkill(skill.id).subscribe({
          next: () => {
            this.toastService.success('Skill Deleted', `${skill.name} removed.`);
            this.loadSkills();
          }
        });
      }
    });
  }
}
