const toDate = (iso: string): Date => {
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!dateOnly) {
    return new Date(iso)
  }

  const year = Number(dateOnly[1])
  const month = Number(dateOnly[2])
  const day = Number(dateOnly[3])
  return new Date(year, month - 1, day)
}

export const formatMediumDate = (iso: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(toDate(iso))

export const formatMonthShort = (iso: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'short' }).format(toDate(iso))

export const formatDayOfMonth = (iso: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(toDate(iso))

export const formatTime = (iso: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(toDate(iso))

export const formatAmount = (
  amount: number,
  locale: string,
  currency: string,
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
