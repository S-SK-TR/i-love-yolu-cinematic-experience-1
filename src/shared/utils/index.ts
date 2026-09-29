export function isEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '';
}

export function formatDate(date: Date, locale: string = 'tr-TR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
