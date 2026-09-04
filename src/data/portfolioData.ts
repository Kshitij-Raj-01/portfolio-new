export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'fintech' | 'fullstack' | 'systems' | 'community';
  featured: boolean;
  isStartup?: boolean;
  tags: string[];
  keyFeatures: string[];
  architecture?: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companySubtitle?: string;
  period: string;
  location: string;
  current: boolean;
  type: 'Full-time' | 'Internship' | 'Freelance';
  highlights: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export const PERSONAL_INFO = {
  name: 'Kshitij Raj',
  title: 'Backend Developer & Web Security Engineer',
  tagline:
    'Building resilient backend systems, secure APIs, and scalable cloud infrastructure.',
  status:
    'Building Follope | Backend Developer & Web Security @ Robotic Sir AI | DRDO SAG Intern',
  email: 'rajkshitijsss06@gmail.com',
  phone: '+91 9117434145',
  location: 'Meerut / Remote, India',

  education: {
    institution: 'Shobhit Institute of Engineering & Technology',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: 'Aug 2023 – Jun 2027',
    location: 'Meerut, Uttar Pradesh',
    coursework: [
      'Data Structures & Algorithms',
      'Cryptography & Network Security',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Computer Architecture'
    ]
  },

  socialLinks: {
    github: 'https://github.com/Kshitij-Raj-01/',
    linkedin: 'https://www.linkedin.com/in/kshitij-raj-287106292',
    leetcode: 'https://leetcode.com/u/kshwebsites/',
    hackerrank: 'https://hackerrank.com/profile/kshwebsites',
    oldPortfolio: 'https://kshitij-raj.vercel.app/'
  },

  stats: [
    { label: 'Production APIs', value: '10+' },
    { label: 'Student Records', value: '1,000+' },
    { label: 'Production Deployments', value: 'Multiple' },
    { label: 'SRAM Target', value: '< 1 MB' }
  ]
};

