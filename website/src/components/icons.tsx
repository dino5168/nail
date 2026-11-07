// 粉色實心圖示（為什麼選擇我們、聯絡資訊等）
type IconProps = { className?: string };

export function PolishIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 6l1.6 4.4L16 12l-4.4 1.6L10 18l-1.6-4.4L4 12l4.4-1.6z" />
      <rect x="30" y="18" width="22" height="10" rx="2" />
      <rect x="20" y="20" width="12" height="6" rx="1" />
      <path d="M12 30h22a4 4 0 014 4v20a6 6 0 01-6 6H14a6 6 0 01-6-6V34a4 4 0 014-4z" />
      <path d="M18 30v-4a5 5 0 0110 0v4" fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

export function PerfumeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="46" cy="14" r="6" />
      <path d="M26 10h12v6H26z" />
      <path d="M38 12h4" stroke="currentColor" strokeWidth="3" />
      <rect x="24" y="16" width="16" height="8" rx="2" />
      <path d="M32 24c13 0 22 8 22 19 0 9-7 15-16 15H26c-9 0-16-6-16-15 0-11 9-19 22-19z" />
    </svg>
  );
}

export function CertificateIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 8h16a4 4 0 014 4v4h-6v-2H26v2h-6v-4a4 4 0 014-4z" />
      <path d="M8 20h48a4 4 0 014 4v8H4v-8a4 4 0 014-4zM4 36h22v4h12v-4h22v18a4 4 0 01-4 4H8a4 4 0 01-4-4z" />
      <circle cx="32" cy="36" r="5" fill="#fff" />
      <circle cx="32" cy="36" r="2.5" />
    </svg>
  );
}

export function SpaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M32 6c10 0 18 8 18 18v4H14v-4c0-10 8-18 18-18z" />
      <path d="M22 14l14 14M30 10l16 16" stroke="#fff" strokeWidth="2.5" opacity="0.7" />
      <rect x="10" y="32" width="44" height="8" rx="2" />
      <rect x="14" y="40" width="12" height="8" rx="1" />
      <rect x="38" y="40" width="12" height="8" rx="1" />
      <path d="M16 48v10M24 48v10M40 48v10M48 48v10" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.7 6.2L5 21l4.2-2.3c.9.2 1.8.3 2.8.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
