export const formatDate = (value: string) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${day}/${month}/${year}`;
}