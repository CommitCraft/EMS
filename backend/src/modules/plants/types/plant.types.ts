export interface IPlant {
  id?: number;
  name: string;
  code: string;
  location: string;
  manager?: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

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

export interface IShift {
  id?: number;
  name: string;
  startTime: string;
  endTime: string;
  duration: number;
  description?: string;
  status: 'Active' | 'Inactive';
}
