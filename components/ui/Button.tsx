import { cn } from '@/lib/utils';

interface ButtonLinkProps {
  href: string;
  onClick?: never;
  external?: boolean;
}

interface ButtonClickProps {
  href?: never;
  onClick: () => void;
  external?: never;
}

type ButtonProps = (ButtonLinkProps | ButtonClickProps) & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function Button({
  children,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'group inline-flex items-center gap-2 font-medium px-6 py-3 transition-all cursor-pointer',
    variant === 'primary' &&
      'bg-accent text-background hover:bg-accent/85 active:bg-accent/75',
    variant === 'secondary' &&
      'border border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/5',
    className,
  );

  const arrow = variant === 'primary' && (
    <span
      className="inline-block transition-transform ease-out group-hover:translate-x-1"
      style={{ transitionDuration: 'var(--animate-duration-base)' }}
      aria-hidden="true"
    >
      &rarr;
    </span>
  );

  if ('onClick' in rest && rest.onClick) {
    return (
      <button
        type="button"
        onClick={rest.onClick}
        className={classes}
        style={{ transitionDuration: 'var(--animate-duration-base)' }}
      >
        <span>{children}</span>
        {arrow}
      </button>
    );
  }

  const { href, external } = rest as ButtonLinkProps;

  return (
    <a
      href={href}
      className={classes}
      style={{ transitionDuration: 'var(--animate-duration-base)' }}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span>{children}</span>
      {arrow}
    </a>
  );
}
