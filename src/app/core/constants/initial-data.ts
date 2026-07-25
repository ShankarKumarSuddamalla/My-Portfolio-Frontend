import { Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Experience } from '../models/experience.model';
import { Education } from '../models/education.model';
import { FutureProject, ProjectIdea } from '../models/idea.model';
import { UserProfile } from '../models/profile.model';
import { ContactMessage } from '../models/contact.model';

export const INITIAL_PROFILE: UserProfile = {
  fullName: 'Shankar Kumar Suddamalla',
  title: 'Full-Stack Engineer & Backend Java Specialist',
  headline: 'Specialized in Java, Spring Boot, Microservices, Kafka, Apache Ignite & Angular Enterprise Solutions.',
  summary: 'Backend Java Developer & Full-Stack Engineer with strong experience in developing and supporting enterprise-scale applications using Java, Spring Boot, and Microservices architecture. Hands-on experience in designing RESTful APIs, implementing Kafka-based asynchronous communication, processing XML/JSON messages, and developing robust backend services for high-volume transaction processing.',
  yearsOfExperience: 2,
  completedProjectsCount: 15,
  avatarUrl: '/assets/profile.png',
  resumeUrl: '/assets/resume.pdf',
  location: 'India (Open to Remote / Relocation)',
  availableForHire: true,
  socialLinks: {
    githubUrl: 'https://github.com/shankarkumar-s',
    linkedinUrl: 'https://linkedin.com/in/shankar-kumar-suddamalla',
    twitterUrl: 'https://twitter.com/shankarkumars',
    email: 'suddamallashankarkumar@gmail.com',
    location: 'India'
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Enterprise-Grade Distributed Load Balancer',
    subtitle: 'Layer 7 Intelligent Traffic Router & Health Failover Engine',
    description: 'A Layer 7 Intelligent Load Balancer using Java and Spring Boot to distribute client requests efficiently across multiple backend services with active health monitoring and automatic failover.',
    problemStatement: 'High-volume microservice clusters required intelligent Layer 7 request routing with dynamic health checks, weighted algorithms, and sub-millisecond failover to prevent service degradation.',
    solution: 'Engineered a scalable request routing engine with Round Robin, Least Connections, Weighted Round Robin, and IP Hash algorithms alongside Docker, Kubernetes, Prometheus, and Grafana monitoring.',
    architectureDiagramUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
    programmingLanguages: ['Java 21', 'SQL', 'Shell'],
    frameworks: ['Spring Boot 3', 'Spring Cloud', 'Spring Security'],
    tools: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Maven'],
    features: [
      'Layer 7 intelligent client request routing with dynamic backend registration',
      'Configurable load-balancing algorithms (Round Robin, Least Connections, Weighted, IP Hash)',
      'Active health monitoring and automatic failover mechanisms for unhealthy nodes',
      'Integrated Prometheus & Grafana telemetry dashboards for latency and throughput visualization'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
    ],
    githubRepoUrl: 'https://github.com/shankarkumar-s/distributed-load-balancer',
    liveDemoUrl: 'https://shankarkumars.dev',
    challenges: [
      'Designing lock-free concurrent request routing algorithms for high-throughput traffic spikes',
      'Minimizing health-check probing overhead while guaranteeing fast failover detection'
    ],
    learnings: [
      'Implementing custom Netty/Spring non-blocking socket routing channels',
      'Configuring Prometheus metrics scrape pipelines for real-time node latency'
    ],
    futureEnhancements: [
      'Adding eBPF kernel-level packet inspection for Layer 4 load balancing'
    ],
    status: 'COMPLETED',
    tags: ['Java', 'Spring Boot', 'Microservices', 'Load Balancer', 'Kubernetes'],
    isFeatured: true,
    viewsCount: 1850,
    orderIndex: 1,
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-07-15T14:30:00Z'
  },
  {
    id: 'proj-2',
    name: 'Enterprise E-Commerce Microservices Platform',
    subtitle: 'Event-Driven Microservices Architecture with Kafka & Redis Caching',
    description: 'An enterprise-grade e-commerce platform using Java, Spring Boot, and Microservices Architecture, featuring asynchronous Kafka order processing and Redis distributed caching.',
    problemStatement: 'Legacy monolithic e-commerce engines suffered database contention and order failure cascades during flash sales with high concurrent checkout demands.',
    solution: 'Built decoupled RESTful microservices for product catalog, inventory, cart, order management, payment processing, and notification workflows using Apache Kafka and Redis.',
    architectureDiagramUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    programmingLanguages: ['Java 21', 'SQL', 'TypeScript'],
    frameworks: ['Spring Boot', 'Spring Cloud API Gateway', 'Spring Data JPA', 'Angular'],
    tools: ['Apache Kafka', 'Redis', 'Docker', 'Kubernetes', 'PostgreSQL'],
    features: [
      'Decoupled microservices following domain-driven service boundaries',
      'Asynchronous event-driven order processing via Apache Kafka message topics',
      'Redis distributed caching layer to optimize DB queries and reduce API response time',
      'Containerized with Docker and orchestrated via Kubernetes with API Gateway & Service Discovery'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
    ],
    githubRepoUrl: 'https://github.com/shankarkumar-s/ecommerce-microservices',
    liveDemoUrl: 'https://shankarkumars.dev',
    challenges: [
      'Ensuring transactional eventual consistency across distributed order and payment microservices',
      'Kafka consumer group partition rebalancing under peak order loads'
    ],
    learnings: [
      'Saga Pattern implementation for distributed microservice transaction rollback',
      'Redis Cache-Aside and Write-Through caching strategies'
    ],
    futureEnhancements: [
      'Integrating ElasticSearch for real-time full-text product catalog search'
    ],
    status: 'COMPLETED',
    tags: ['Microservices', 'Spring Boot', 'Kafka', 'Redis', 'Docker'],
    isFeatured: true,
    viewsCount: 1420,
    orderIndex: 2,
    createdAt: '2025-04-10T08:00:00Z',
    updatedAt: '2025-06-20T12:00:00Z'
  },
  {
    id: 'proj-3',
    name: 'Inventory Management System',
    subtitle: 'Full-Stack Inventory & Stock Tracking Platform with Angular & Spring Boot',
    description: 'Full-stack Inventory Management System using Java, Spring Boot, Angular, and MySQL to automate inventory tracking, product management, and stock operations with RBAC.',
    problemStatement: 'Manual stock tracking resulted in inventory discrepancies, inaccurate supplier order logs, and unauthorized stock adjustment risks.',
    solution: 'Developed secure RESTful APIs with Spring Boot and Angular frontend, featuring RBAC permissions, Swagger documentation, and automated stock deduction workflows.',
    architectureDiagramUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
    programmingLanguages: ['Java', 'JavaScript', 'TypeScript', 'SQL'],
    frameworks: ['Spring Boot', 'Spring Security', 'Angular', 'Spring Data JPA'],
    tools: ['MySQL', 'Swagger / OpenAPI', 'Postman', 'Maven', 'Git'],
    features: [
      'Automated inventory tracking, product categorization, and supplier order management',
      'Role-based access control (RBAC) securing administrator and user operations',
      'Real-time stock addition and deduction workflows with audit trail logging',
      'Swagger / OpenAPI integration for interactive API testing and documentation'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
    ],
    githubRepoUrl: 'https://github.com/shankarkumar-s/inventory-management-system',
    liveDemoUrl: 'https://shankarkumars.dev',
    challenges: [
      'Implementing concurrent stock adjustment locking to prevent race conditions during checkout'
    ],
    learnings: [
      'Angular reactive form validation paired with Spring Boot custom exception handling',
      'Spring Security JWT claim filters for RBAC route protection'
    ],
    futureEnhancements: [
      'Adding barcode scanning support via mobile camera streams'
    ],
    status: 'COMPLETED',
    tags: ['Full Stack', 'Java', 'Spring Boot', 'Angular', 'MySQL'],
    isFeatured: true,
    viewsCount: 1100,
    orderIndex: 3,
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2025-05-10T16:00:00Z'
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { id: 's-1', name: 'Java & Spring Boot', category: 'Languages', icon: 'fa-brands fa-java', proficiency: 95, yearsOfExperience: 3, displayOrder: 1, isFeatured: true },
  { id: 's-2', name: 'Spring Framework & Spring Cloud', category: 'Frameworks', icon: 'fa-solid fa-cubes', proficiency: 92, yearsOfExperience: 3, displayOrder: 2, isFeatured: true },
  { id: 's-3', name: 'Microservices & RESTful APIs', category: 'Frameworks', icon: 'fa-solid fa-network-wired', proficiency: 94, yearsOfExperience: 3, displayOrder: 3, isFeatured: true },
  { id: 's-4', name: 'Apache Kafka', category: 'Messaging', icon: 'fa-solid fa-envelope-open-text', proficiency: 90, yearsOfExperience: 2, displayOrder: 4, isFeatured: true },
  { id: 's-5', name: 'Apache Ignite & Redis', category: 'Caching', icon: 'fa-solid fa-memory', proficiency: 88, yearsOfExperience: 2, displayOrder: 5, isFeatured: true },
  { id: 's-6', name: 'PostgreSQL & MySQL', category: 'Databases', icon: 'fa-solid fa-database', proficiency: 90, yearsOfExperience: 3, displayOrder: 6, isFeatured: true },
  { id: 's-7', name: 'JavaScript & Python', category: 'Languages', icon: 'fa-brands fa-js', proficiency: 85, yearsOfExperience: 3, displayOrder: 7, isFeatured: false },
  { id: 's-8', name: 'Spring Data JPA & Security', category: 'Frameworks', icon: 'fa-solid fa-shield-halved', proficiency: 93, yearsOfExperience: 3, displayOrder: 8, isFeatured: true },
  { id: 's-9', name: 'AWS Cloud Architecture', category: 'Cloud', icon: 'fa-brands fa-aws', proficiency: 84, yearsOfExperience: 2, displayOrder: 9, isFeatured: true },
  { id: 's-10', name: 'Docker & Kubernetes', category: 'DevOps', icon: 'fa-brands fa-docker', proficiency: 86, yearsOfExperience: 2, displayOrder: 10, isFeatured: true },
  { id: 's-11', name: 'Git & GitHub', category: 'Tools', icon: 'fa-brands fa-github', proficiency: 95, yearsOfExperience: 4, displayOrder: 11, isFeatured: false },
  { id: 's-12', name: 'Maven, Gradle & Postman', category: 'Tools', icon: 'fa-solid fa-screwdriver-wrench', proficiency: 92, yearsOfExperience: 4, displayOrder: 12, isFeatured: false },
  { id: 's-13', name: 'JMeter & Performance Tuning', category: 'Testing', icon: 'fa-solid fa-vial', proficiency: 85, yearsOfExperience: 2, displayOrder: 13, isFeatured: false }
];

export const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    company: 'Tata Consultancy Services',
    location: 'India',
    role: 'Full-Stack Engineer',
    startDate: '2025-05-01',
    endDate: 'Present',
    isCurrent: true,
    responsibilities: [
      'Developed and enhanced enterprise-grade backend services using Java, Spring Boot, and Microservices to support secure, high-volume payment processing workflows.',
      'Implemented RESTful APIs, business validations, XML message processing, and data transformations to ensure accurate and reliable transaction execution across distributed systems.',
      'Integrated Apache Kafka for asynchronous event-driven communication, enabling efficient message exchange and improving system scalability and reliability.',
      'Utilized Apache Ignite distributed caching to improve application performance, reduce database access, and support low-latency transaction processing.',
      'Resolved production issues through debugging, log analysis, root cause analysis, and performance optimization.'
    ],
    achievements: [
      'Optimized payment processing response time using Apache Ignite distributed caching.',
      'Streamlined asynchronous event delivery across microservices using Kafka topics.'
    ],
    technologyUsed: ['Java', 'Spring Boot', 'Spring Framework', 'Microservices', 'REST APIs', 'Apache Kafka', 'Apache Ignite', 'PostgreSQL', 'Gradle', 'Postman', 'Spring Cloud', 'Spring Data JPA'],
    displayOrder: 1
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: 'edu-1',
    institution: 'Sastra Deemed University',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science Engineering',
    cgpa: '7.77 / 10.0',
    startDate: '2020-08-01',
    endDate: '2024-05-31',
    achievements: ['Specialized in Computer Science & Distributed Software Systems'],
    displayOrder: 1
  },
  {
    id: 'edu-2',
    institution: 'Narayana Junior College',
    degree: 'Intermediate Education (MPC)',
    fieldOfStudy: 'Mathematics, Physics, Chemistry',
    cgpa: '977 / 1000 Marks',
    startDate: '2018-06-01',
    endDate: '2020-05-31',
    achievements: ['Merit Distinction in MPC Stream'],
    displayOrder: 2
  },
  {
    id: 'edu-3',
    institution: 'Balaji High School',
    degree: 'Secondary Education (SSC)',
    fieldOfStudy: 'General Secondary Curriculum',
    cgpa: '10.0 / 10.0 CGPA',
    startDate: '2016-06-01',
    endDate: '2018-04-30',
    achievements: ['Perfect 10.0 CGPA Score'],
    displayOrder: 3
  }
];

