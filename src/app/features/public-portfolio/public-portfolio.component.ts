import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectsService } from '../../core/services/projects.service';
import { SkillsService } from '../../core/services/skills.service';
import { ExperienceService } from '../../core/services/experience.service';
import { EducationService } from '../../core/services/education.service';
import { IdeasService } from '../../core/services/ideas.service';
import { ProfileService } from '../../core/services/profile.service';
import { ContactService } from '../../core/services/contact.service';
import { ToastService } from '../../core/services/toast.service';
import { Project } from '../../core/models/project.model';
import { Skill, SkillCategory } from '../../core/models/skill.model';
import { Experience } from '../../core/models/experience.model';
import { Education } from '../../core/models/education.model';
import { FutureProject, ProjectIdea } from '../../core/models/idea.model';
import { UserProfile } from '../../core/models/profile.model';
import { ProjectDetailModalComponent } from './project-detail-modal.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-public-portfolio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="portfolio-page">
      <!-- HERO SECTION -->
      <section id="hero" class="hero-section">
        <div class="hero-bg-glow"></div>
        <div class="container hero-container">
          <div class="hero-text-col">
            <div class="availability-badge badge badge-emerald">
              <span class="pulse-dot"></span>
              <span>Available for Full-Stack & Backend Java Engineering Roles</span>
            </div>
            
            <h1 class="hero-title">
              Hi, I'm <span class="gradient-text">{{ profile()?.fullName || 'Shankar Kumar Suddamalla' }}</span>
            </h1>

            <div class="typing-container">
              <span class="static-prefix">I am a </span>
              <span class="typing-text gradient-text">{{ currentTypedRole() }}</span>
              <span class="cursor">|</span>
            </div>

            <p class="hero-summary">
              {{ profile()?.headline || 'Architecting resilient, high-throughput microservices, non-blocking telemetry meshes, and enterprise Angular frontend applications.' }}
            </p>

            <div class="hero-actions">
              <a href="#contact" class="btn-primary">
                <i class="fa-solid fa-paper-plane"></i>
                <span>Hire Me / Consult</span>
              </a>

              <button (click)="downloadResume()" class="btn-secondary">
                <i class="fa-solid fa-file-pdf"></i>
                <span>Download Resume</span>
              </button>

              <a href="#projects" class="btn-outline-primary">
                <i class="fa-solid fa-eye"></i>
                <span>Explore Projects</span>
              </a>
            </div>

            <!-- Metric Counter Pills -->
            <div class="hero-metrics">
              <div class="metric-card glass-card">
                <span class="metric-value">0-2</span>
                <span class="metric-label">Years Experience</span>
              </div>
              <!--<div class="metric-card glass-card">
                <span class="metric-value">42+</span>
                <span class="metric-label">Enterprise Apps</span>
              </div>
              <div class="metric-card glass-card">
                <span class="metric-value">500k</span>
                <span class="metric-label">Req/Sec Scale</span>
              </div>-->
            </div>
          </div>

          <div class="hero-avatar-col">
            <div class="avatar-glass-frame">
              <img [src]="profile()?.avatarUrl || '/assets/profile.png'" alt="Alex Mercer" class="hero-avatar-img" />
              <div class="floating-tech-badge badge-1 glass-card">
                <i class="fa-solid fa-leaf text-emerald"></i>
                <span>Spring Boot</span>
              </div>
              <div class="floating-tech-badge badge-2 glass-card">
                <i class="fa-brands fa-java text-amber"></i>
                <span>Java 21</span>
              </div>
              <div class="floating-tech-badge badge-3 glass-card">
                <i class="fa-solid fa-network-wired text-cyan"></i>
                <span>Kafka Events</span>
              </div>
              <div class="floating-tech-badge badge-4 glass-card">
                <i class="fa-solid fa-database text-purple"></i>
                <span>PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT ME SECTION -->
      <section id="about" class="section-container">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-primary">About Me</span>
            <h2 class="section-title">Professional Summary</h2>
            <p class="section-desc">Enterprise Backend Java Developer & Full-Stack Engineer Profile</p>
          </div>

          <!-- Highlight Summary Card -->
          <div class="about-summary-box glass-card mb-5">
            <div class="summary-header">
              <div class="card-icon"><i class="fa-solid fa-user-gear"></i></div>
              <div>
                <h3>Executive Summary</h3>
                <span class="company-tag">TCS Full-Stack Engineer • Backend Java Specialist</span>
              </div>
            </div>
            <p class="summary-text">
              {{ profile()?.summary || 'Backend Java Developer with strong experience in developing and supporting enterprise-scale applications using Java, Spring Boot, and Microservices architecture. Hands-on experience in designing RESTful APIs, implementing Kafka-based asynchronous communication, processing XML/JSON messages, and developing robust backend services for high-volume transaction processing. Skilled in Spring Data JPA, SQL, Git, Maven and production support, with a solid understanding of distributed systems, event-driven architecture, and software design principles.' }}
            </p>
          </div>

          <div class="about-grid">
            <div class="about-card glass-card">
              <div class="card-icon"><i class="fa-solid fa-cubes"></i></div>
              <h3>Microservices & Distributed Systems</h3>
              <p>Designing RESTful APIs and asynchronous microservices communication with Apache Kafka and Apache Ignite distributed caching for high-volume transaction processing.</p>
            </div>

            <div class="about-card glass-card">
              <div class="card-icon"><i class="fa-solid fa-layer-group"></i></div>
              <h3>Full-Stack & Reactive UI</h3>
              <p>Integrating Spring Boot backend microservices with Angular frontend applications, state management, reactive forms, and OpenAPI/Swagger documentation.</p>
            </div>

            <div class="about-card glass-card">
              <div class="card-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <h3>Enterprise Security & Support</h3>
              <p>Implementing Spring Security, RBAC permissions, XML/JSON data transformations, root cause analysis, log debugging, and production support.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- TECHNICAL SKILLS SECTION -->
      <section id="skills" class="section-container bg-surface-subtle">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-accent">Core Competencies</span>
            <h2 class="section-title">Categorized Technical Taxonomy</h2>
            <p class="section-desc">Interactive filterable skill matrix across software engineering domains</p>
          </div>

          <!-- Category Filters -->
          <div class="category-filters">
            @for (cat of skillCategories; track cat) {
              <button 
                (click)="selectedCategory.set(cat)" 
                class="filter-btn" 
                [class.active]="selectedCategory() === cat"
              >
                {{ cat }}
              </button>
            }
          </div>

          <!-- Skills Grid -->
          <div class="skills-grid">
            @for (skill of filteredSkills(); track skill.id) {
              <div class="skill-card glass-card">
                <div class="skill-top">
                  <div class="skill-icon"><i [class]="skill.icon"></i></div>
                  <div class="skill-info">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-exp">{{ skill.yearsOfExperience }} Years Exp</span>
                  </div>
                  <span class="skill-percent">{{ skill.proficiency }}%</span>
                </div>
                <div class="progress-track">
                  <div class="progress-bar" [style.width]="skill.proficiency + '%'"></div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- WORK EXPERIENCE SECTION -->
      <section id="experience" class="section-container">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-primary">Career History</span>
            <h2 class="section-title">Work Experience Timeline</h2>
          </div>

          <div class="timeline-container">
            @for (exp of experiences(); track exp.id) {
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content glass-card">
                  <div class="exp-header">
                    <div>
                      <h3 class="role">{{ exp.role }}</h3>
                      <span class="company"><i class="fa-solid fa-building"></i> {{ exp.company }} — {{ exp.location }}</span>
                    </div>
                    <span class="duration badge badge-accent">{{ formatExpDate(exp.startDate) }} - {{ exp.isCurrent || exp.endDate === 'Present' ? 'Present' : formatExpDate(exp.endDate) }}</span>
                  </div>

                  <ul class="resp-list">
                    @for (resp of exp.responsibilities; track resp) {
                      <li><i class="fa-solid fa-check text-emerald"></i> {{ resp }}</li>
                    }
                  </ul>

                  <div class="tech-tags">
                    @for (tech of exp.technologyUsed; track tech) {
                      <span class="tech-badge">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- EDUCATION SECTION -->
      <section id="education" class="section-container bg-surface-subtle">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-emerald">Academic Background</span>
            <h2 class="section-title">Education & Degrees</h2>
          </div>

          <div class="education-grid">
            @for (edu of educations(); track edu.id) {
              <div class="education-card glass-card">
                <div class="edu-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                <div class="edu-details">
                  <span class="degree">{{ edu.degree }}</span>
                  <span class="institution">{{ edu.institution }} • {{ edu.fieldOfStudy }}</span>
                  <div class="edu-meta">
                    <span class="cgpa-badge badge badge-amber">CGPA: {{ edu.cgpa }}</span>
                    <span class="timeframe">{{ formatExpDate(edu.startDate) }} - {{ formatExpDate(edu.endDate) }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- PROJECTS SHOWCASE SECTION -->
      <section id="projects" class="section-container">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-primary">Featured Systems</span>
            <h2 class="section-title">Architectural Engineering Portfolio</h2>
            <p class="section-desc">Deep-dive into enterprise system architecture, problem statements, and solutions</p>
          </div>

          <div class="projects-grid">
            @for (project of projects(); track project.id) {
              <div class="project-card glass-card">
                <div class="project-banner">
                  <img [src]="project.bannerUrl" [alt]="project.name" />
                  <span class="status-badge badge" [ngClass]="project.status === 'COMPLETED' ? 'badge-emerald' : 'badge-amber'">
                    {{ project.status }}
                  </span>
                </div>

                <div class="project-content">
                  <h3 class="project-name">{{ project.name }}</h3>
                  <p class="project-subtitle">{{ project.subtitle }}</p>
                  <p class="project-desc">{{ project.description }}</p>

                  <div class="project-tags">
                    @for (tag of project.tags; track tag) {
                      <span class="tech-badge">{{ tag }}</span>
                    }
                  </div>

                  <div class="project-footer">
                    <button (click)="openProjectDetails(project)" class="btn-primary btn-sm">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>Architecture Details</span>
                    </button>

                    <div class="project-links">
                      <a [href]="project.githubRepoUrl" target="_blank" title="GitHub Repository"><i class="fa-brands fa-github"></i></a>
                      <a [href]="project.liveDemoUrl" target="_blank" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- FUTURE PROJECTS & ROADMAP IDEAS -->
      <section id="ideas" class="section-container bg-surface-subtle">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-accent">Innovation Engine</span>
            <h2 class="section-title">Future Projects & Ideas Roadmap</h2>
          </div>

          <div class="roadmap-grid">
            @for (fp of futureProjects(); track fp.id) {
              <div class="roadmap-card glass-card">
                <div class="roadmap-header">
                  <span class="priority-badge badge" [ngClass]="fp.priority === 'HIGH' ? 'badge-rose' : 'badge-amber'">{{ fp.priority }} PRIORITY</span>
                  <span class="quarter">{{ fp.targetCompletionQuarter }}</span>
                </div>
                <h3>{{ fp.title }}</h3>
                <p>{{ fp.description }}</p>

                <div class="progress-box">
                  <div class="progress-text">
                    <span>Build Progress</span>
                    <span>{{ fp.currentProgress }}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-bar" [style.width]="fp.currentProgress + '%'"></div>
                  </div>
                </div>

                <div class="stack-list">
                  @for (st of fp.expectedStack; track st) {
                    <span class="tech-badge">{{ st }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- RESUME HUB SECTION -->
      <section id="resume" class="section-container">
        <div class="container">
          <div class="resume-hub-card glass-card">
            <div class="resume-text">
              <span class="badge badge-emerald">PDF Document Preview</span>
              <h2>Shankar Kumar Suddamalla Resume</h2>
              <p>Download comprehensive PDF detailing full-stack Java, Spring Boot, Microservices, and TCS engineering experience.</p>
            </div>
            <button (click)="downloadResume()" class="btn-primary btn-lg">
              <i class="fa-solid fa-file-arrow-down"></i>
              <span>Download Curriculum Vitae (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="section-container bg-surface-subtle">
        <div class="container">
          <div class="section-header">
            <span class="badge badge-primary">Get In Touch</span>
            <h2 class="section-title">Professional Hire & Advisory Contact</h2>
          </div>

          <div class="contact-grid">
            <!-- Contact Details Card -->
            <div class="contact-info-card glass-card">
              <h3>Direct Contact Channels</h3>
              <p>Open for Principal Software Architecture roles, consulting engagements, and technical advisory.</p>

              <div class="info-item">
                <div class="info-icon"><i class="fa-solid fa-envelope"></i></div>
                <div>
                  <span class="info-label">Email Address</span>
                  <a [href]="'mailto:' + profile()?.socialLinks?.email" class="info-value">{{ profile()?.socialLinks?.email }}</a>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon"><i class="fa-solid fa-location-dot"></i></div>
                <div>
                  <span class="info-label">Location</span>
                  <span class="info-value">{{ profile()?.socialLinks?.location }}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon"><i class="fa-brands fa-linkedin"></i></div>
                <div>
                  <span class="info-label">LinkedIn Profile</span>
                  <a [href]="profile()?.socialLinks?.linkedinUrl" target="_blank" class="info-value">linkedin.com/in/alexmercer-arch</a>
                </div>
              </div>

              <!-- Map Simulation Visualizer -->
              <div class="map-card glass-panel">
                <i class="fa-solid fa-map-location-dot map-icon"></i>
                <span>San Francisco Bay Area, CA & Global Remote</span>
              </div>
            </div>

            <!-- Contact Form -->
            <form [formGroup]="contactForm" (ngSubmit)="sendContactMessage()" class="contact-form glass-card">
              <h3>Send Inquiry Message</h3>

              <div class="custom-form-field">
                <label for="contactName">Your Name</label>
                <input id="contactName" type="text" formControlName="name" placeholder="Sarah Jenkins" />
              </div>

              <div class="custom-form-field">
                <label for="contactEmail">Your Email</label>
                <input id="contactEmail" type="email" formControlName="email" placeholder="sjenkins@enterprise.com" />
              </div>

              <div class="custom-form-field">
                <label for="contactSubject">Subject</label>
                <input id="contactSubject" type="text" formControlName="subject" placeholder="Architect Opportunity / Technical Advisory" />
              </div>

              <div class="custom-form-field">
                <label for="contactMessage">Message</label>
                <textarea id="contactMessage" rows="5" formControlName="message" placeholder="Describe project or career opportunity details..."></textarea>
              </div>

              <button type="submit" class="btn-primary auth-btn" [disabled]="contactForm.invalid || isSendingMessage">
                @if (isSendingMessage) {
                  <i class="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Sending Message...</span>
                } @else {
                  <i class="fa-solid fa-paper-plane"></i>
                  <span>Send Direct Message</span>
                }
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .portfolio-page { position: relative; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .section-container { padding: 90px 0; }
    .bg-surface-subtle { background: rgba(255, 255, 255, 0.015); border-y: 1px solid var(--border-color); }
    .section-header { text-align: center; margin-bottom: 50px; .section-title { font-size: 2.2rem; font-weight: 800; margin: 12px 0 6px; } .section-desc { color: var(--text-secondary); font-size: 1rem; } }
    
    // HERO
    .hero-section { position: relative; padding: 120px 0 80px 0; overflow: hidden; }
    .hero-bg-glow { position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 500px; background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%); filter: blur(60px); z-index: 0; pointer-events: none; }
    .hero-container { position: relative; z-index: 1; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; @media (max-width: 900px) { grid-template-columns: 1fr; } }
    .hero-title { font-size: 3.2rem; font-weight: 800; line-height: 1.1; margin: 16px 0; letter-spacing: -0.03em; }
    .typing-container { font-size: 1.5rem; font-weight: 700; font-family: var(--font-code); margin-bottom: 20px; min-height: 36px; display: flex; align-items: center; }
    .cursor { animation: blink 1s infinite; margin-left: 2px; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    .hero-summary { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; max-width: 600px; margin-bottom: 30px; }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 40px; }
    .hero-metrics { display: flex; gap: 16px; flex-wrap: wrap; }
    .metric-card { padding: 14px 20px; display: flex; flex-direction: column; .metric-value { font-size: 1.4rem; font-weight: 800; color: var(--primary-color); } .metric-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; } }
    
    .hero-avatar-col { display: flex; justify-content: center; }
    .avatar-glass-frame { position: relative; width: 340px; height: 340px; border-radius: var(--border-radius-lg); padding: 10px; background: var(--gradient-glass); border: 1px solid var(--glass-border); box-shadow: var(--glass-shadow); }
    .hero-avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: var(--border-radius-md); }
    .floating-tech-badge { position: absolute; padding: 8px 14px; border-radius: var(--border-radius-full); display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.82rem; &.badge-1 { top: -15px; right: -20px; } &.badge-2 { top: 30px; left: -30px; } &.badge-3 { bottom: 20px; right: -25px; } &.badge-4 { bottom: -15px; left: 10px; } }
    
    // ABOUT
    .mb-5 { margin-bottom: 32px; }
    .about-summary-box {
      padding: 32px;
      border-left: 6px solid var(--primary-color);
      border-radius: var(--border-radius-md);
      .summary-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius-md);
          background: rgba(99, 102, 241, 0.15);
          color: var(--primary-color);
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        h3 { font-size: 1.3rem; font-weight: 800; margin: 0; }
        .company-tag { font-size: 0.82rem; font-weight: 700; color: var(--accent-color); }
      }
      .summary-text {
        font-size: 1.05rem;
        color: var(--text-main);
        line-height: 1.7;
        margin: 0;
        letter-spacing: 0.01em;
      }
    }
    .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .about-card { padding: 30px; .card-icon { width: 48px; height: 48px; border-radius: var(--border-radius-md); background: rgba(99, 102, 241, 0.15); color: var(--primary-color); font-size: 1.4rem; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; } h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; } p { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; } }

    // SKILLS
    .category-filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 40px; }
    .filter-btn { background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-secondary); padding: 8px 18px; border-radius: var(--border-radius-full); font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; &.active, &:hover { background: var(--primary-color); color: #ffffff; border-color: var(--primary-color); } }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .skill-card { padding: 18px; }
    .skill-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; .skill-icon { font-size: 1.4rem; color: var(--primary-color); width: 28px; } .skill-info { flex: 1; display: flex; flex-direction: column; .skill-name { font-weight: 700; font-size: 0.95rem; } .skill-exp { font-size: 0.75rem; color: var(--text-muted); } } .skill-percent { font-weight: 800; font-size: 0.9rem; color: var(--primary-color); } }
    .progress-track { height: 6px; background: rgba(255, 255, 255, 0.08); border-radius: 3px; overflow: hidden; }
    .progress-bar { height: 100%; background: var(--gradient-hero); border-radius: 3px; }

    // TIMELINE
    .timeline-container { position: relative; max-width: 900px; margin: 0 auto; border-left: 2px solid var(--border-color); padding-left: 30px; }
    .timeline-item { position: relative; margin-bottom: 30px; }
    .timeline-dot { position: absolute; left: -37px; top: 20px; width: 12px; height: 12px; border-radius: 50%; background: var(--primary-color); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3); }
    .timeline-content { padding: 24px; }
    .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; .role { font-size: 1.2rem; font-weight: 800; margin: 0; } .company { font-size: 0.88rem; color: var(--text-secondary); font-weight: 600; display: block; margin-top: 2px; } }
    .resp-list { list-style: none; padding: 0; margin-bottom: 16px; li { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 8px; display: flex; gap: 8px; } }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech-badge { background: rgba(255, 255, 255, 0.06); border: 1px solid var(--border-color); padding: 3px 10px; border-radius: 4px; font-size: 0.78rem; font-weight: 600; color: var(--text-secondary); }

    // EDUCATION
    .education-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; }
    .education-card { padding: 24px; display: flex; gap: 18px; align-items: flex-start; .edu-icon { width: 44px; height: 44px; border-radius: var(--border-radius-md); background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; } .degree { font-size: 1.1rem; font-weight: 800; display: block; } .institution { font-size: 0.88rem; color: var(--text-secondary); display: block; margin: 4px 0 10px 0; } .edu-meta { display: flex; align-items: center; gap: 12px; font-size: 0.8rem; } }

    // PROJECTS
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px; }
    .project-card { display: flex; flex-direction: column; overflow: hidden; }
    .project-banner { position: relative; height: 200px; width: 100%; img { width: 100%; height: 100%; object-fit: cover; } .status-badge { position: absolute; top: 12px; right: 12px; } }
    .project-content { padding: 22px; flex: 1; display: flex; flex-direction: column; }
    .project-name { font-size: 1.25rem; font-weight: 800; margin-bottom: 4px; }
    .project-subtitle { font-size: 0.82rem; font-weight: 700; color: var(--primary-color); margin-bottom: 10px; }
    .project-desc { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; flex: 1; }
    .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
    .project-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 14px; }
    .project-links { display: flex; gap: 12px; a { color: var(--text-secondary); font-size: 1.1rem; &:hover { color: var(--primary-color); } } }

    // ROADMAP
    .roadmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }
    .roadmap-card { padding: 24px; .roadmap-header { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); } h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 8px; } p { font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px; } }
    .progress-box { margin-bottom: 16px; .progress-text { display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; margin-bottom: 4px; } }
    .stack-list { display: flex; flex-wrap: wrap; gap: 6px; }

    // RESUME HUB
    .resume-hub-card { padding: 40px; display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap; border-left: 6px solid var(--emerald-rgb); }

    // CONTACT
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; @media (max-width: 800px) { grid-template-columns: 1fr; } }
    .contact-info-card { padding: 32px; h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 8px; } p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 24px; } }
    .info-item { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; .info-icon { width: 40px; height: 40px; border-radius: var(--border-radius-sm); background: rgba(99, 102, 241, 0.15); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; } .info-label { font-size: 0.75rem; color: var(--text-muted); display: block; } .info-value { font-weight: 700; font-size: 0.92rem; color: var(--text-main); } }
    .map-card { padding: 20px; border-radius: var(--border-radius-md); display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 0.9rem; margin-top: 24px; .map-icon { color: #f43f5e; font-size: 1.3rem; } }
    .contact-form { padding: 32px; h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 20px; } }
    .text-emerald { color: #10b981; }
    .text-rose { color: #f43f5e; }
    .text-amber { color: #f59e0b; }
    .text-cyan { color: #38bdf8; }
    .text-purple { color: #a855f7; }
  `]
})
export class PublicPortfolioComponent implements OnInit, OnDestroy {
  public projectsService = inject(ProjectsService);
  public skillsService = inject(SkillsService);
  public experienceService = inject(ExperienceService);
  public educationService = inject(EducationService);
  public ideasService = inject(IdeasService);
  public profileService = inject(ProfileService);
  public contactService = inject(ContactService);
  public toastService = inject(ToastService);
  public dialog = inject(MatDialog);
  public fb = inject(FormBuilder);

  public profile = signal<UserProfile | null>(null);
  public projects = signal<Project[]>([]);
  public skills = signal<Skill[]>([]);
  public experiences = signal<Experience[]>([]);
  public educations = signal<Education[]>([]);
  public futureProjects = signal<FutureProject[]>([]);

  public selectedCategory = signal<string>('All');
  public skillCategories = ['All', 'Languages', 'Frameworks', 'Databases', 'Messaging', 'Caching', 'Cloud', 'DevOps', 'Testing', 'Tools'];

  // Typing Effect Roles
  public roles = ['Full Stack Engineer', 'Backend Developer', 'Spring Boot Developer', 'Angular Developer'];
  public currentTypedRole = signal<string>('');
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  public isSendingMessage = false;

  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  public ngOnInit(): void {
    this.loadAllData();
    this.startTypingEffect();
  }

  public ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private loadAllData(): void {
    this.profileService.getProfile().subscribe(p => this.profile.set(p));
    this.projectsService.getProjects().subscribe(list => this.projects.set(list));
    this.skillsService.getSkills().subscribe(list => this.skills.set(list));
    this.experienceService.getExperiences().subscribe(list => this.experiences.set(list));
    this.educationService.getEducation().subscribe(list => this.educations.set(list));
    this.ideasService.getFutureProjects().subscribe(list => this.futureProjects.set(list));
  }

  public formatExpDate(dateStr: string | undefined): string {
    if (!dateStr || dateStr === 'Present') return 'Present';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  public filteredSkills(): Skill[] {
    const cat = this.selectedCategory();
    const list = this.skills();
    if (cat === 'All') return list;
    return list.filter(s => s.category === cat);
  }

  private startTypingEffect(): void {
    const currentRole = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.currentTypedRole.set(currentRole.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentTypedRole.set(currentRole.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let speed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      speed = 2200; // Pause at full word
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 400;
    }

    this.timer = setTimeout(() => this.startTypingEffect(), speed);
  }

  public openProjectDetails(project: Project): void {
    this.dialog.open(ProjectDetailModalComponent, {
      data: project,
      maxWidth: '850px',
      width: '95vw',
      panelClass: 'custom-dialog-container'
    });
  }

  public downloadResume(): void {
    this.toastService.success('Resume Download', 'Downloading Shankar Kumar Suddamalla - Backend Java Developer CV (PDF)...');
  }

  public sendContactMessage(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSendingMessage = true;
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSendingMessage = false;
        this.toastService.success('Message Dispatched', res.message || 'Thank you for reaching out! I will respond promptly.');
        this.contactForm.reset();
      },
      error: () => {
        this.isSendingMessage = false;
      }
    });
  }
}
