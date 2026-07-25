import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Experience } from '../../core/models/experience.model';

@Component({
  selector: 'app-experience-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="form-modal glass-card">
      <div class="modal-header">
        <h3>{{ isEditMode ? 'Edit Experience Entry' : 'Add Work Experience' }}</h3>
        <button (click)="close()" class="close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <form [formGroup]="expForm" (ngSubmit)="onSubmit()" class="modal-form">
        <div class="form-row">
          <div class="custom-form-field">
            <label for="company">Company Name</label>
            <input id="company" type="text" formControlName="company" placeholder="Stripe Enterprise" />
          </div>
          <div class="custom-form-field">
            <label for="role">Role Title</label>
            <input id="role" type="text" formControlName="role" placeholder="Principal Software Architect" />
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="location">Location</label>
            <input id="location" type="text" formControlName="location" placeholder="San Francisco, CA" />
          </div>
          <div class="custom-form-field">
            <label for="startDate">Start Date</label>
            <input id="startDate" type="date" formControlName="startDate" />
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="endDate">End Date (Leave empty if current)</label>
            <input id="endDate" type="date" formControlName="endDate" />
          </div>
          <div class="custom-form-field checkbox-field">
            <label class="checkbox-container">
              <input type="checkbox" formControlName="isCurrent" />
              <span>Current Role</span>
            </label>
          </div>
        </div>

        <div class="custom-form-field">
          <label for="respInput">Responsibilities (Comma Separated)</label>
          <textarea id="respInput" rows="3" formControlName="respInput" placeholder="Led microservice architecture, Mentored 35+ engineers"></textarea>
        </div>

        <div class="custom-form-field">
          <label for="techInput">Technologies Used (Comma Separated)</label>
          <input id="techInput" type="text" formControlName="techInput" placeholder="Angular, RxJS, Spring Boot, Kafka" />
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" (click)="close()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="expForm.invalid">
            <i class="fa-solid fa-floppy-disk"></i>
            <span>{{ isEditMode ? 'Save Changes' : 'Create Entry' }}</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-modal { padding: 28px; max-width: 650px; border-radius: var(--border-radius-lg); background: var(--bg-surface); color: var(--text-main); }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; h3 { font-size: 1.3rem; font-weight: 800; margin: 0; } }
    .close-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); width: 34px; height: 34px; border-radius: var(--border-radius-full); cursor: pointer; }
    .modal-form { display: flex; flex-direction: column; gap: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .checkbox-field { justify-content: flex-end; padding-top: 24px; }
    .checkbox-container { display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
  `]
})
export class ExperienceFormModalComponent implements OnInit {
  public fb = inject(FormBuilder);
  public isEditMode = false;

  public expForm: FormGroup = this.fb.group({
    company: ['', Validators.required],
    role: ['', Validators.required],
    location: ['San Francisco, CA', Validators.required],
    startDate: ['2023-01-01', Validators.required],
    endDate: [''],
    isCurrent: [false],
    respInput: ['Led system architecture, Mentored engineering teams'],
    techInput: ['Angular, Spring Boot, Kafka, AWS']
  });

  constructor(
    public dialogRef: MatDialogRef<ExperienceFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public expData: Experience | null
  ) {}

  public ngOnInit(): void {
    if (this.expData) {
      this.isEditMode = true;
      this.expForm.patchValue({
        ...this.expData,
        respInput: this.expData.responsibilities?.join(', ') || '',
        techInput: this.expData.technologyUsed?.join(', ') || ''
      });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.expForm.invalid) return;
    const val = this.expForm.value;
    const responsibilities = val.respInput ? val.respInput.split(',').map((r: string) => r.trim()) : [];
    const technologyUsed = val.techInput ? val.techInput.split(',').map((t: string) => t.trim()) : [];

    this.dialogRef.close({
      ...val,
      responsibilities,
      technologyUsed,
      achievements: ['Decreased p99 latency by 75%'],
      displayOrder: 1
    });
  }
}