export const INITIAL_FUTURE_PROJECTS: FutureProject[] = [
  {
    id: 'fp-1',
    title: 'Reactive Event Telemetry Sentinel',
    description: 'Real-time Spring WebFlux & Kafka stream monitoring agent for zero-loss message processing telemetry.',
    roadmap: [
      'Phase 1: Kafka consumer group metrics exporter',
      'Phase 2: Spring WebFlux SSE reactive stream feed',
      'Phase 3: Angular dashboard visualizer'
    ],
    expectedStack: ['Java 21', 'Spring WebFlux', 'Kafka', 'Angular', 'Docker'],
    priority: 'HIGH',
    currentProgress: 70,
    targetCompletionQuarter: 'Q4 2026'
  }
];

export const INITIAL_IDEAS: ProjectIdea[] = [
  {
    id: 'idea-1',
    ideaName: 'Zero-Copy Payment Gateway Bridge',
    description: 'High-speed payment message translator handling ISO20022 XML to JSON transformations with sub-millisecond overhead.',
    realWorldImpact: 'Accelerates banking payment throughput for enterprise transaction processing systems.',
    possibleTechStack: ['Java 21', 'Spring Boot', 'Apache Ignite', 'Kafka'],
    futureScope: 'Global banking API standardization',
    difficulty: 'Hard'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Recruiting Manager',
    email: 'recruiting@tech-enterprise.io',
    subject: 'Senior Backend Java Role Opportunity',
    message: 'Hi Shankar, we reviewed your work on Microservices, Kafka, and Distributed Load Balancers. We would love to discuss backend engineering opportunities with you.',
    createdAt: '2026-07-22T10:00:00Z',
    isRead: false
  }
];
