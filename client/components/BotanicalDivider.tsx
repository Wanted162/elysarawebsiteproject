export function BotanicalDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${light ? "text-primary-foreground/50" : "text-primary/50"}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current" />
      <svg width="54" height="20" viewBox="0 0 54 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 18C27 11 23 5 15 2M27 18C27 10 32 5 40 2M27 12C23 10 19 9 15 10M27 10C31 8 35 8 39 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M15 2C17 5 16 8 13 9C11 7 11 4 15 2ZM40 2C38 5 39 8 42 9C44 7 44 4 40 2Z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
