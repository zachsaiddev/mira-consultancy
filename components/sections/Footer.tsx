import { LinkedInIcon, GitHubIcon, EmailIcon } from '@/components/icons'

export function Footer() {
  return (
    <footer className="border-t border-accent/15 py-8">
      <div className="prose-width">
        {/* Row 1: Copyright and location */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 text-[0.65rem] text-text-tertiary">
          <p>&copy; 2026 Mira Consultancy</p>
          <p>London, UK</p>
        </div>

        {/* Row 2: Social icon links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/zachsaid/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/zachsaiddev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@buildwithmira.co.uk"
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Email contact"
          >
            <EmailIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
