export interface ILine {
  id?: number;
  name: string;
  code: string;
  plantId: number;
  supervisor?: string;
  capacity?: number;
  description?: string;
  status: 'Active' | 'Inactive';
  plant?: {
    id: number;
    name: string;
    code: string;
  };
}
