export default function sortDate(a: {date: number; students: []}, b: {date: number; students: []}): any {
  return a.date - b.date;
}
