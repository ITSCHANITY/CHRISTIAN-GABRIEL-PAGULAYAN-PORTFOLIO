import type { Profile } from '@/types'

export const profile: Profile = {

  fullName: 'CHRISTIAN GABRIEL PAGULAYAN',

  handle: 'ITSCHANITY',

  nickname: 'Ian',

  tagline: 'Computer Engineering Student | Cybersecurity & IoT Enthusiast',

  roles: [
    'Penetration Tester',
    'IoT Developer',
    'SOC Analyst',
    'Embedded Systems Engineer',
    'Security Researcher',
  ],

  university: {
    base: 'Cagayan State University',
    alias: 'CSU // CARIG CAMPUS',
  },

  course: 'BS Computer Engineering',

  org: {
    base: 'ICpEP.SE – CSU Chapter',
    alias: 'ICpEP.SE // DOCS & LEADERSHIP',
  },

  bioLines: [
    'Hi, I am Christian Gabriel Pagulayan — you can call me Ian.',
    'Computer Engineering student @ Cagayan State University, Carig Campus.',
    'I live in a Kali Linux terminal: scripting, breaking, and defending systems.',
    'Focus: cybersecurity, penetration testing, SOC / detection engineering,',
    'and embedded systems / IoT.',
    'Active member of ICpEP.SE – CSU Chapter (documentation & leadership support).',
    'Seeking internship and entry-level roles in security.',
  ],

  careerGoal: 'SOC / detection engineer and penetration tester',

  details: [
    { label: 'Education', value: 'BS Computer Engineering — CSU Carig Campus' },
    {
      label: 'Focus Areas',
      value: 'Cybersecurity · Penetration Testing · SOC / Detection · IoT',
    },
    { label: 'Current Goal', value: 'SOC / detection engineer and penetration tester' },
  ],

  currentlyLearning: ['SIEM', 'Detection Rules', 'MITRE ATT&CK'],

  email: 'cgabriel0919@gmail.com',

  cvUrl: '/cv/Christian-Gabriel-Pagulayan-CV.pdf',

  stats: [
    { label: 'projects built', value: 9, suffix: '+' },
    { label: 'tools written', value: 6 },
    { label: 'hardware builds', value: 2 },
  ],

  loader: {

    title: 'ITSCHANITY',

    subtitle: 'OPERATOR EDITION',

    assets: [
      'loading world: cagayan_valley',
      'compiling exploits',
      'spawning ESP32 nodes',
      'syncing MQTT broker',
      'injecting glitch shaders',
      'arming honeypots',
      'rendering terminal UI',
      'loading player: ITSCHANITY',
    ],

    startPrompt: 'PRESS ANY KEY TO START',
  },
}

