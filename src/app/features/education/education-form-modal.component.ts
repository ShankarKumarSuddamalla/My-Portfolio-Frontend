import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Education } from '../../core/models/education.model';

@Component({
  selector: 'app-education-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="form-modal glass-card">
      <div class="modal-header">
        <h3>{{ isEditMode ? 'Edit Education Entry' : 'Add Education Record' }}</h3>
        <button (click)="close()" class="close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <form [formGroup]="eduForm" (ngSubmit)="onSubmit()" class="modal-form">
        <div class="custom-form-field">
          <label for="institution">Institution / University</label>
          <input id="institution" type="text" formControlName="institution" placeholder="Stanford University" />
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="degree">Degree Title</label>
            <input id="degree" type="text" formControlName="degree" placeholder="Master of Science (M.S.)" />
          </div>
          <div class="custom-form-field">
            <label for="fieldOfStudy">Field of Study</label>
            <input id="fieldOfStudy" type="text" formControlName="fieldOfStudy" placeholder="Computer Science" />
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="cgpa">CGPA / Grade</label>
            <input id="cgpa" type="text" formControlName="cgpa" placeholder="3.94 / 4.00" />
          </div>
          <div class="custom-form-field">
            <label for="startDate">Start Date</label>
            <input id="startDate" type="date" formControlName="startDate" />
          </div>
        </div>

        <div class="custom-form-field">
          <label for="endDate">End Date / Graduation</label>
          <input id="endDate" type="date" formControlName="endDate" />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" (click)="close()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="eduForm.invalid">
            <i class="fa-solid fa-floppy-disk"></i>
            <span>{{ isEditMode ? 'Save Changes' : 'Create Record' }}</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-modal { padding: 28px; max-width: 550px; border-radius: var(--border-radius-lg); background: var(--bg-surface); color: var(--text-main); }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; h3 { font-size: 1.2rem; font-weight: 800; margin: 0; } }
    .close-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); width: 34px; height: 34px; border-radius: var(--border-radius-full); cursor: pointer; }
    .modal-form { display: flex; flex-direction: column; gap: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
  `]
})
export class EducationFormModalComponent implements OnInit {
  public fb = inject(FormBuilder);
  public isEditMode = false;

  public eduForm: FormGroup = this.fb.group({
    institution: ['', Validators.required],
    degree: ['', Validators.required],
    fieldOfStudy: ['', Validators.required],
    cgpa: ['3.90 / 4.00', Validators.required],
    startDate: ['2015-09-01', Validators.required],
    endDate: ['2017-05-31', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<EducationFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public eduData: Education | null
  ) {}

  public ngOnInit(): void {
    if (this.eduData) {
      this.isEditMode = true;
      this.eduForm.patchValue(this.eduData);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.eduForm.invalid) return;
    this.dialogRef.close({ ...this.eduForm.value, displayOrder: 1 });
  }
}
