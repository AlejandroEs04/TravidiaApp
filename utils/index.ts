export const formatSimpleDate = (date: Date): string => {
  return new Intl.DateTimeFormat('us-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const formatCompleteDate = (dateString: string | null): string => {
  if (!dateString) return 'Sin fecha';

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('us-UD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
