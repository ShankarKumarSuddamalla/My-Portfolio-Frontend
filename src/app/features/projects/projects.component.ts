import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectsService } from '../../core/services/projects.service';
import { ToastService } from '../../core/services/toast.service';
import { Project } from '../../core/models/project.model';
import { ProjectFormModalComponent } from './project-form-modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SkeletonLoaderComponent],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Project System Entries Management</h2>
          <p>Full CRUD operations for enterprise architecture projects & showcase cards</p>
        </div>

        <button (click)="openCreateModal()" class="btn-primary">
          <i class="fa-solid fa-plus"></i>
          <span>Add New Project</span>
        </button>
      </div>

      <!-- Search & Filter Controls -->
      <div class="controls-bar glass-card">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search projects by name, tags, or technology..."
            (input)="onSearchInput($event)"
          />
        </div>
        <div class="count-badge">
          <span>Total: {{ filteredProjects().length }} Projects</span>
        </div>
      </div>

      <!-- Loading Placeholder -->
      @if (isLoading()) {
        <app-skeleton-loader type="card" [count]="3"></app-skeleton-loader>
      } @else {
        <!-- Projects Grid -->
        <div class="projects-table-grid">
          @for (proj of filteredProjects(); track proj.id) {
            <div class="project-crud-card glass-card">
              <div class="card-thumb">
                <img [src]="proj.bannerUrl" [alt]="proj.name" />
                <span class="status-badge badge" [ngClass]="proj.status === 'COMPLETED' ? 'badge-emerald' : 'badge-amber'">
                  {{ proj.status }}
                </span>
              </div>

              <div class="card-body">
                <h3 class="name">{{ proj.name }}</h3>
                <span class="subtitle">{{ proj.subtitle }}</span>
                <p class="desc">{{ proj.description }}</p>

                <div class="tags-row">
                  @for (tag of proj.tags; track tag) {
                    <span class="tech-badge">{{ tag }}</span>
                  }
                </div>

                <div class="card-actions">
                  <button (click)="openEditModal(proj)" class="btn-secondary btn-sm" title="Edit Project">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Edit</span>
                  </button>

                  <button (click)="deleteProject(proj)" class="btn-outline-danger btn-sm" title="Delete Project">
                    <i class="fa-solid fa-trash-can"></i>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .controls-bar { padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .search-box { display: flex; align-items: center; gap: 10px; flex: 1; max-width: 480px; background: var(--input-bg); border: 1px solid var(--border-color); padding: 8px 14px; border-radius: var(--border-radius-sm); i { color: var(--text-muted); } input { background: transparent; border: none; outline: none; color: var(--text-main); width: 100%; font-size: 0.9rem; } }
    .count-badge { font-size: 0.85rem; font-weight: 700; color: var(--primary-color); }
    .projects-table-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
    .project-crud-card { display: flex; flex-direction: column; overflow: hidden; }
    .card-thumb { position: relative; height: 180px; width: 100%; img { width: 100%; height: 100%; object-fit: cover; } .status-badge { position: absolute; top: 12px; right: 12px; } }
    .card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; .name { font-size: 1.2rem; font-weight: 800; margin-bottom: 2px; } .subtitle { font-size: 0.8rem; color: var(--primary-color); font-weight: 700; margin-bottom: 8px; } .desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px; flex: 1; } }
    .tags-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
    .card-actions { display: flex; align-items: center; gap: 10px; border-top: 1px solid var(--border-color); padding-top: 14px; }
    .btn-outline-danger { background: transparent; border: 1px solid #f43f5e; color: #f43f5e; padding: 6px 12px; border-radius: var(--border-radius-sm); cursor: pointer; font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; &:hover { background: rgba(244, 63, 94, 0.1); } }
  `]
})
export class ProjectsComponent implements OnInit {
  public projectsService = inject(ProjectsService);
  public toastService = inject(ToastService);
  public dialog = inject(MatDialog);

  public projects = signal<Project[]>([]);
  public searchQuery = signal<string>('');
  public isLoading = signal<boolean>(true);

  public ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.isLoading.set(true);
    this.projectsService.getProjects().subscribe({
      next: (list) => {
        this.projects.set(list);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  public filteredProjects(): Project[] {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.projects();
    return this.projects().filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  public onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  public openCreateModal(): void {
    const ref = this.dialog.open(ProjectFormModalComponent, { width: '750px' });
    ref.afterClosed().subscribe((res: Partial<Project>) => {
      if (res) {
        this.projectsService.createProject(res).subscribe({
          next: () => {
            this.toastService.success('Project Created', 'New project added successfully.');
            this.loadProjects();
          }
        });
      }
    });
  }

  public openEditModal(project: Project): void {
    const ref = this.dialog.open(ProjectFormModalComponent, { width: '750px', data: project });
    ref.afterClosed().subscribe((res: Partial<Project>) => {
      if (res) {
        this.projectsService.updateProject(project.id, res).subscribe({
          next: () => {
            this.toastService.success('Project Updated', `${project.name} has been updated.`);
            this.loadProjects();
          }
        });
      }
    });
  }

  public deleteProject(project: Project): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project Entry',
        message: `Are you sure you want to permanently delete "${project.name}"? This action cannot be undone.`,
        confirmText: 'Delete Entry',
        isDanger: true
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.projectsService.deleteProject(project.id).subscribe({
          next: () => {
            this.toastService.success('Deleted', `Project ${project.name} removed.`);
            this.loadProjects();
          }
        });
      }
    });
  }
}
