import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';
import { UserProfile } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="crud-page">
      <div class="page-header">
        <div>
          <h2>Profile & Curriculum Vitae Management</h2>
          <p>Update personal bio, avatar URL, social media channels, and resume document links</p>
        </div>
      </div>

      <div class="profile-card glass-card">
        <form [formGroup]="profileForm" (ngSubmit)="onSave()" class="profile-form">
          <div class="form-row">
            <div class="custom-form-field">
              <label for="fullName">Full Name</label>
              <input id="fullName" type="text" formControlName="fullName" />
            </div>
            <div class="custom-form-field">
              <label for="title">Title / Designation</label>
              <input id="title" type="text" formControlName="title" />
            </div>
          </div>

          <div class="custom-form-field">
            <label for="headline">Headline</label>
            <input id="headline" type="text" formControlName="headline" />
          </div>

          <div class="custom-form-field">
            <label for="summary">Professional Summary</label>
            <textarea id="summary" rows="4" formControlName="summary"></textarea>
          </div>

          <div class="form-row">
            <div class="custom-form-field">
              <label for="avatarUrl">Avatar Image URL</label>
              <input id="avatarUrl" type="text" formControlName="avatarUrl" />
            </div>
            <div class="custom-form-field">
              <label for="resumeUrl">Resume PDF URL</label>
              <input id="resumeUrl" type="text" formControlName="resumeUrl" />
            </div>
          </div>

          <div class="form-row">
            <div class="custom-form-field">
              <label for="email">Public Contact Email</label>
              <input id="email" type="email" formControlName="email" />
            </div>
            <div class="custom-form-field">
              <label for="location">Location</label>
              <input id="location" type="text" formControlName="location" />
            </div>
          </div>

          <div class="form-row">
            <div class="custom-form-field">
              <label for="githubUrl">GitHub Profile URL</label>
              <input id="githubUrl" type="text" formControlName="githubUrl" />
            </div>
            <div class="custom-form-field">
              <label for="linkedinUrl">LinkedIn Profile URL</label>
              <input id="linkedinUrl" type="text" formControlName="linkedinUrl" />
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" [disabled]="profileForm.invalid || isSaving">
              @if (isSaving) {
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                <span>Saving Profile...</span>
              } @else {
                <i class="fa-solid fa-floppy-disk"></i>
                <span>Save Profile Changes</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .crud-page { display: flex; flex-direction: column; gap: 24px; }
    .page-header { h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; } p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; } }
    .profile-card { padding: 32px; max-width: 800px; }
    .profile-form { display: flex; flex-direction: column; gap: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; @media (max-width: 600px) { grid-template-columns: 1fr; } }
    .form-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
  `]
})
export class ProfileComponent implements OnInit {
  public profileService = inject(ProfileService);
  public toastService = inject(ToastService);
  public fb = inject(FormBuilder);
  public isSaving = false;

  public profileForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    title: ['', Validators.required],
    headline: ['', Validators.required],
    summary: ['', Validators.required],
    avatarUrl: ['', Validators.required],
    resumeUrl: ['', Validators.required],
    location: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    githubUrl: ['', Validators.required],
    linkedinUrl: ['', Validators.required]
  });

  public ngOnInit(): void {
    this.profileService.getProfile().subscribe(p => {
      if (p) {
        this.profileForm.patchValue({
          ...p,
          email: p.socialLinks?.email,
          githubUrl: p.socialLinks?.githubUrl,
          linkedinUrl: p.socialLinks?.linkedinUrl
        });
      }
    });
  }

  public onSave(): void {
    if (this.profileForm.invalid) return;
    this.isSaving = true;

    const val = this.profileForm.value;
    const updatedProfile: Partial<UserProfile> = {
      fullName: val.fullName,
      title: val.title,
      headline: val.headline,
      summary: val.summary,
      avatarUrl: val.avatarUrl,
      resumeUrl: val.resumeUrl,
      location: val.location,
      socialLinks: {
        email: val.email,
        githubUrl: val.githubUrl,
        linkedinUrl: val.linkedinUrl,
        location: val.location
      }
    };

    this.profileService.updateProfile(updatedProfile).subscribe({
      next: () => {
        this.isSaving = false;
        this.toastService.success('Profile Saved', 'Personal profile and links updated.');
      },
      error: () => { this.isSaving = false; }
    });
  }
}
