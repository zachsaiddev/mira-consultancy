import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  /** 'primary' = accent color with arrow. 'secondary' = muted text, no arrow. */
  variant?: 'primary' | 'secondary';
  className?: string;
  /** Opens link in new tab. Default false. */
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-medium transition-colors',
        variant === 'primary' && 'text-accent hover:text-accent/80',
        variant === 'secondary' &&
          'text-text-secondary hover:text-text-primary link-underline',
        className,
      )}
      style={{ transitionDuration: 'var(--animate-duration-base)' }}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span>{children}</span>
      {variant === 'primary' && (
        <span
          className="inline-block transition-transform ease-out group-hover:translate-x-1"
          style={{ transitionDuration: 'var(--animate-duration-base)' }}
          aria-hidden="true"
        >
          &rarr;
        </span>
      )}
    </a>
  );
}