export const STARTUP_FOLLOPE = {
  name: 'Follope',
  tagline: 'Freelancer Invoice & Payment Tracking Platform',
  role: 'Founder & Lead Developer',
  status: 'In Development',

  websiteUrl: 'https://follope.com',

  description:
    'A FinTech SaaS platform designed for freelancers and independent professionals to simplify invoice generation, payment tracking, and automated client follow-ups.',

  highlights: [
    'Professional invoice generation with customizable tax, discounts, and itemized billing',
    'UPI payment workflows with payment-status tracking and webhook-based reconciliation',
    'Automated client payment reminders and overdue follow-up workflows',
    'Asynchronous background processing using Celery and Redis',
    'Secure webhook handling with signature verification and protected application secrets',
    'Containerized deployment and automated CI/CD workflows'
  ],

  techStack: [
    'Django REST Framework',
    'PostgreSQL',
    'Redis',
    'Celery',
    'UPI Payment Integration',
    'Docker',
    'Webhooks',
    'CI/CD',
    'Cloud Infrastructure'
  ],

  architectureHighlights: [
    {
      title: 'Core Backend',
      desc:
        'Django REST Framework with modular application structure, relational data modeling, authentication, and API-layer validation.'
    },
    {
      title: 'Async Processing',
      desc:
        'Celery workers with Redis for background jobs, scheduled payment checks, notifications, and automated follow-up workflows.'
    },
    {
      title: 'Security Layer',
      desc:
        'Webhook signature verification, protected environment secrets, authentication controls, rate limiting, and secure API design.'
    }
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'robotic-sir',

    role: 'Backend Developer, Server Management & Web Security',

    company: 'Robotic Sir AI India Pvt. Ltd.',

    companySubtitle: 'Robotics & AI Technology Platform',

    period: 'June 2026 - Present',

    location: 'India',

    current: true,

    type: 'Full-time',

    highlights: [
      'Developing and maintaining RESTful backend APIs supporting robotics education, community, member, and event workflows.',
      'Managing Linux-based VPS infrastructure, access controls, server configuration, and web security hardening.',
      'Implementing CI/CD deployment workflows, application monitoring, and automated database backup processes.',
      'Optimizing database queries, API performance, and caching strategies for reliable application performance.',
      'Working across backend services, deployment infrastructure, security controls, analytics, and technical SEO.'
    ],

    technologies: [
      'Django',
      'Node.js',
      'PostgreSQL',
      'Linux',
      'VPS Infrastructure',
      'Server Hardening',
      'Web Security',
      'CI/CD',
      'Cloudflare',
      'Web Analytics'
    ]
  },

  {
    id: 'drdo-sag',

    role: 'Student Intern',

    company: 'Scientific Analysis Group (SAG), DRDO',

    companySubtitle:
      'Defence Research and Development Organisation',

    period: 'Jan 2026 – April 2026',

    location: 'Delhi, India',

    current: true,

    type: 'Internship',

    highlights: [
      'Researching the implementation of lattice-based post-quantum cryptographic algorithms on resource-constrained hardware with less than 1 MB of SRAM.',
      'Working toward functional compatibility between embedded implementations and reference cryptographic implementations.',
      'Adapted multiple C/C++ cryptographic libraries for Arduino-based microcontrollers while addressing memory and firmware constraints.',
      'Working on low-level data handling and communication between microcontrollers and peripheral hardware interfaces.'
    ],

    technologies: [
      'Post-Quantum Cryptography',
      'Lattice-Based Cryptography',
      'C',
      'C++',
      'Arduino',
      'Embedded Systems',
      'Memory Optimization',
      'Cryptographic Algorithms'
    ]
  },

  {
    id: 'nari-vastaram',

    role: 'Freelance MERN Developer',

    company: 'Nari Vastaram',

    companySubtitle:
      "E-commerce Platform for Indian Women's Clothing",

    period: 'Apr 2025 – Jul 2025',

    location: 'Remote',

    current: false,

    type: 'Freelance',

    highlights: [
      'Developed a full-stack e-commerce platform using React.js, Node.js, Express.js, and MongoDB for an Indian fashion brand with 50+ SKUs.',
      'Designed RESTful APIs for product catalog management, filtering, cart operations, and order processing.',
      'Built a responsive mobile-first frontend with product filtering, cart management, and payment gateway integration.',
      'Developed an administrative dashboard for inventory management, order tracking, and sales monitoring.',
      'Deployed the production application on a Linux VPS with custom server and reverse-proxy configuration.'
    ],

    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Payment Gateway',
      'Linux VPS',
      'Nginx'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'follope',

    title: 'Follope',

    subtitle: 'Freelancer Invoice & Payment Tracking Platform',

    category: 'fintech',

    featured: true,

    isStartup: true,

    badge: 'Startup / SaaS',

    description:
      'A FinTech SaaS platform designed to help freelancers and independent professionals generate invoices, track payments, and automate overdue payment follow-ups.',

    tags: [
      'FinTech',
      'SaaS',
      'Django',
      'PostgreSQL',
      'Redis',
      'Celery',
      'UPI',
      'Webhooks'
    ],

    keyFeatures: [
      'Professional invoice generation with tax and discount support',
      'UPI payment workflows with webhook-based payment tracking',
      'Automated background payment reminders using Celery',
      'Secure webhook signature verification',
      'Protected application secrets and environment-based configuration',
      'Containerized deployment and CI/CD automation'
    ],

    architecture: [
      'Django REST Framework API layer',
      'PostgreSQL relational database',
      'Redis-backed Celery task processing',
      'Webhook-driven payment reconciliation',
      'Docker-based deployment architecture',
      'Automated CI/CD pipeline'
    ],

    stats: [
      { label: 'Architecture', value: 'Django + PostgreSQL + Redis' },
      { label: 'Target Users', value: 'Freelancers & SMEs' }
    ],

    liveUrl: 'https://follope.com'
  },

  {
    id: 'robotic-sir-platform',

    title: 'Robotic Sir Platform',

    subtitle: 'Robotics & Technology Community Platform',

    category: 'community',

    featured: true,

    badge: 'Production Platform',

    description:
      'A robotics and AI education platform combining community features, courses, competitions, member portfolios, event workflows, and technical content.',

    tags: [
      'EdTech',
      'Community',
      'Django',
      'Node.js',
      'PostgreSQL',
      'SEO',
      'Cloud Deployment',
      'Analytics'
    ],

    keyFeatures: [
      'Student and member profiles with individual portfolio pages',
      'Course and educational content management',
      'Competition and event registration workflows',
      'Technical SEO implementation with structured metadata',
      'Google Analytics and Search Console integration',
      'Cloud-hosted media and automated deployment workflows'
    ],

    architecture: [
      'RESTful backend services',
      'PostgreSQL data layer',
      'Cloud-hosted application infrastructure',
      'Automated deployment pipeline',
      'Analytics and search monitoring'
    ],

    stats: [
      { label: 'Domain', value: 'Robotics & AI' },
      { label: 'Platform', value: 'Education + Community' }
    ]
  },

  {
    id: 'school-erp',

    title: 'School Management System (ERP)',

    subtitle: 'Academic & Administrative Management Platform',

    category: 'systems',

    featured: true,

    badge: 'Enterprise ERP',

    description:
      'A role-based educational ERP designed to manage academic, administrative, attendance, examination, and fee-management workflows.',

    tags: [
      'TypeScript',
      'Node.js',
      'MySQL',
      'Express.js',
      'JWT',
      'RBAC',
      'REST APIs'
    ],

    keyFeatures: [
      'Role-based JWT authentication for administrators, faculty, and students',
      'Attendance management and academic record tracking',
      'Fee management and invoice generation workflows',
      'Examination and grading management',
      'Normalized relational database schema',
      'Designed to support 1,000+ student records'
    ],

    architecture: [
      'Node.js + Express.js API layer',
      'MySQL relational database',
      'JWT authentication',
      'Role-based access control',
      'RESTful service architecture'
    ],

    stats: [
      { label: 'Records', value: '1,000+ Students' },
      { label: 'Database', value: 'MySQL' }
    ],

    githubUrl: 'https://github.com/Kshitij-Raj-01/'
  },

  {
    id: 'waste-ex',

    title: 'WasteEx — B2B Industrial Marketplace',

    subtitle: 'Circular Economy Marketplace',

    category: 'systems',

    featured: true,

    badge: 'Web3 / B2B',

    description:
      'A full-stack B2B marketplace concept for industrial waste trading, enabling businesses to list materials, negotiate transactions, communicate in real time, and manage trade workflows.',

    tags: [
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Blockchain',
      'Smart Contracts',
      'Socket.IO',
      'Cloudinary'
    ],

    keyFeatures: [
      'Blockchain-based escrow workflow for B2B transactions',
      'Real-time buyer-seller communication using Socket.IO',
      'Role-based profiles and marketplace listings',
      'RESTful APIs for listings and transaction workflows',
      'Cloudinary-based media management',
      'Smart-contract integration for transaction settlement'
    ],

    architecture: [
      'Node.js backend',
      'MongoDB data layer',
      'Socket.IO real-time communication',
      'Blockchain smart-contract layer',
      'Cloudinary media storage'
    ],

    stats: [
      { label: 'Transaction Model', value: 'Smart Contract Escrow' },
      { label: 'Communication', value: 'Real-time WebSockets' }
    ],

    githubUrl: 'https://github.com/Kshitij-Raj-01/'
  },

  {
    id: 'blog-loom',

    title: 'Blog Loom — Full-Stack CMS',

    subtitle: 'Modern Publishing Platform with Cloud Storage',

    category: 'fullstack',

    featured: false,

    badge: 'CMS / Cloud',

    description:
      'A full-stack content management platform featuring rich-text publishing, authentication, commenting, category-based content organization, and cloud-based image storage.',

    tags: [
      'React.js',
      'Node.js',
      'MongoDB',
      'AWS S3',
      'Express.js',
      'JWT'
    ],

    keyFeatures: [
      'Rich-text article creation and editing',
      'AWS S3-based image and media uploads',
      'Category-based content organization',
      'Nested commenting functionality',
      'JWT authentication and protected routes',
      'Password hashing using bcrypt'
    ],

    architecture: [
      'React.js frontend',
      'Node.js + Express.js backend',
      'MongoDB database',
      'AWS S3 object storage',
      'JWT authentication'
    ],

    stats: [
      { label: 'Storage', value: 'AWS S3' },
      { label: 'Authentication', value: 'JWT + bcrypt' }
    ],

    githubUrl: 'https://github.com/Kshitij-Raj-01/'
  },

  {
    id: 'nari-vastaram-proj',

    title: 'Nari Vastaram E-Commerce',

    subtitle: 'Production Fashion Commerce Platform',

    category: 'fullstack',

    featured: false,

    badge: 'Client Project',

    description:
      'A production e-commerce platform for an Indian apparel brand covering product discovery, cart management, order processing, inventory management, and payment workflows.',

    tags: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Payment Gateway',
      'Linux VPS',
      'Nginx'
    ],

    keyFeatures: [
      'Mobile-first product catalog with multi-criteria filtering',
      'Persistent shopping cart functionality',
      'Payment gateway integration',
      'Administrative inventory management',
      'Order tracking and management',
      'Production deployment on a Linux VPS'
    ],

    architecture: [
      'React.js frontend',
      'Node.js + Express.js backend',
      'MongoDB database',
      'Payment gateway integration',
      'Nginx reverse proxy'
    ],

    stats: [
      { label: 'Catalog', value: '50+ SKUs' },
      { label: 'Deployment', value: 'Linux VPS' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Backend & Systems Architecture',

    icon: 'Server',

    description:
      'Designing maintainable backend services, REST APIs, asynchronous processing systems, and event-driven workflows.',

    skills: [
      { name: 'Django / DRF', level: 'Advanced', highlight: true },
      { name: 'Node.js / Express.js', level: 'Advanced', highlight: true },
      { name: 'RESTful API Design', level: 'Advanced', highlight: true },
      { name: 'Celery & Redis', level: 'Advanced', highlight: true },
      { name: 'WebSockets / Socket.IO', level: 'Proficient' },
      { name: 'Webhooks & Event-Driven Systems', level: 'Advanced' }
    ]
  },

  {
    title: 'Databases & Data Systems',

    icon: 'Database',

    description:
      'Designing relational schemas, data models, indexes, caching strategies, and persistence layers.',

    skills: [
      { name: 'PostgreSQL', level: 'Advanced', highlight: true },
      { name: 'MySQL', level: 'Advanced', highlight: true },
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'Redis', level: 'Advanced', highlight: true },
      { name: 'SQL & Data Modeling', level: 'Advanced' },
      { name: 'Query Optimization', level: 'Proficient' }
    ]
  },

  {
    title: 'Security & Cryptography',

    icon: 'ShieldCheck',

    description:
      'Application security, server hardening, authentication, secure API design, and applied cryptographic research.',

    skills: [
      {
        name: 'Post-Quantum Cryptography',
        level: 'Research',
        highlight: true
      },
      {
        name: 'Lattice-Based Cryptography',
        level: 'Research',
        highlight: true
      },
      {
        name: 'Linux Server Hardening',
        level: 'Advanced',
        highlight: true
      },
      {
        name: 'API & Web Security',
        level: 'Advanced',
        highlight: true
      },
      {
        name: 'Secret & Key Management',
        level: 'Proficient'
      },
      {
        name: 'JWT & Password Security',
        level: 'Advanced'
      },
      {
        name: 'C/C++ Embedded Security',
        level: 'Proficient'
      }
    ]
  },

  {
    title: 'DevOps, Cloud & Infrastructure',

    icon: 'Cloud',

    description:
      'Deploying and operating web applications using containers, VPS infrastructure, reverse proxies, and automated delivery pipelines.',

    skills: [
      { name: 'Docker', level: 'Proficient', highlight: true },
      { name: 'CI/CD', level: 'Advanced', highlight: true },
      { name: 'Linux / VPS Administration', level: 'Advanced', highlight: true },
      { name: 'Nginx', level: 'Proficient' },
      { name: 'AWS S3 / IAM', level: 'Proficient' },
      { name: 'Cloudflare', level: 'Proficient' },
      { name: 'Monitoring & Backups', level: 'Proficient' }
    ]
  },

  {
    title: 'Programming Languages',

    icon: 'Code2',

    description:
      'Polyglot development across backend engineering, systems programming, embedded development, and web applications.',

    skills: [
      { name: 'Python', level: 'Advanced', highlight: true },
      { name: 'JavaScript', level: 'Advanced', highlight: true },
      { name: 'TypeScript', level: 'Advanced', highlight: true },
      { name: 'C / C++', level: 'Intermediate', highlight: true },
      { name: 'SQL', level: 'Advanced' },
      { name: 'PHP', level: 'Familiar' }
    ]
  },

  {
    title: 'Frontend & Web',

    icon: 'Layout',

    description:
      'Building responsive web interfaces and integrating frontend applications with secure backend services.',

    skills: [
      { name: 'React.js', level: 'Advanced', highlight: true },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'Three.js', level: 'Familiar' },
      { name: 'SEO & Web Performance', level: 'Advanced' }
    ]
  }
];

