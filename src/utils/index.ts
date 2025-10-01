export function formatDate(dateStr:string):string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat("es-ES", {
    weekdat:"long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function formatCurrency(amount :string | number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
};

export function nullToEmptyString(arg: unknown) :string {
  return arg ?? "";
}
