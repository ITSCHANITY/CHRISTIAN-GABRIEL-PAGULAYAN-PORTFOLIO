import type { Project } from './types'

// -------------------------------------------------------------------------
//  Projects
//  To add a project: append an object here with a unique `id` and a `track`
//  of 'security' | 'embedded' | 'web'. The UI updates automatically.
// -------------------------------------------------------------------------
export const projects: Project[] = [
  // ===================== TRACK 1 — CYBERSECURITY =========================
  {
    id: 'wiretap',
    track: 'security',
    name: 'WIRETAP',
    tagline: 'Multi-protocol honeypot suite with a live Flask dashboard',
    status: 'active',
    period: '2025',
    featured: true,
    stack: ['Python', 'Flask', 'SQLite', 'WebSockets', 'Docker'],
    summary:
      'A deception platform that stands up decoy services across multiple protocols, captures attacker interactions, and streams them to a real-time dashboard for triage.',
    highlights: [
      'Emulates multiple protocol services (SSH, HTTP, FTP-style) as low-interaction honeypots to lure and log attacker activity.',
      'Central Flask dashboard aggregates events in real time — source IPs, credentials tried, payloads, and session timelines.',
      'Structured event logging designed for downstream detection engineering and threat-intel enrichment.',
      'Containerized for safe, disposable deployment so decoys can be spun up and torn down quickly.',
    ],
    links: [{ label: 'Case study', href: '#', icon: 'external' }],
  },
  {
    id: 'threatscan',
    track: 'security',
    name: 'ThreatScan',
    tagline: 'Malware & threat analyzer — YARA, entropy, MITRE ATT&CK, threat intel',
    status: 'active',
    period: '2025',
    featured: true,
    stack: ['Python', 'YARA', 'VirusTotal API', 'MalwareBazaar', 'MITRE ATT&CK'],
    summary:
      'A static malware triage tool that fingerprints suspicious files, runs YARA detections, computes entropy, and enriches findings against threat-intel sources — mapping results to ATT&CK.',
    highlights: [
      'Runs YARA rule matching and byte-entropy analysis to flag packing/obfuscation and known malicious patterns.',
      'Enriches indicators via VirusTotal and MalwareBazaar lookups for reputation and family attribution.',
      'Maps observed behaviors and detections to MITRE ATT&CK techniques for analyst-ready context.',
      'Produces a consolidated triage report to speed up "is this malicious?" decisions.',
    ],
    links: [{ label: 'Repo', href: '#', icon: 'github' }],
  },
  {
    id: 'webscan',
    track: 'security',
    name: 'WebScan',
    tagline: 'Python web vulnerability scanner',
    status: 'active',
    period: '2024–25',
    stack: ['Python', 'requests', 'BeautifulSoup', 'asyncio'],
    summary:
      'An automated web application vulnerability scanner that crawls a target and probes for common web weaknesses, producing a prioritized findings report.',
    highlights: [
      'Crawls target applications and tests for common OWASP-style issues (injection points, misconfigurations, exposed endpoints).',
      'Modular check design so new vulnerability signatures can be added independently.',
      'Generates a readable report with severity and evidence for each finding.',
    ],
    links: [{ label: 'Repo', href: '#', icon: 'github' }],
  },
  {
    id: 'storage-checker',
    track: 'security',
    name: 'Storage Checker',
    tagline: 'Disk hygiene & dependency checker',
    status: 'active',
    period: '2024',
    stack: ['Python', 'CLI'],
    summary:
      'A utility that audits disk usage and project dependencies to keep dev environments clean, lean, and free of stale or vulnerable packages.',
    highlights: [
      'Scans for large/redundant files and reports disk-hygiene issues.',
      'Inspects project dependencies to surface bloat and outdated packages.',
      'Lightweight CLI workflow for quick, repeatable environment audits.',
    ],
  },
  {
    id: 'passgen-passman',
    track: 'security',
    name: 'passgen / passman',
    tagline: 'Password generator & manager pair',
    status: 'active',
    period: '2024',
    stack: ['Python', 'cryptography', 'CLI'],
    summary:
      'A companion pair of tools: a configurable strong-password generator and a local password manager focused on secure storage practices.',
    highlights: [
      'passgen produces high-entropy passwords with configurable character policies.',
      'passman stores credentials locally with encryption-first handling.',
      'Built to explore secure secret-handling patterns hands-on.',
    ],
  },

  // ===================== TRACK 2 — EMBEDDED / IOT ========================
  {
    id: 'sentriq',
    track: 'embedded',
    name: 'Sentriq',
    tagline: 'IoT smart campus equipment locker — thesis project',
    status: 'thesis',
    period: '2025',
    featured: true,
    stack: [
      'ESP32',
      'Fingerprint sensor',
      'Barcode scanner',
      'MQTT',
      'Tamper detection',
    ],
    summary:
      'A secure smart locker system for managing shared campus equipment — combining biometric + barcode authentication, tamper detection, and a live MQTT dashboard. My Computer Engineering thesis project.',
    highlights: [
      'Dual-factor access: fingerprint authentication plus barcode scanning to check equipment in and out.',
      'Tamper-detection sensors raise alerts on unauthorized access attempts.',
      'ESP32 nodes publish events over MQTT to a central dashboard for real-time monitoring and audit logging.',
      'Designed for campus deployment — accountability and traceability for shared lab/equipment inventory.',
      'Evolution of the earlier Boxceiver platform, hardened for a multi-user institutional setting.',
    ],
    links: [{ label: 'Case study', href: '#', icon: 'external' }],
  },
  {
    id: 'boxceiver',
    track: 'embedded',
    name: 'Boxceiver',
    tagline: 'IoT smart parcel vault — Sentriq predecessor',
    status: 'archived',
    period: '2024',
    stack: ['ESP32-CAM', 'RFID', 'Solar + Li-ion hybrid power', 'IoT'],
    summary:
      'A self-powered smart parcel vault that authenticates deliveries via RFID, captures photo evidence with an ESP32-CAM, and runs on a solar/lithium hybrid power system for off-grid operation.',
    highlights: [
      'RFID-based authentication to authorize parcel drop-off and retrieval.',
      'ESP32-CAM captures photo evidence of each delivery event.',
      'Solar + lithium hybrid power design for standalone, off-grid deployment.',
      'Served as the R&D foundation that led to the Sentriq thesis project.',
    ],
  },

  // ===================== TRACK 3 — WEB APPS ==============================
  // Placeholder entries — replace/extend as web projects ship.
  {
    id: 'web-placeholder',
    track: 'web',
    name: 'Next build incoming',
    tagline: 'Space reserved for full-stack web app projects',
    status: 'planned',
    stack: ['Django REST Framework', 'Vue 3', 'TypeScript'],
    summary:
      'This track is where full-stack web application projects will live — built on Django REST Framework back ends with Vue/React front ends. New entries drop in here as they ship.',
    highlights: [
      'Planned focus: security-conscious web apps with clean APIs and typed front ends.',
      'Add a project by appending an entry to src/data/projects.ts with track: "web".',
    ],
  },
]
