import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdeasService } from '../../core/services/ideas.service';
import { ToastService } from '../../core/services/toast.service';
import { FutureProject, ProjectIdea } from '../../core/models/idea.model';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Roadmap, Future Projects & Ideas Management</h2>
          <p>Track technical R&D roadmap items, priority levels, and proposed concept ideas</p>
        </div>
      </div>

      <div class="roadmap-grid">
        <!-- Future Projects Section -->
        <div class="column-box glass-card">
          <div class="box-header">
            <h3><i class="fa-solid fa-rocket text-indigo"></i> Future Project Roadmap</h3>
          </div>

          <form [formGroup]="futureForm" (ngSubmit)="onAddFutureProject()" class="quick-form">
            <div class="custom-form-field">
              <label>Project Title</label>
              <input type="text" formControlName="title" placeholder="AetherAI Code Review Sentinel" />
            </div>

            <div class="custom-form-field">
              <label>Description</label>
              <textarea rows="2" formControlName="description" placeholder="AI-assisted static code analyzer..."></textarea>
            </div>

            <div class="form-row">
              <div class="custom-form-field">
                <label>Priority</label>
                <select formControlName="priority">
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
              <div class="custom-form-field">
                <label>Target Quarter</label>
                <input type="text" formControlName="targetCompletionQuarter" placeholder="Q4 2026" />
              </div>
            </div>

            <button type="submit" class="btn-primary btn-sm" [disabled]="futureForm.invalid">
              <i class="fa-solid fa-plus"></i>
              <span>Add to Roadmap</span>
            </button>
          </form>

          <div class="item-list">
            @for (fp of futureProjects(); track fp.id) {
              <div class="item-card glass-panel">
                <div class="card-top">
                  <span class="badge" [ngClass]="fp.priority === 'HIGH' ? 'badge-rose' : 'badge-amber'">{{ fp.priority }}</span>
                  <span class="target">{{ fp.targetCompletionQuarter }}</span>
                </div>
                <h4>{{ fp.title }}</h4>
                <p>{{ fp.description }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Project Ideas Section -->
        <div class="column-box glass-card">
          <div class="box-header">
            <h3><i class="fa-solid fa-lightbulb text-amber"></i> Architectural Concepts & Ideas</h3>
          </div>

          <form [formGroup]="ideaForm" (ngSubmit)="onAddIdea()" class="quick-form">
            <div class="custom-form-field">
              <label>Idea Name</label>
              <input type="text" formControlName="ideaName" placeholder="OmniStream WebRTC Bridge" />
            </div>

            <div class="custom-form-field">
              <label>Real World Impact</label>
              <textarea rows="2" formControlName="realWorldImpact" placeholder="Reduces video CDN bandwidth..."></textarea>
            </div>

            <button type="submit" class="btn-secondary btn-sm" [disabled]="ideaForm.invalid">
              <i class="fa-solid fa-plus"></i>
              <span>Save Idea Concept</span>
            </button>
          </form>

          <div class="item-list">
            @for (idea of ideas(); track idea.id) {
              <div class="item-card glass-panel">
                <div class="card-top">
                  <span class="badge badge-accent">{{ idea.difficulty || 'Intermediate' }}</span>
                </div>
                <h4>{{ idea.ideaName }}</h4>
                <p><strong>Impact:</strong> {{ idea.realWorldImpact }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .roadmap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; @media (max-width: 850px) { grid-template-columns: 1fr; } }
    .column-box { padding: 24px; }
    .box-header { margin-bottom: 16px; h3 { font-size: 1.2rem; font-weight: 800; display: flex; align-items: center; gap: 10px; margin: 0; } }
    .quick-form { padding: 16px; border-radius: var(--border-radius-md); background: var(--input-bg); margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .item-list { display: flex; flex-direction: column; gap: 12px; }
    .item-card { padding: 16px; border-radius: var(--border-radius-md); h4 { font-size: 1rem; font-weight: 800; margin: 6px 0; } p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin: 0; } }
    .card-top { display: flex; justify-content: space-between; align-items: center; .target { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); } }
    .text-indigo { color: #818cf8; }
    .text-amber { color: #f59e0b; }
  `]
})
export class IdeasComponent implements OnInit {
  public ideasService = inject(IdeasService);
  public toastService = inject(ToastService);
  public fb = inject(FormBuilder);

  public futureProjects = signal<FutureProject[]>([]);
  public ideas = signal<ProjectIdea[]>([]);

  public futureForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['HIGH', Validators.required],
    targetCompletionQuarter: ['Q4 2026', Validators.required]
  });

  public ideaForm: FormGroup = this.fb.group({
    ideaName: ['', Validators.required],
    realWorldImpact: ['', Validators.required]
  });

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.ideasService.getFutureProjects().subscribe(list => this.futureProjects.set(list));
    this.ideasService.getProjectIdeas().subscribe(list => this.ideas.set(list));
  }

  public onAddFutureProject(): void {
    if (this.futureForm.invalid) return;
    const val = this.futureForm.value;
    this.ideasService.createFutureProject({
      ...val,
      roadmap: ['Phase 1 Architecture', 'Phase 2 Prototype'],
      expectedStack: ['TypeScript', 'Angular', 'Docker'],
      currentProgress: 25
    }).subscribe({
      next: () => {
        this.toastService.success('Roadmap Updated', 'Future project added.');
        this.futureForm.reset({ priority: 'HIGH', targetCompletionQuarter: 'Q4 2026' });
        this.loadData();
      }
    });
  }

  public onAddIdea(): void {
    if (this.ideaForm.invalid) return;
    this.ideasService.createProjectIdea({
      ...this.ideaForm.value,
      description: this.ideaForm.value.realWorldImpact,
      possibleTechStack: ['Angular', 'Spring Boot'],
      futureScope: 'Global enterprise adoption',
      difficulty: 'Intermediate'
    }).subscribe({
      next: () => {
        this.toastService.success('Idea Recorded', 'New architectural concept recorded.');
        this.ideaForm.reset();
        this.loadData();
      }
    });
  }
}
