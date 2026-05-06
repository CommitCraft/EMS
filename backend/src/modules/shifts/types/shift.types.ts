export interface IShift {
  id?: number;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  description?: string;
  status: 'Active' | 'Inactive';
}
