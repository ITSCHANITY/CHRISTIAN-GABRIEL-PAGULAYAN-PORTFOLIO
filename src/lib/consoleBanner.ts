import { profile } from '@/data/profile'
import { socials } from '@/data/socials'

export function printConsoleBanner(): void {
  const brand = 'color:#e11d48;font-weight:bold;font-size:14px'
  const dim = 'color:#8b8b96'
  const link = 'color:#22d3ee'

  console.log(
    `%c${profile.handle} %c// ${profile.fullName}\n` +
      `%c${profile.tagline}\n\n` +
      `%cLooking for someone? I'm open to internships & entry-level security roles.\n` +
      `%c${profile.email}`,
    brand,
    dim,
    dim,
    'color:#e11d48',
    link,
  )

  socials.forEach((s) => {

    console.log(`%c${s.id.padEnd(9)}%c${s.href}`, dim, link)
  })
}
