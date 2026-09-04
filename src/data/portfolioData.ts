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
  skills: { name: string; level: string; highlight?: boolean }[];
}

export const PERSONAL_INFO = {
  name: 'Kshitij Raj',
  title: 'Backend Developer & Web Security Engineer',
  tagline: 'Architecting resilient backend systems, secure APIs & scalable cloud infrastructure.',
  status: 'Building Follope | Backend & Web Security @ Robotic Sir AI | DRDO SAG Intern',
  email: 'rajkshitijsss06@gmail.com',
  phone: '+91 9117434145',
  location: 'Meerut / Remote, India',
  education: {
    institution: 'Shobhit Institute of Engineering & Technology',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: 'Aug 2023 – June 2027',
    location: 'Meerut, Uttar Pradesh',
    coursework: [
      'Data Structures & Algorithms',
      'Cryptography & Network Security',
      'Database Management Systems',
      'Computer Networks',
      'Software Methodology',
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
    { label: 'Student Records Managed', value: '1,000+' },
    { label: 'Launch Traffic Handled', value: '100%' },
    { label: 'SRAM Hardware Target', value: '< 1 MB' }
  ]
};

export const STARTUP_FOLLOPE = {
  name: 'Follope',
  tagline: 'Freelancer Invoice & Payment Tracking Platform',
  role: 'Founder & Lead Architect',
  status: 'Upcoming Public Launch',
  websiteUrl: 'https://follope.com',
  description:
    'A dedicated FinTech & SaaS platform engineered specifically for independent consultants and freelancers to automate client invoice generation, real-time UPI reconciliation, automated overdue payment follow-ups, and airtight webhook event management.',
  highlights: [
    'Automated Invoice Generation with customizable tax, discounts, and itemized billing',
    'Real-time UPI payment tracking workflows with instant status reconciliation',
    'Intelligent multi-channel client payment reminders and automated follow-ups',
    'Resilient asynchronous processing powered by Redis message broker and Celery task workers',
    'Hardened secret management, webhook signature verification, and automated CI/CD deployment pipelines'
  ],
  techStack: [
    'Django REST Framework',
    'PostgreSQL',
    'Redis',
    'Celery',
    'UPI Payment Gateways',
    'Docker',
    'Webhooks & Automation',
    'CI/CD & Cloud Monitoring'
  ],
  architectureHighlights: [
    {
      title: 'Core Engine',
      desc: 'Django with clean modular architecture, normalized relational schemas, and query optimization.'
    },
    {
      title: 'Async Tasks',
      desc: 'Celery + Redis workers executing periodic invoice reconciliations and email/SMS reminder schedules.'
    },
    {
      title: 'Security Layer',
      desc: 'HMAC signature verification on inbound webhooks, encrypted secret vaults, and rate-limited endpoints.'
    }
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'robotic-sir',
    role: 'Backend Developer, Server Management & Web Security',
    company: 'Robotic Sir AI India Pvt. Ltd.',
    companySubtitle: 'Robotics & AI Technology Platform',
    period: 'Present',
    location: 'India',
    current: true,
    type: 'Full-time',
    highlights: [
      'Architecting resilient RESTful backend APIs and microservices powering robotics community and educational workflows.',
      'Leading server management, Linux VPS hardening, access control policies, and end-to-end web security audits.',
      'Implementing automated CI/CD deployment pipelines, system health monitoring, and automated database backups.',
      'Optimizing database queries and caching layers to ensure low-latency response times under high concurrency.'
    ],
    technologies: ['Django', 'Node.js', 'PostgreSQL', 'Linux VPS', 'Server Hardening', 'Web Security', 'CI/CD', 'Cloud Monitoring']
  },
  {
    id: 'drdo-sag',
    role: 'Student Intern',
    company: 'Scientific Analysis Group (SAG), DRDO',
    companySubtitle: 'Defence Research and Development Organisation',
    period: 'Jan 2026 – Present',
    location: 'Delhi, India',
    current: true,
    type: 'Internship',
    highlights: [
      'Investigating the implementation of cutting-edge lattice-based cryptographic algorithms on constrained hardware with less than 1MB of SRAM.',
      'Ensuring strict functional and cryptographic parity with standard NIST Post-Quantum Cryptography implementations.',
      'Successfully adapted 4+ complex C/C++ cryptographic libraries for Arduino-based microcontrollers, prioritizing firmware stability and cross-hardware compatibility.',
      'Orchestrated low-level data handling and secure communication protocols between microcontrollers and peripheral hardware interfaces.'
    ],
    technologies: ['Post-Quantum Cryptography', 'Lattice-based Crypto', 'C', 'C++', 'Arduino', 'Embedded Systems', 'SRAM Optimization']
  },
  {
    id: 'nari-vastaram',
    role: 'Freelance MERN Developer',
    company: 'Nari Vastaram',
    companySubtitle: 'E-commerce Platform for Indian Women\'s Clothing',
    period: 'April 2025 – July 2025',
    location: 'Remote',
    current: false,
    type: 'Freelance',
    highlights: [
      'Engineered a complete full-stack e-commerce platform using React.js, Node.js, Express.js, and MongoDB for an Indian fashion brand, managing 50+ SKUs.',
      'Handled 100% of launch day traffic flawlessly with zero downtime on a custom-configured Hostinger VPS.',
      'Architected high-throughput RESTful APIs with Express.js for catalog filtering, cart management, and seamless order lifecycle handling.',
      'Built a responsive mobile-first React UI with dynamic filters and integrated a secure payment gateway checkout flow.',
      'Developed a custom Node.js admin dashboard providing real-time inventory updates, order tracking, and sales analytics, eliminating manual spreadsheets.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Payment Gateway', 'Hostinger VPS', 'RESTful APIs']
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
    badge: 'My Startup / SaaS',
    description:
      'A specialized FinTech SaaS engineered to eliminate late payments for freelancers and boutique agencies through automated invoice generation, real-time UPI tracking, and scheduled client follow-ups.',
    tags: ['FinTech', 'SaaS', 'Django', 'PostgreSQL', 'Redis', 'Celery', 'UPI Workflows', 'Webhooks'],
    keyFeatures: [
      'One-click professional invoice generation with GST & tax presets',
      'Direct UPI payment integration & webhook-driven reconciliation',
      'Automated background payment reminders powered by Celery queues',
      'Bank-grade secret management and webhook HMAC verification'
    ],
    stats: [
      { label: 'Architecture', value: 'Django + Redis' },
      { label: 'Target Market', value: 'Freelancers & SMEs' }
    ],
    liveUrl: 'https://follope.com'
  },
  {
    id: 'robotic-sir-platform',
    title: 'Robotic Sir Platform',
    subtitle: 'Robotics & Technology Community Platform',
    category: 'community',
    featured: true,
    badge: 'Enterprise / Community',
    description:
      'A comprehensive EdTech and community platform unifying robotics and AI enthusiasts, offering courses, competition registration, interactive member portfolios, and automated event pipelines.',
    tags: ['EdTech', 'Community', 'Django', 'Node.js', 'PostgreSQL', 'SEO', 'Cloud Deployment', 'Analytics'],
    keyFeatures: [
      'Multi-tier student and member ecosystem with individualized portfolio pages',
      'Curated courses, hands-on tutorials, and robotics event registration pipelines',
      'Comprehensive technical SEO implementation with Google Analytics & Search Console integration',
      'Automated webhook triggers and cloud-backed media asset pipelines'
    ],
    stats: [
      { label: 'Domain', value: 'Robotics & AI' },
      { label: 'Stack', value: 'Full-Stack Cloud' }
    ]
  },
  {
    id: 'school-erp',
    title: 'School Management System (ERP)',
    subtitle: 'Enterprise Academic & Administrative Solution',
    category: 'systems',
    featured: true,
    badge: 'Enterprise ERP',
    description:
      'A comprehensive educational ERP system streamlining academic, financial, and administrative operations with multi-level role-based access for Admins, Teachers, and Students.',
    tags: ['TypeScript', 'Node.js', 'MySQL', 'Express.js', 'Three.js', 'Role-Based Access'],
    keyFeatures: [
      'Multi-level JWT authentication separating Admin, Faculty, and Student privileges',
      'Dynamic attendance tracking and fee management with automated invoice generation',
      'Centralized examination grading engine with dynamic grade-point evaluation',
      'Normalized relational MySQL schema engineered to handle 1,000+ active student records'
    ],
    stats: [
      { label: 'Records', value: '1,000+ Students' },
      { label: 'Database', value: 'MySQL Relational' }
    ],
    githubUrl: 'https://github.com/Kshitij-Raj-01/'
  },
  {
    id: 'waste-ex',
    title: 'WasteEx — B2B Industrial Marketplace',
    subtitle: 'Circular Economy Platform with Blockchain Escrow',
    category: 'systems',
    featured: true,
    badge: 'Web3 / B2B',
    description:
      'A full-stack circular economy marketplace enabling industrial enterprises to list, negotiate, and trade industrial waste materials as reusable raw resources.',
    tags: ['TypeScript', 'Node.js', 'MongoDB', 'Blockchain', 'Smart Contracts', 'Socket.IO', 'Cloudinary'],
    keyFeatures: [
      'Blockchain-based smart contracts with an escrow payment mechanism for trustless high-value B2B transactions',
      'Low-latency real-time chat dashboard built with Socket.IO for buyer-seller negotiations',
      'Cloudinary media integration with RESTful APIs managing listings, contracts, and role-based profiles'
    ],
    stats: [
      { label: 'Security', value: 'Escrow Smart Contract' },
      { label: 'Messaging', value: 'Real-time WebSockets' }
    ],
    githubUrl: 'https://github.com/Kshitij-Raj-01/'
  },
  {
    id: 'blog-loom',
    title: 'Blog Loom — Full-Stack CMS',
    subtitle: 'Modern Publishing Platform with AWS Cloud Storage',
    category: 'fullstack',
    featured: false,
    badge: 'CMS / Cloud',
    description:
      'A feature-rich content management platform built on the MERN stack featuring rich-text authoring, AWS S3 image distribution, and category-based indexing.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'AWS S3', 'Express.js', 'JWT Auth'],
    keyFeatures: [
      'Rich-text article editor with direct AWS S3 asset uploads and responsive layouts',
      'Interactive nested commenting system and category-based real-time post filtering',
      'Hardened JWT authentication with bcrypt password hashing and route middleware guards'
    ],
    stats: [
      { label: 'Storage', value: 'AWS S3 CDN' },
      { label: 'Security', value: 'JWT & Bcrypt' }
    ],
    githubUrl: 'https://github.com/Kshitij-Raj-01/'
  },
  {
    id: 'nari-vastaram-proj',
    title: 'Nari Vastaram E-Commerce',
    subtitle: 'High-Conversion Fashion Commerce Platform',
    category: 'fullstack',
    featured: false,
    badge: 'Client Production',
    description:
      'Production e-commerce storefront and admin console built for an Indian apparel brand, handling full order processing, inventory sync, and payment gateway transactions.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Payment Gateway', 'VPS'],
    keyFeatures: [
      'Mobile-first catalog with instant multi-facet product filtering and cart persistence',
      'Automated inventory tracking console reducing client operational overhead to zero manual logs',
      'Custom production deployment on Hostinger VPS with Nginx reverse proxy'
    ],
    stats: [
      { label: 'SKUs', value: '50+ Items' },
      { label: 'Uptime', value: '100% Launch' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Backend & Systems Architecture',
    icon: 'Server',
    description: 'Designing resilient microservices, high-throughput APIs, and asynchronous message queues.',
    skills: [
      { name: 'Django / DRF', level: 'Advanced', highlight: true },
      { name: 'Node.js & Express.js', level: 'Advanced', highlight: true },
      { name: 'RESTful API Design', level: 'Expert', highlight: true },
      { name: 'Celery & Redis Queues', level: 'Advanced', highlight: true },
      { name: 'WebSockets (Socket.IO)', level: 'Proficient' },
      { name: 'Microservices & Webhooks', level: 'Advanced' }
    ]
  },
  {
    title: 'Databases & In-Memory Stores',
    icon: 'Database',
    description: 'Relational data modeling, schema normalization, ACID guarantees, and caching strategies.',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced', highlight: true },
      { name: 'Redis Caching', level: 'Advanced', highlight: true },
      { name: 'MySQL Relational Schema', level: 'Advanced' },
      { name: 'MongoDB NoSQL', level: 'Advanced' },
      { name: 'Query Optimization', level: 'Proficient' }
    ]
  },
  {
    title: 'Security, Cryptography & Systems',
    icon: 'ShieldCheck',
    description: 'Post-quantum cryptographic research, hardware adaptation, and server hardening.',
    skills: [
      { name: 'Post-Quantum Cryptography', level: 'Research Level', highlight: true },
      { name: 'Lattice-based Algorithms', level: 'Research Level', highlight: true },
      { name: 'Server Hardening & Linux', level: 'Advanced', highlight: true },
      { name: 'Secret & Key Management', level: 'Advanced' },
      { name: 'JWT & Bcrypt Security', level: 'Expert' },
      { name: 'C/C++ Embedded Firmware', level: 'Proficient' }
    ]
  },
  {
    title: 'DevOps, Cloud & Infrastructure',
    icon: 'Cloud',
    description: 'Automating deployments, containerization, VPS hosting, and server health monitoring.',
    skills: [
      { name: 'Docker & Containers', level: 'Proficient', highlight: true },
      { name: 'CI/CD Automation', level: 'Advanced', highlight: true },
      { name: 'AWS Cloud (S3, IAM)', level: 'Proficient' },
      { name: 'VPS Hosting (Hostinger/Linux)', level: 'Advanced' },
      { name: 'Nginx Configuration', level: 'Proficient' },
      { name: 'Cloudflare & Monitoring', level: 'Proficient' }
    ]
  },
  {
    title: 'Programming Languages',
    icon: 'Code2',
    description: 'Strong polyglot foundation across high-level scripting, compiled systems, and web languages.',
    skills: [
      { name: 'Python', level: 'Advanced', highlight: true },
      { name: 'TypeScript', level: 'Advanced', highlight: true },
      { name: 'JavaScript (ES6+)', level: 'Expert', highlight: true },
      { name: 'C / C++', level: 'Intermediate (Embedded)', highlight: true },
      { name: 'SQL', level: 'Advanced' },
      { name: 'PHP', level: 'Familiar' }
    ]
  },
  {
    title: 'Frontend & Interactive UIs',
    icon: 'Layout',
    description: 'Building responsive, sleek developer experiences and customer interfaces.',
    skills: [
      { name: 'React.js', level: 'Advanced', highlight: true },
      { name: 'Tailwind CSS', level: 'Advanced', highlight: true },
      { name: 'Three.js / 3D Canvas', level: 'Familiar' },
      { name: 'HTML5 & Modern CSS', level: 'Expert' },
      { name: 'SEO & Web Vitals', level: 'Advanced' }
    ]
  }
];

export const RESEARCH_AND_HONORS = [
  {
    id: 'vedic-crypto',
    type: 'Research Paper',
    title: 'Integrating Vedic Mathematics in Post-Quantum Cryptography',
    institution: 'Presented at IKVI 2025, Shobhit University',
    year: '2025',
    status: 'Abstract Published / Full Paper Under Review',
    description:
      'Investigated computational optimizations in Post-Quantum Cryptography by synthesizing ancient Vedic mathematical algorithms (such as Urdhva Tiryagbhyam and Nikhilam multiplication) with lattice-based encryption algorithms to enhance modular arithmetic efficiency in hardware-constrained environments.',
    tags: ['Post-Quantum Cryptography', 'Vedic Mathematics', 'Lattice Cryptography', 'Algorithm Optimization']
  },
  {
    id: 'sih-hackathon',
    type: 'Hackathon Award',
    title: 'Winner — Internal Smart India Hackathon 2025',
    institution: 'Shobhit University',
    year: '2025',
    status: 'First Place Winner',
    description:
      'Engineered an on-device privacy-centric image processing solution designed to automatically detect and blur inappropriate visuals in real-time. Prioritized local computation to protect user privacy without transmitting raw personal imagery to cloud endpoints.',
    tags: ['Computer Vision', 'On-Device AI', 'Data Privacy', 'Hackathon Winner']
  },
  {
    id: 'peer-workshop',
    type: 'Technical Leadership',
    title: 'Lead Instructor — Peer-to-Peer Workshop on MERN Development',
    institution: 'Shobhit University',
    year: '2025',
    status: 'Conducted & Mentored',
    description:
      'Conducted hands-on technical workshops teaching university peers full-stack web development with the MERN stack. Mentored student teams on building RESTful APIs, database schema design, and production deployment best practices.',
    tags: ['Mentorship', 'MERN Stack', 'Public Speaking', 'Code Review']
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
    issuer: 'Google (via Coursera)',
    badge: 'Professional Credential',
    issuerType: 'Cybersecurity & Systems',
    description: 'Rigorous industry certification covering network security architecture, Linux bash administration, SQL database querying, SIEM tools (Splunk, Chronicle), Python automation for security tasks, and incident response frameworks.',
    skills: ['Network Security', 'Linux Administration', 'SQL Security', 'Python for Cyber', 'SIEM Tools', 'Incident Response'],
    verifyUrl: 'https://www.coursera.org/',
    certificateFile: '/certificates/google-cybersecurity.pdf',
    credentialId: 'COURSERA-GOOGLE-CYBER-8849'
  },
  {
    id: 'pregrad-mern',
    title: 'MERN Stack Engineering Certification',
    issuer: 'Pregrad',
    badge: 'Course Completion',
    issuerType: 'Full-Stack Architecture',
    description: 'End-to-end full-stack software development with React.js, Node.js, Express.js, and MongoDB, covering RESTful API architecture, authentication, database indexing, and production cloud deployment.',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'JWT Security'],
    verifyUrl: 'https://pregrad.in/',
    certificateFile: '/certificates/pregrad-mern.pdf',
    credentialId: 'PREGRAD-MERN-2025-0192'
  },
  {
    id: 'nptel-cs',
    title: 'NPTEL Computer Science Certification',
    issuer: 'NPTEL / IIT (Ministry of Education, Govt. of India)',
    badge: 'Government / IIT Accredited',
    issuerType: 'Core Computer Science',
    description: 'National Programme on Technology Enhanced Learning certification validated by Indian Institutes of Technology (IITs), certifying core computer science rigor in data structures, algorithms, and computational theory.',
    skills: ['Data Structures & Algorithms', 'Database Systems', 'Computer Networks', 'Algorithm Analysis'],
    verifyUrl: 'https://nptel.ac.in/',
    certificateFile: '/certificates/nptel-cs.pdf',
    credentialId: 'NPTEL-IIT-CS-2025-7741'
  }
];
