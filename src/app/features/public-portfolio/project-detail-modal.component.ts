import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="project-modal glass-card">
      <!-- Modal Header -->
      <div class="modal-header">
        <div>
          <span class="badge badge-primary">{{ project.status }}</span>
          <h2 class="modal-title">{{ project.name }}</h2>
          <p class="modal-subtitle">{{ project.subtitle }}</p>
        </div>
        <button (click)="close()" class="close-btn" aria-label="Close dialog">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body">
        <!-- Banner Image -->
        <div class="banner-box">
          <img [src]="project.bannerUrl" [alt]="project.name" />
        </div>

        <!-- Problem & Solution Grid -->
        <div class="info-grid">
          <div class="info-card glass-panel">
            <h4 class="text-rose"><i class="fa-solid fa-circle-exclamation"></i> Problem Statement</h4>
            <p>{{ project.problemStatement }}</p>
          </div>

          <div class="info-card glass-panel">
            <h4 class="text-emerald"><i class="fa-solid fa-circle-check"></i> Architectural Solution</h4>
            <p>{{ project.solution }}</p>
          </div>
        </div>

        <!-- Architecture Diagram Preview -->
        @if (project.architectureDiagramUrl) {
          <div class="architecture-box">
            <h4><i class="fa-solid fa-diagram-project text-indigo"></i> System Architecture Topology</h4>
            <img [src]="project.architectureDiagramUrl" alt="Architecture Diagram" class="architecture-img" />
          </div>
        }

        <!-- Technology Stack Taxonomy -->
        <div class="tech-stack-section">
          <h4>Technology Breakdown</h4>
          <div class="stack-grid">
            <div class="stack-col">
              <span class="col-label">Languages</span>
              <div class="badge-list">
                @for (lang of project.programmingLanguages; track lang) {
                  <span class="tech-badge">{{ lang }}</span>
                }
              </div>
            </div>

            <div class="stack-col">
              <span class="col-label">Frameworks</span>
              <div class="badge-list">
                @for (fw of project.frameworks; track fw) {
                  <span class="tech-badge">{{ fw }}</span>
                }
              </div>
            </div>

            <div class="stack-col">
              <span class="col-label">Infrastructure & Tools</span>
              <div class="badge-list">
                @for (tool of project.tools; track tool) {
                  <span class="tech-badge">{{ tool }}</span>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Key Features Checklist -->
        <div class="features-section">
          <h4>Core Features & Capabilities</h4>
          <ul class="feature-list">
            @for (feature of project.features; track feature) {
              <li><i class="fa-solid fa-circle-check text-emerald"></i> {{ feature }}</li>
            }
          </ul>
        </div>

        <!-- Challenges & Learnings -->
        <div class="learnings-grid">
          <div class="learn-box">
            <h5>Technical Challenges</h5>
            <ul>
              @for (ch of project.challenges; track ch) {
                <li><i class="fa-solid fa-bolt text-amber"></i> {{ ch }}</li>
              }
            </ul>
          </div>

          <div class="learn-box">
            <h5>Key Architectural Learnings</h5>
            <ul>
              @for (l of project.learnings; track l) {
                <li><i class="fa-solid fa-lightbulb text-cyan"></i> {{ l }}</li>
              }
            </ul>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <a [href]="project.githubRepoUrl" target="_blank" class="btn-secondary btn-sm">
          <i class="fa-brands fa-github"></i>
          <span>Source Code</span>
        </a>
        <a [href]="project.liveDemoUrl" target="_blank" class="btn-primary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Launch Live Demo</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .project-modal {
      padding: 30px;
      max-height: 85vh;
      overflow-y: auto;
      background: var(--bg-surface);
      color: var(--text-main);
      border-radius: var(--border-radius-lg);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    .modal-title { font-size: 1.6rem; font-weight: 800; margin: 6px 0 2px 0; }
    .modal-subtitle { font-size: 0.95rem; color: var(--primary-color); font-weight: 700; }
    .close-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-main); width: 36px; height: 36px; border-radius: var(--border-radius-full); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
    .banner-box { height: 240px; border-radius: var(--border-radius-md); overflow: hidden; margin-bottom: 24px; img { width: 100%; height: 100%; object-fit: cover; } }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .info-card { padding: 18px; border-radius: var(--border-radius-md); h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; } p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0; } }
    .architecture-box { margin-bottom: 24px; h4 { font-size: 1rem; font-weight: 700; margin-bottom: 12px; } .architecture-img { width: 100%; max-height: 300px; object-fit: cover; border-radius: var(--border-radius-md); border: 1px solid var(--border-color); } }
    .tech-stack-section { margin-bottom: 24px; h4 { font-size: 1rem; font-weight: 700; margin-bottom: 12px; } }
    .stack-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .col-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px; }
    .badge-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech-badge { background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; }
    .features-section { margin-bottom: 24px; h4 { font-size: 1rem; font-weight: 700; margin-bottom: 10px; } }
    .feature-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; li { font-size: 0.9rem; color: var(--text-secondary); display: flex; align-items: center; gap: 10px; } }
    .learnings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .learn-box { h5 { font-size: 0.9rem; font-weight: 700; margin-bottom: 8px; } ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; li { font-size: 0.85rem; color: var(--text-secondary); display: flex; gap: 8px; } } }
    .modal-footer { display: flex; align-items: center; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--border-color); padding-top: 18px; }
    .text-emerald { color: #10b981; }
    .text-rose { color: #f43f5e; }
    .text-indigo { color: #6366f1; }
    .text-amber { color: #f59e0b; }
    .text-cyan { color: #38bdf8; }
  `]
})
export class ProjectDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project
  ) {}

  public close(): void {
    this.dialogRef.close();
  }
}
