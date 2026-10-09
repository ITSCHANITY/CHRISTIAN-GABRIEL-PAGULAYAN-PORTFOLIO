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
    features: [
      'Async endpoint crawling',
      'Access-control / RLS checks',
      'JSON report output',
    ],
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
    skillIds: ['vue', 'typescript', 'javascript', 'drf'],
    terminalPreview: ['$ arsenal ls', '[*] indexing local projects...', '[planned] feature set WIP'],
    links: [{ label: 'Soon', href: '#' }],
  },

  {
    id: 'webapp-placeholder',
    title: 'Web App — Coming Soon',
    codename: 'UNNAMED-WEB',
    category: 'webapps',
    status: 'planned',
    summary: 'Placeholder for a future web application.',
    description: 'Replace this with a real web app project.',
    problem: 'Describe the problem your web app solves.',
    approach: 'Describe the stack and approach.',
    features: ['feature one', 'feature two'],
    lessons: ['what you learned'],
    tech: ['Vue', 'TypeScript', 'Tailwind'],
    skillIds: ['vue', 'typescript', 'react', 'tailwind'],
    terminalPreview: ['$ echo "coming soon"', 'coming soon'],
    links: [{ label: 'Soon', href: '#' }],
  },
  {
    id: 'gamedev-placeholder',
    title: 'Game — Coming Soon',
    codename: 'UNNAMED-GAME',
    category: 'gamedev',
    status: 'planned',
    summary: 'Placeholder for a future game dev project.',
    description: 'Replace this with a real game: engine, genre, mechanics, and a link to play.',
    problem: 'Describe the design pillar / problem.',
    approach: 'Describe the engine and mechanics.',
    features: ['core loop', 'mechanic two'],
    lessons: ['what you learned'],
    tech: ['Godot', 'GDScript'],
    skillIds: [],
    terminalPreview: ['$ game --new', '[planned] loading assets...'],
    links: [{ label: 'Soon', href: '#' }],
  },
]

export const projectCount = projects.length
