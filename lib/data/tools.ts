export interface Tool {
  name: string
  logo: string // filename in /images/logos/ (without extension)
}

export const tools: Tool[] = [
  // Languages & frameworks
  { name: 'TypeScript', logo: 'typescript' },
  { name: 'JavaScript', logo: 'javascript' },
  { name: 'React', logo: 'react' },
  { name: 'Next.js', logo: 'nextjs' },
  { name: 'HTML5', logo: 'html5' },
  { name: 'CSS3', logo: 'css3' },
  { name: 'Node.js', logo: 'nodejs' },
  { name: 'PHP', logo: 'php' },

  // Platforms & infrastructure
  { name: 'Supabase', logo: 'supabase' },
  { name: 'PostgreSQL', logo: 'postgresql' },
  { name: 'Vercel', logo: 'vercel' },
  { name: 'AWS', logo: 'aws' },
  { name: 'GitHub', logo: 'github' },
  { name: 'WordPress', logo: 'wordpress' },
  { name: 'Webflow', logo: 'webflow' },

  // Automation & integration
  { name: 'n8n', logo: 'n8n' },
  { name: 'REST APIs', logo: 'rest-apis' },
  { name: 'Claude AI', logo: 'anthropic' },
  { name: 'Zapier', logo: 'zapier' },

  // Business tools
  { name: 'Airtable', logo: 'airtable' },
  { name: 'HubSpot', logo: 'hubspot' },
  { name: 'Notion', logo: 'notion' },
  { name: 'QuickBooks', logo: 'quickbooks' },
  { name: 'Jira', logo: 'jira' },
  { name: 'Confluence', logo: 'confluence' },

  // IT & security
  { name: 'Kandji', logo: 'kandji' },
  { name: 'Google Workspace', logo: 'google-workspace' },
]
