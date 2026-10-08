import type { SkillGroup, SocialLink, Track } from './types'

// -------------------------------------------------------------------------
//  Identity / hero
// -------------------------------------------------------------------------
export const profile = {
  name: 'Ian',
  handle: 'ian',
  host: 'csu-sec',
  role: 'Security Engineer in Training',
  /** Rotating one-liners typed out in the hero. */
  taglines: [
    'SOC / detection engineering + penetration testing',
    'building offensive & defensive tooling',
    'embedded systems & IoT security',
  ],
  pitch:
    'Computer Engineering student focused on cybersecurity — I build the tools I want in a SOC, break things through pentesting, and secure the hardware layer with embedded/IoT projects.',
  location: 'Tuguegarao City, Cagayan, Philippines',
  status: 'Open to internships & security roles',
}

// -------------------------------------------------------------------------
//  About
// -------------------------------------------------------------------------
export const about = {
  intro: [
    "I'm a Computer Engineering student at Cagayan State University (Andrews Campus, Tuguegarao City), building toward a career in cybersecurity — specifically SOC / detection engineering and penetration testing.",
    'My work spans both sides of the fence: offensive tooling like web vulnerability scanners and honeypots, defensive tooling like malware/threat analyzers, and the hardware layer through ESP32-based IoT security projects.',
    'I like owning a problem end to end — from the packet on the wire to the dashboard a defender actually looks at.',
  ],
  facts: [
    { label: 'program', value: 'BS Computer Engineering' },
    {
      label: 'university',
      value: 'Cagayan State University — Andrews Campus',
    },
    { label: 'location', value: 'Tuguegarao City, Cagayan' },
    {
      label: 'org',
      value: 'ICpEP.SE — CSU Chapter (active member)',
    },
    {
      label: 'focus',
      value: 'SOC / detection engineering · pentesting · embedded/IoT',
    },
  ],
}

// -------------------------------------------------------------------------
//  Tracks
// -------------------------------------------------------------------------
export const tracks: Track[] = [
  {
    id: 'security',
    label: 'Cybersecurity',
    command: 'ls ./security-tooling',
    blurb: 'Offensive & defensive tooling — scanners, analyzers, honeypots.',
    accent: 'accent',
  },
  {
    id: 'embedded',
    label: 'Embedded / IoT',
    command: 'ls ./embedded-iot',
    blurb: 'ESP32 hardware, sensors, and secure IoT dashboards.',
    accent: 'cyan',
  },
  {
    id: 'web',
    label: 'Web Apps',
    command: 'ls ./web-apps',
    blurb: 'Full-stack web application development.',
    accent: 'amber',
  },
]

// -------------------------------------------------------------------------
//  Skills
// -------------------------------------------------------------------------
export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages & Frameworks',
    command: 'cat languages.txt',
    items: [
      'Python',
      'TypeScript',
      'Django REST Framework',
      'React',
      'Vue 3',
      'C / C++ (Arduino)',
    ],
  },
  {
    label: 'Offensive Security',
    command: 'which recon-tools',
    items: [
      'Kali Linux',
      'gobuster',
      'ffuf',
      'dirb',
      'Burp Suite',
      'Nmap',
      'web app pentesting',
    ],
  },
  {
    label: 'Defensive / Detection',
    command: 'cat blue-team.txt',
    items: [
      'YARA rules',
      'MITRE ATT&CK mapping',
      'malware triage',
      'honeypots',
      'threat intel (VirusTotal, MalwareBazaar)',
      'log/detection engineering',
    ],
  },
  {
    label: 'Embedded & Hardware',
    command: 'lsusb --hardware',
    items: [
      'ESP32 / ESP32-CAM',
      'MQTT',
      'fingerprint & RFID modules',
      'barcode scanning',
      'Fritzing',
      'Cirkit Designer',
    ],
  },
]

// -------------------------------------------------------------------------
//  Contact / socials
//  NOTE: placeholder hrefs — swap in real URLs before deploying.
// -------------------------------------------------------------------------
export const socials: SocialLink[] = [
  {
    label: 'Email',
    handle: 'ian@example.com',
    href: 'mailto:ian@example.com',
    icon: 'mail',
  },
  {
    label: 'GitHub',
    handle: 'github.com/your-handle',
    href: 'https://github.com/',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/your-handle',
    href: 'https://linkedin.com/',
    icon: 'linkedin',
  },
]