export const RESEARCH_AND_HONORS = [
  {
    id: 'vedic-crypto',

    type: 'Research Paper',

    title:
      'Integrating Vedic Mathematics in Post-Quantum Cryptography',

    institution:
      'Presented at IKVI 2025, Shobhit University',

    year: '2025',

    status:
      'Abstract Published / Full Paper Under Review',

    description:
      'Explored potential computational optimizations for post-quantum cryptographic operations by investigating Vedic mathematical techniques, including Urdhva Tiryagbhyam and Nikhilam-based multiplication, in the context of lattice-based cryptographic computations and constrained hardware.',

    tags: [
      'Post-Quantum Cryptography',
      'Vedic Mathematics',
      'Lattice Cryptography',
      'Algorithm Optimization'
    ]
  },

  {
    id: 'sih-hackathon',

    type: 'Hackathon Award',

    title:
      'Winner — Internal Smart India Hackathon 2025',

    institution:
      'Shobhit University',

    year: '2025',

    status: 'First Place Winner',

    description:
      'Developed an on-device computer vision solution for detecting and blurring inappropriate visual content in real time, with a focus on local processing and privacy-preserving image analysis.',

    tags: [
      'Computer Vision',
      'On-Device AI',
      'Data Privacy',
      'Hackathon Winner'
    ]
  },

  {
    id: 'peer-workshop',

    type: 'Technical Leadership',

    title:
      'Lead Instructor — Peer Workshop on MERN Development',

    institution:
      'Shobhit University',

    year: '2025',

    status: 'Conducted & Mentored',

    description:
      'Conducted a hands-on peer workshop covering MERN-stack development, REST API design, database modeling, authentication, and deployment practices.',

    tags: [
      'Mentorship',
      'MERN Stack',
      'Technical Training',
      'Public Speaking'
    ]
  }
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  issuerType: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
  certificateFile?: string;
  credentialId?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-cybersecurity',

    title: 'Google Cybersecurity Professional Certificate',

    issuer: 'Google / Coursera',

    badge: 'Professional Certificate',

    issuerType: 'Cybersecurity',

    description:
      'Professional cybersecurity training covering security fundamentals, Linux, Python, SQL, networking, SIEM concepts, incident response, and security operations.',

    skills: [
      'Cybersecurity',
      'Linux',
      'Python',
      'SQL',
      'Network Security',
      'SIEM',
      'Incident Response'
    ],

    verifyUrl: 'https://www.coursera.org/',

    certificateFile: '/certificates/google-cybersecurity.pdf'
  },

  {
    id: 'pregrad-mern',

    title: 'MERN Stack Engineering Certification',

    issuer: 'Pregrad',

    badge: 'Course Certificate',

    issuerType: 'Full-Stack Development',

    description:
      'Full-stack development training covering React.js, Node.js, Express.js, MongoDB, REST APIs, authentication, and application deployment.',

    skills: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'JWT Authentication'
    ],

    verifyUrl: 'https://pregrad.in/',

    certificateFile: '/certificates/pregrad-mern.pdf'
  },

  {
    id: 'nptel-cs',

    title: 'NPTEL Computer Science Certification',

    issuer: 'NPTEL',

    badge: 'NPTEL Certificate',

    issuerType: 'Computer Science',

    description:
      'NPTEL certification in computer science coursework, demonstrating structured academic learning through the IIT-led NPTEL platform.',

    skills: [
      'Computer Science',
      'Data Structures',
      'Algorithms',
      'Database Systems',
      'Computer Networks'
    ],

    verifyUrl: 'https://nptel.ac.in/',

    certificateFile: '/certificates/nptel-cs.pdf'
  }
];