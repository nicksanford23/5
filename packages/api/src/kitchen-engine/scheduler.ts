export interface MenuItem {
  id: string;
  station: string;
  cookTime: number; // seconds
}

export interface OrderLine {
  id: string;
  qty: number;
}

export interface ScheduledLine extends OrderLine {
  fireAt: Date | null;
}

export function scheduleOrder(
  lines: OrderLine[],
  menu: MenuItem[],
): ScheduledLine[] {
  // super-simple: fire everything now
  const now = new Date();
  return lines.map(l => ({ ...l, fireAt: now }));
}
