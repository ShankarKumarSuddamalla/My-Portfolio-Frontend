import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Skill, SkillCategory } from '../../core/models/skill.model';

@Component({
  selector: 'app-skill-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="form-modal glass-card">
      <div class="modal-header">
        <h3>{{ isEditMode ? 'Edit Skill Entry' : 'Add Technical Skill' }}</h3>
        <button (click)="close()" class="close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <form [formGroup]="skillForm" (ngSubmit)="onSubmit()" class="modal-form">
        <div class="custom-form-field">
          <label for="name">Skill Name</label>
          <input id="name" type="text" formControlName="name" placeholder="Angular 21 / RxJS" />
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="category">Category</label>
            <select id="category" formControlName="category">
              <option value="Languages">Languages</option>
              <option value="Frameworks">Frameworks</option>
              <option value="Databases">Databases</option>
              <option value="Messaging">Messaging</option>
              <option value="Caching">Caching</option>
              <option value="Cloud">Cloud</option>
              <option value="DevOps">DevOps</option>
              <option value="Testing">Testing</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          <div class="custom-form-field">
            <label for="icon">Font Awesome Icon Class</label>
            <input id="icon" type="text" formControlName="icon" placeholder="fa-fab fa-angular" />
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="proficiency">Proficiency Percentage (0 - 100)</label>
            <input id="proficiency" type="number" formControlName="proficiency" min="1" max="100" />
          </div>

          <div class="custom-form-field">
            <label for="yearsOfExperience">Years of Hands-on Experience</label>
            <input id="yearsOfExperience" type="number" formControlName="yearsOfExperience" min="1" max="30" />
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" (click)="close()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="skillForm.invalid">
            <i class="fa-solid fa-floppy-disk"></i>
            <span>{{ isEditMode ? 'Save Changes' : 'Create Skill' }}</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-modal { padding: 28px; max-width: 540px; border-radius: var(--border-radius-lg); background: var(--bg-surface); color: var(--text-main); }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; h3 { font-size: 1.2rem; font-weight: 800; margin: 0; } }
    .close-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); width: 34px; height: 34px; border-radius: var(--border-radius-full); cursor: pointer; }
    .modal-form { display: flex; flex-direction: column; gap: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
  `]
})
export class SkillFormModalComponent implements OnInit {
  public fb = inject(FormBuilder);
  public isEditMode = false;

  public skillForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['Frameworks', Validators.required],
    icon: ['fa-solid fa-code', Validators.required],
    proficiency: [90, [Validators.required, Validators.min(1), Validators.max(100)]],
    yearsOfExperience: [5, [Validators.required, Validators.min(1)]]
  });

  constructor(
    public dialogRef: MatDialogRef<SkillFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public skillData: Skill | null
  ) {}

  public ngOnInit(): void {
    if (this.skillData) {
      this.isEditMode = true;
      this.skillForm.patchValue(this.skillData);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.skillForm.invalid) return;
    this.dialogRef.close({ ...this.skillForm.value, displayOrder: 1, isFeatured: true });
  }
}
