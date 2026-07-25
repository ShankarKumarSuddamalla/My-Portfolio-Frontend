import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="form-modal glass-card">
      <div class="modal-header">
        <h3>{{ isEditMode ? 'Edit Project Entry' : 'Create New System Project' }}</h3>
        <button (click)="close()" class="close-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="modal-form">
        <div class="form-row">
          <div class="custom-form-field">
            <label for="name">Project Name</label>
            <input id="name" type="text" formControlName="name" placeholder="NexusFlow Enterprise Mesh" />
          </div>
          <div class="custom-form-field">
            <label for="subtitle">Subtitle / Tagline</label>
            <input id="subtitle" type="text" formControlName="subtitle" placeholder="Event Streaming Platform" />
          </div>
        </div>

        <div class="custom-form-field">
          <label for="description">Short Overview Description</label>
          <textarea id="description" rows="2" formControlName="description" placeholder="Enterprise-grade streaming telemetry framework..."></textarea>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="problemStatement">Problem Statement</label>
            <textarea id="problemStatement" rows="3" formControlName="problemStatement" placeholder="Monolithic traffic bottlenecks during bursts..."></textarea>
          </div>
          <div class="custom-form-field">
            <label for="solution">Architectural Solution</label>
            <textarea id="solution" rows="3" formControlName="solution" placeholder="Engineered Kafka & Reactive Angular pipeline..."></textarea>
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="bannerUrl">Banner Image URL</label>
            <input id="bannerUrl" type="text" formControlName="bannerUrl" placeholder="https://images.unsplash.com/..." />
          </div>
          <div class="custom-form-field">
            <label for="architectureDiagramUrl">Architecture Diagram URL</label>
            <input id="architectureDiagramUrl" type="text" formControlName="architectureDiagramUrl" placeholder="https://images.unsplash.com/..." />
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="githubRepoUrl">GitHub Repository Link</label>
            <input id="githubRepoUrl" type="text" formControlName="githubRepoUrl" placeholder="https://github.com/..." />
          </div>
          <div class="custom-form-field">
            <label for="liveDemoUrl">Live Demo URL</label>
            <input id="liveDemoUrl" type="text" formControlName="liveDemoUrl" placeholder="https://demo.enterprise.io" />
          </div>
        </div>

        <div class="form-row">
          <div class="custom-form-field">
            <label for="status">Project Lifecycle Status</label>
            <select id="status" formControlName="status">
              <option value="COMPLETED">COMPLETED</option>
              <option value="IN_DEVELOPMENT">IN_DEVELOPMENT</option>
              <option value="ARCHIVED">ARCHIVED</option>
              <option value="PLANNED">PLANNED</option>
            </select>
          </div>
          <div class="custom-form-field">
            <label for="tagsInput">Tags (Comma Separated)</label>
            <input id="tagsInput" type="text" formControlName="tagsInput" placeholder="Architecture, Kafka, Angular, Spring Boot" />
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" (click)="close()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="projectForm.invalid">
            <i class="fa-solid fa-floppy-disk"></i>
            <span>{{ isEditMode ? 'Save Changes' : 'Create Project' }}</span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-modal { padding: 30px; max-height: 85vh; overflow-y: auto; max-width: 750px; border-radius: var(--border-radius-lg); background: var(--bg-surface); color: var(--text-main); }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; h3 { font-size: 1.3rem; font-weight: 800; margin: 0; } }
    .close-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); width: 34px; height: 34px; border-radius: var(--border-radius-full); cursor: pointer; }
    .modal-form { display: flex; flex-direction: column; gap: 14px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; @media (max-width: 600px) { grid-template-columns: 1fr; } }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px; }
  `]
})
export class ProjectFormModalComponent implements OnInit {
  public fb = inject(FormBuilder);
  public isEditMode = false;

  public projectForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    subtitle: ['', Validators.required],
    description: ['', Validators.required],
    problemStatement: ['', Validators.required],
    solution: ['', Validators.required],
    bannerUrl: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop', Validators.required],
    architectureDiagramUrl: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop'],
    githubRepoUrl: ['https://github.com/alexmercer-dev/project-repo', Validators.required],
    liveDemoUrl: ['https://demo.enterprise.io', Validators.required],
    status: ['COMPLETED', Validators.required],
    tagsInput: ['Angular, Spring Boot, Architecture']
  });

  constructor(
    public dialogRef: MatDialogRef<ProjectFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public projectData: Project | null
  ) {}

  public ngOnInit(): void {
    if (this.projectData) {
      this.isEditMode = true;
      this.projectForm.patchValue({
        ...this.projectData,
        tagsInput: this.projectData.tags?.join(', ') || ''
      });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.projectForm.invalid) return;

    const val = this.projectForm.value;
    const tags = val.tagsInput ? val.tagsInput.split(',').map((t: string) => t.trim()) : [];
    
    const result: Partial<Project> = {
      ...val,
      tags,
      programmingLanguages: ['TypeScript', 'Java', 'SQL'],
      frameworks: ['Angular 21', 'Spring Boot 3.3'],
      tools: ['Kafka', 'Docker', 'Redis'],
      features: ['Real-time Streaming', 'JWT RBAC Security'],
      screenshots: [val.bannerUrl],
      challenges: ['High throughput tuning'],
      learnings: ['Angular Signals integration']
    };

    this.dialogRef.close(result);
  }
}
