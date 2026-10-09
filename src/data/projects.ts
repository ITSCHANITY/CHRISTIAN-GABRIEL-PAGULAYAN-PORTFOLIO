import type { Project, ProjectFilter } from '@/types'

export const projectFilters: ProjectFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'webapps', label: 'Web Apps' },
  { id: 'gamedev', label: 'Game Dev' },
  { id: 'iot', label: 'IoT / Embedded' },
]

export const projects: Project[] = [
  {
    id: 'webscan',
    title: 'WebScan v4.0',
    codename: 'NIGHTCRAWLER',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Custom Python web vulnerability scanner.',
    description:
      'A custom-built web vulnerability scanner written in Python that crawls targets and flags common misconfigurations and vulnerabilities.',
    problem:
      'Off-the-shelf scanners were noisy and missed logic/config flaws like broken access control during CTF-assigned target tests.',
    approach:
      'Built a focused async crawler in Python that enumerates endpoints, probes auth boundaries, and checks data-access rules.',
    features: ['Async endpoint crawling', 'Access-control / RLS checks', 'JSON report output'],
    lessons: [
      'Found a REAL Supabase RLS (Row Level Security) misconfiguration on a CTF-assigned target.',
      'Config flaws often matter more than classic injection bugs.',
    ],
    tech: ['Python', 'Requests', 'asyncio', 'Supabase'],
    skillIds: ['pentest', 'vulnscan', 'python', 'kali'],
    terminalPreview: [
      '$ webscan --target ctf.box',
      '[*] crawling endpoints...',
      '[!] RLS misconfig: public read on private table',
      '[+] report saved: webscan_report.json',
    ],

    links: [{ label: 'GitHub', href: '#' }],
    featured: true,
  },
  {
    id: 'threatscan',
    title: 'ThreatScan v4.0',
    codename: 'DEEPSCAN',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Malware / threat analyzer with ATT&CK mapping.',
    description:
      'A malware and threat analyzer that applies YARA rules, performs entropy analysis, maps behaviors to MITRE ATT&CK, and enriches findings with MalwareBazaar and VirusTotal.',
    problem:
      'Triaging unknown binaries by hand is slow and inconsistent without a repeatable enrichment pipeline.',
    approach:
      'Combined static signals (YARA, entropy) with threat-intel lookups and ATT&CK technique mapping into one report.',
    features: [
      'YARA rule matching',
      'Entropy analysis (packing detection)',
      'MITRE ATT&CK technique mapping',
      'VirusTotal + MalwareBazaar enrichment',
    ],
    lessons: [
      'Layering static + intel signals beats any single indicator.',
      'ATT&CK mapping makes findings communicable to a SOC.',
    ],
    tech: ['Python', 'YARA', 'MITRE ATT&CK', 'VirusTotal', 'MalwareBazaar'],
    skillIds: ['malware', 'osint', 'python', 'kali'],
    terminalPreview: [
      '$ threatscan sample.bin',
      '[*] entropy: 7.91 (packed)',
      '[*] YARA: Win32.Generic.Loader',
      '[*] ATT&CK: T1055 Process Injection',
    ],
    links: [{ label: 'GitHub', href: '#' }],
    featured: true,
  },
  {
    id: 'wiretap',
    title: 'WIRETAP',
    codename: 'FLYTRAP',
    category: 'cybersecurity',
    status: 'in-progress',
    summary: 'Multi-protocol honeypot with live dashboard.',
    description:
      'A multi-protocol honeypot exposing SSH, HTTP, FTP, and Telnet listeners, logging attacker interactions to SQLite and visualizing them in a Flask dashboard.',
    problem:
      'Wanted real, local telemetry on how attackers probe exposed services — not just textbook theory.',
    approach:
      'Stood up fake SSH/HTTP/FTP/Telnet listeners, logged every interaction to SQLite, and built a Flask dashboard with Chart.js graphs and a Leaflet attacker-geo map.',
    features: [
      'SSH / HTTP / FTP / Telnet listeners',
      'SQLite interaction logging',
      'Flask dashboard (Chart.js + Leaflet)',
    ],
    lessons: [
      'Credential-stuffing noise is constant and automated.',
      'Good logging schema design pays off downstream.',
    ],
    tech: ['Python', 'Flask', 'SQLite', 'Chart.js', 'Leaflet'],
    skillIds: ['pentest', 'sys-sec', 'python', 'sql', 'flask', 'kali'],
    terminalPreview: [
      '$ wiretap --listen all',
      '[+] SSH/HTTP/FTP/Telnet armed',
      '[!] 203.0.113.7 tried root:toor',
      '[*] logged -> events.sqlite',
    ],
    links: [{ label: 'GitHub', href: '#' }],
    featured: true,
  },
  {
    id: 'storage-checker',
    title: 'Storage Checker v5.0',
    codename: 'JANITOR',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Disk hygiene & missing-dependency checker.',
    description:
      'A system utility that audits disk hygiene and detects missing dependencies, keeping lab machines clean and reproducible.',
    problem:
      'Lab machines drifted over time — stale files piled up and missing deps broke tools silently.',
    approach:
      'Wrote a Python/shell auditor that reports reclaimable space and flags missing dependencies before they bite.',
    features: ['Reclaimable-space report', 'Missing dependency detection', 'Cleanup plan output'],
    lessons: ['Automating hygiene prevents "works on my machine" surprises.'],
    tech: ['Python', 'Shell'],
    skillIds: ['linux-admin', 'sys-sec', 'python', 'kali'],
    terminalPreview: [
      '$ storage-checker --scan /',
      '[*] 12.4 GB reclaimable',
      '[!] missing dep: libpcap-dev',
      '[+] cleanup plan ready',
    ],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    id: 'passgen-passman',
    title: 'passgen v2 / passman v2',
    codename: 'KEYRING',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Password generator and manager.',
    description:
      'A pair of tools: passgen generates strong, configurable passwords; passman securely stores and retrieves them.',
    problem: 'Needed strong, unique credentials per service without reusing passwords.',
    approach:
      'Built a configurable generator plus an encrypted local store with simple add/get commands.',
    features: ['Configurable password generation', 'Encrypted local storage', 'CLI workflow'],
    lessons: ['Rolling your own crypto storage teaches real respect for key management.'],
    tech: ['Python', 'cryptography'],
    skillIds: ['python'],
    terminalPreview: [
      '$ passgen -l 24 --symbols',
      '[+] generated: ********************',
      '$ passman add github',
      '[+] stored (encrypted)',
    ],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    id: 'header-scanner',
    title: 'HTTP Header Scanner',
    codename: 'GATEKEEPER',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Audits HTTP security headers against best practices.',
    description:
      'A security tool that inspects a target\'s HTTP response headers and grades them against best-practice rules (HSTS, CSP, X-Frame-Options, and more), reporting severity and remediation advice in a clean terminal UI.',
    problem:
      'Missing or misconfigured security headers quietly expose sites to SSL-stripping, clickjacking, and injection attacks.',
    approach:
      'Built a Python scanner using httpx to fetch headers and a rule engine that scores each header by severity with concrete recommendations, rendered with rich.',
    features: [
      'Rule-based header grading',
      'Severity scoring + recommendations',
      'Rich terminal output',
    ],
    lessons: ['Secure defaults in headers prevent entire classes of attacks.'],
    tech: ['Python', 'httpx', 'rich'],
    skillIds: ['pentest', 'vulnscan', 'python', 'kali'],
    terminalPreview: [
      '$ header-scan https://target',
      '[!] HIGH: missing Strict-Transport-Security',
      '[!] MED: no Content-Security-Policy',
      '[+] grade: C',
    ],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    id: 'hash-identifier',
    title: 'Hash Identifier',
    codename: 'FINGERPRINT',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Identifies hash algorithms from format patterns.',
    description:
      'A CLI tool that identifies the likely algorithm behind a hash — Argon2, bcrypt, SHA-crypt, yescrypt, phpass, MD5, and more — using prefix and format detection with confidence ratings.',
    problem:
      'Knowing which algorithm produced a hash is the first step to cracking or validating it, and guessing wastes time.',
    approach:
      'Built a Python matcher with prefix rules (PHC strings) and format heuristics that rank candidates by confidence, output with rich.',
    features: [
      'PHC prefix + format detection',
      'Confidence-rated candidates',
      'Rich table output',
    ],
    lessons: ['Hash formats carry a lot of identifying structure beyond raw length.'],
    tech: ['Python', 'rich'],
    skillIds: ['pentest', 'python', 'kali'],
    terminalPreview: [
      '$ hashid \'$2b$12$...\'',
      '[+] bcrypt (high confidence)',
      '[*] 2b variant (current)',
    ],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    id: 'file-identifier',
    title: 'File Identifier',
    codename: 'MAGICBYTE',
    category: 'cybersecurity',
    status: 'completed',
    summary: 'Detects true file type from magic bytes.',
    description:
      'A tool that determines a file\'s real type from its magic-byte signatures — JPEG, PNG, PDF, PE/ELF/Mach-O executables, archives, and more — regardless of its extension.',
    problem:
      'File extensions lie; attackers rename payloads, so you need to read the actual bytes to know what a file really is.',
    approach:
      'Built a Python identifier with a signature table of magic bytes that inspects file headers and reports the true format.',
    features: [
      'Magic-byte signature matching',
      'Executable + archive detection',
      'Extension-independent typing',
    ],
    lessons: ['Trusting file extensions is a classic way to get owned.'],
    tech: ['Python'],
    skillIds: ['malware', 'python', 'kali'],
    terminalPreview: [
      '$ fileid suspicious.jpg',
      '[!] real type: Windows PE Executable',
      '[*] extension mismatch detected',
    ],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    id: 'sentriq',
    title: 'Sentriq',
    codename: 'VAULTKEEPER',
    category: 'iot',
    status: 'thesis',
    summary: 'IoT smart campus equipment locker (thesis).',
    description:
      'Thesis project — an IoT smart equipment locker for CSU, evolved from the Boxceiver concept. Built on ESP32-WROOM with multi-factor access and tamper detection reporting to an MQTT dashboard.',
    problem:
      'Shared campus equipment needed accountable, auditable, and tamper-aware access control.',
    approach:
      'Evolved from Boxceiver: added GM65 QR + AS608 fingerprint multi-factor auth, ADXL345 tamper detection, reed switches, and solenoid locks, all reporting over MQTT.',
    features: [
      'ESP32-WROOM controller',
      'GM65 QR + AS608 fingerprint multi-factor',
      'ADXL345 tamper detection + reed switches',
      'Solenoid locks + MQTT dashboard',
    ],
    lessons: [
      'Multi-factor hardware auth is a systems-integration challenge, not just code.',
      'Tamper detection needs careful thresholding to avoid false alarms.',
    ],
    tech: ['ESP32-WROOM', 'GM65 QR', 'AS608', 'ADXL345', 'MQTT', 'Solenoid'],
    skillIds: ['esp32', 'mqtt', 'sensors'],
    terminalPreview: [
      '$ sentriq status',
      '[*] locker#3: LOCKED',
      '[*] fingerprint: VERIFIED',
      '[!] ADXL345: tamper = none',
    ],
    links: [{ label: 'Details', href: '#' }],
    featured: true,
  },
  {
    id: 'boxceiver',
    title: 'Boxceiver',
    codename: 'DROPBOX-X',
    category: 'iot',
    status: 'in-progress',
    summary: 'IoT smart parcel vault with hybrid power.',
    description:
      'An IoT smart parcel vault using an ESP32-CAM, EMQX/MQTT messaging, and RC522 RFID access control, powered by a hybrid solar / Li-ion system. The predecessor concept to Sentriq.',
    problem: 'Unattended parcel delivery needed secure, powered, off-grid-capable storage.',
    approach:
      'Combined an ESP32-CAM for capture, RC522 RFID for access, EMQX/MQTT for messaging, and a hybrid solar/Li-ion supply.',
    features: [
      'ESP32-CAM capture',
      'RC522 RFID access control',
      'EMQX / MQTT messaging',
      'Hybrid solar / Li-ion power',
    ],
    lessons: ['Power budgeting is as important as the firmware for off-grid IoT.'],
    tech: ['ESP32-CAM', 'EMQX', 'MQTT', 'RC522 RFID', 'Solar/Li-ion'],
    skillIds: ['esp32', 'mqtt', 'sensors'],
    terminalPreview: [
      '$ boxceiver watch',
      '[*] RFID tap: AUTHORIZED',
      '[*] cam: snapshot captured',
      '[*] battery: 87% (solar)',
    ],
    links: [{ label: 'Details', href: '#' }],
  },
  {
    id: 'arsenal',
    title: 'ARSENAL',
    codename: 'BLACKVAULT',
    category: 'webapps',
    status: 'planned',
    summary: 'Local-hosted project vault with terminal UI.',
    description:
      'A planned local-hosted project vault with a dark terminal UI to catalog, search, and launch personal tooling and projects.',
    problem: 'Personal tools are scattered — there is no single launchpad to find and run them.',
    approach:
      'Plan a local web app (Vue + DRF) with a terminal-style UI to index, search, and launch projects.',
    features: ['Project catalog + search', 'Terminal-style UI', 'Quick-launch actions'],
    lessons: ['(planned)'],
    tech: ['Vue 3', 'Django REST', 'TypeScript'],
    skillIds: ['vue', 'typescript', 'drf'],
    terminalPreview: [
      '$ arsenal ls',
      '[*] indexing local projects...',
      '[planned] feature set WIP',
    ],
    links: [{ label: 'Soon', href: '#' }],
  },

  {
    id: 'vape-inventory',
    title: 'VapeStock',
    codename: 'STOCKROOM',
    category: 'webapps',
    status: 'completed',
    summary: 'Inventory checker for a vape shop.',
    description:
      'A web app for tracking vape shop inventory — monitoring stock levels, flavors, and devices, with low-stock alerts and quick lookups.',
    problem: 'Manual stock tracking leads to missed restocks and lost sales.',
    approach: 'Build a CRUD inventory system with search, categories, and low-stock notifications.',
    features: ['Stock level tracking', 'Low-stock alerts', 'Product search & categories'],
    lessons: ['what you learned'],
    tech: ['Vue 3', 'TypeScript', 'Tailwind'],
    skillIds: ['vue', 'typescript', 'tailwind'],
    terminalPreview: ['$ vapestock --check', '[*] loading inventory...', '[!] 3 items low on stock'],
    links: [{ label: 'Soon', href: '#' }],
  },
  {
    id: 'ancient-architecture-cards',
    title: 'Ancient Architectures',
    codename: 'MONOLITH',
    category: 'webapps',
    status: 'completed',
    summary: 'Info cards for ancient architectures.',
    description:
      'A web app presenting info cards about ancient architectures — showcasing historical structures with details, imagery, and interesting facts.',
    problem: 'Scattered historical info is hard to browse in one clean, visual place.',
    approach: 'Build a card-based gallery with filtering and detailed info views.',
    features: ['Info card gallery', 'Filter by era / region', 'Detailed structure views'],
    lessons: ['what you learned'],
    tech: ['Vue 3', 'TypeScript', 'Tailwind'],
    skillIds: ['vue', 'typescript', 'tailwind'],
    terminalPreview: ['$ ancient-arch --list', '[*] loading structures...', '[+] 24 cards ready'],
    links: [{ label: 'Soon', href: '#' }],
  },
  {
    id: 'cafe-menu-order',
    title: 'CafeOrder',
    codename: 'BARISTA',
    category: 'webapps',
    status: 'completed',
    summary: 'Menu and order checker for a cafe.',
    description:
      'A web app for a cafe to display its menu and manage orders — letting staff track items, build orders, and check order status.',
    problem: 'Paper menus and manual order tracking slow down service and cause mistakes.',
    approach: 'Build a digital menu with an order cart and order-status tracking.',
    features: ['Digital menu display', 'Order cart & builder', 'Order status tracking'],
    lessons: ['what you learned'],
    tech: ['Vue 3', 'TypeScript', 'Tailwind'],
    skillIds: ['vue', 'typescript', 'tailwind'],
    terminalPreview: ['$ cafeorder --new', '[*] loading menu...', '[+] order #42 placed'],
    links: [{ label: 'Soon', href: '#' }],
  },
  {
    id: 'line-follower',
    title: 'Line Follower Robot',
    codename: 'TRACKER',
    category: 'iot',
    status: 'planned',
    summary: 'Autonomous line-following robot.',
    description:
      'An autonomous robot that uses IR sensors to detect and follow a path, driving its motors to stay on the line.',
    problem: 'Describe the design goal / problem the robot solves.',
    approach: 'Describe the microcontroller, sensors, and control logic (e.g. PID).',
    features: ['IR line detection', 'Motor driver control', 'PID path correction'],
    lessons: ['what you learned'],
    tech: ['Arduino', 'IR Sensors', 'Motor Driver', 'C/C++'],
    skillIds: ['sensors'],
    terminalPreview: ['$ linefollower --run', '[*] calibrating IR sensors...', '[*] following line'],
    links: [{ label: 'Soon', href: '#' }],
  },
  {
    id: 'school-bukol',
    title: 'School Bukol',
    codename: 'CAMPUS-RUNNER',
    category: 'gamedev',
    status: 'completed',
    summary: 'A platformer about daily student life at Cagayan State University.',
    description:
      'A 2D platformer-style game that follows the daily life of a student at Cagayan State University — navigating classes, campus obstacles, and the everyday grind of student life.',
    problem:
      'Wanted to capture the relatable, often chaotic daily routine of a CSU student in a fun, playable form.',
    approach:
      'Design a 2D platformer with level-based campus environments, movement and jumping mechanics, and challenges inspired by real student experiences.',
    features: [
      'Platformer movement + jumping',
      'Campus-themed levels',
      'Daily student-life challenges',
    ],
    lessons: ['Translating everyday experiences into game mechanics.'],
    tech: ['Godot', 'GDScript'],
    skillIds: [],
    terminalPreview: ['$ school-bukol --start', '[*] loading campus...', '[*] spawning student'],
    links: [{ label: 'Soon', href: '#' }],
  },
]

export const projectCount = projects.length
