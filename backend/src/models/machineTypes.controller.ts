import { Request, Response } from 'express';
import { MachineType } from './index';

export const getMachineTypes = async (req: Request, res: Response) => {
  try {
    const machineTypes = await MachineType.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ data: machineTypes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine types', error });
  }
};

export const getMachineTypeById = async (req: Request, res: Response) => {
  try {
    const machineType = await MachineType.findByPk(req.params.id);
    if (!machineType) {
      return res.status(404).json({ message: 'Machine type not found' });
    }
    res.status(200).json({ data: machineType });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine type', error });
  }
};

export const createMachineType = async (req: Request, res: Response) => {
  try {
    const machineType = await MachineType.create(req.body);
    res.status(201).json({ message: 'Machine type created successfully', data: machineType });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Machine type name or code already exists' });
    }
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
    res.status(200).json({ message: 'Machine type updated successfully', data: machineType });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Machine type name or code already exists' });
    }
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
    res.status(500).json({ message: 'Error deleting machine type', error });
  }
};