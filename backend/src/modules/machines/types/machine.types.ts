export interface IMachine {
  id?: number;
  name: string;
  code: string;
  plantId: number;
  lineId: number;
  serialNumber?: string;
  modelNumber?: string;
  operator?: string;
  capacity?: number;
  specifications?: string;
  description?: string;
  status: 'Active' | 'Inactive';
  plant?: {
    id: number;
    name: string;
    code: string;
  };
  line?: {
    id: number;
    name: string;
    code: string;
  };
}
