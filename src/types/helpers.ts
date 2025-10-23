// Helper functions for formatting data

export function getGenderLabel(gender: string): string {
  const genderMap: { [key: string]: string } = {
    'M': 'Male',
    'F': 'Female',
    'O': 'Other',
    'N': 'Non-binary',
    'PREFER_NOT_TO_SAY': 'Prefer not to say'
  };
  return genderMap[gender] || gender;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}
