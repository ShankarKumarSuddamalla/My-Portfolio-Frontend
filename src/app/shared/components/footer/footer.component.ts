import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="public-footer">
      <div class="footer-container">
        <div class="footer-brand-col">
          <div class="brand">
            <span class="gradient-text">Shankar Kumar Suddamalla</span>
          </div>
          <p class="summary">
            Backend Java Developer & Full-Stack Engineer. Specialized in Java, Spring Boot, Microservices Architecture, Kafka, Apache Ignite, PostgreSQL, and Angular.
          </p>
          <div class="social-links">
            <a href="https://github.com/shankarkumar-s" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com/in/shankar-kumar-suddamalla" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://twitter.com/shankarkumars" target="_blank" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="mailto:suddamallashankarkumar@gmail.com" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>

        <div class="footer-links-col">
          <h4>Architecture</h4>
          <ul>
            <li><a href="#skills">Technical Taxonomy</a></li>
            <li><a href="#experience">Career Timeline</a></li>
            <li><a href="#projects">Personal Projects</a></li>
            <li><a href="#ideas">Innovation Roadmap</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4>Enterprise CMS</h4>
          <ul>
            <li><a href="/auth/login">Admin Console</a></li>
            <li><a href="#resume">Download Resume</a></li>
            <li><a href="#contact">Hire Inquiry</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-container">
          <p>© 2026 Shankar Kumar Suddamalla. Built with Angular 21, Angular Material, RxJS & Enterprise SCSS.</p>
          <button (click)="scrollToTop()" class="back-to-top">
            <span>Back to Top</span>
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .public-footer {
      background: var(--bg-surface);
      border-top: 1px solid var(--border-color);
      padding-top: 60px;
      margin-top: 80px;
    }
    .footer-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px 40px 24px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 40px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
    .footer-brand-col {
      .brand {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 12px;
      }
      .summary {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.6;
        max-width: 440px;
        margin-bottom: 20px;
      }
    }
    .social-links {
      display: flex;
      gap: 12px;
      a {
        width: 38px;
        height: 38px;
        border-radius: var(--border-radius-full);
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-main);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: all 0.2s;
        &:hover {
          background: var(--primary-color);
          color: #ffffff;
          transform: translateY(-3px);
        }
      }
    }
    .footer-links-col {
      h4 {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text-main);
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      a {
        font-size: 0.88rem;
        color: var(--text-secondary);
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding: 20px 24px;
    }
    .footer-bottom-container {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.82rem;
      color: var(--text-muted);
    }
    .back-to-top {
      background: transparent;
      border: none;
      color: var(--primary-color);
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      &:hover {
        color: var(--accent-color);
      }
    }
  `]
})
export class FooterComponent {
  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
