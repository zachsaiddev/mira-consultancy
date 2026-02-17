import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  /** 'primary' = filled accent button. 'secondary' = outlined accent button. */
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
        'inline-flex items-center gap-2 font-medium px-6 py-3 transition-all',
        variant === 'primary' &&
          'bg-accent text-background hover:bg-accent/85 active:bg-accent/75',
        variant === 'secondary' &&
          'border border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/5',
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
