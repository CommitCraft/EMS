import { Request, Response } from 'express';
import { MachineType } from './index';

export const getMachineTypes = async (req: Request, res: Response) => {
  try {
    const machineTypes = await MachineType.findAll({ 
      include: ['category'],
      order: [['createdAt', 'DESC']] 
    });
    res.status(200).json({ data: machineTypes });
  } catch (error) {
    console.error('Error fetching machine types:', error);
    res.status(500).json({ message: 'Error fetching machine types', error });
  }
};

export const getMachineTypeById = async (req: Request, res: Response) => {
  try {
    const machineType = await MachineType.findByPk(req.params.id, {
      include: ['category']
    });
    if (!machineType) {
      return res.status(404).json({ message: 'Machine type not found' });
    }
    res.status(200).json({ data: machineType });
  } catch (error) {
    console.error('Error fetching machine type by ID:', error);
    res.status(500).json({ message: 'Error fetching machine type', error });
  }
};

export const createMachineType = async (req: Request, res: Response) => {
  try {
    const machineType = await MachineType.create(req.body);
    const fullMachineType = await MachineType.findByPk(machineType.id, {
      include: ['category']
    });
    res.status(201).json({ message: 'Machine type created successfully', data: fullMachineType });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Machine type name or code already exists' });
    }
    console.error('Error creating machine type:', error);
    res.status(500).json({ message: 'Error creating machine type', error });
  }
};

export const updateMachineType = async (req: Request, res: Response) => {
  try {
    const machineType = await MachineType.findByPk(req.params.id);
    if (!machineType) {
      return res.status(404).json({ message: 'Machine type not found' });
    }
    await machineType.update(req.body);
    const fullMachineType = await MachineType.findByPk(machineType.id, {
      include: ['category']
    });
    res.status(200).json({ message: 'Machine type updated successfully', data: fullMachineType });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Machine type name or code already exists' });
    }
    console.error('Error updating machine type:', error);
    res.status(500).json({ message: 'Error updating machine type', error });
  }
};

export const deleteMachineType = async (req: Request, res: Response) => {
  try {
    const machineType = await MachineType.findByPk(req.params.id);
    if (!machineType) {
      return res.status(404).json({ message: 'Machine type not found' });
    }
    await machineType.destroy();
    res.status(200).json({ message: 'Machine type deleted successfully' });
  } catch (error) {
    console.error('Error deleting machine type:', error);
    res.status(500).json({ message: 'Error deleting machine type', error });
  }
};