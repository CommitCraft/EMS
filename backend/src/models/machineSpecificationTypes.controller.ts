import { Request, Response } from 'express';
import { MachineSpecificationType } from './index';

export const getMachineSpecTypes = async (req: Request, res: Response) => {
  try {
    const types = await MachineSpecificationType.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ data: types });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine specification types', error });
  }
};

export const getMachineSpecTypeById = async (req: Request, res: Response) => {
  try {
    const type = await MachineSpecificationType.findByPk(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Machine specification type not found' });
    }
    res.status(200).json({ data: type });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine specification type', error });
  }
};

export const createMachineSpecType = async (req: Request, res: Response) => {
  try {
    const type = await MachineSpecificationType.create(req.body);
    res.status(201).json({ message: 'Specification type created successfully', data: type });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Type name or code already exists' });
    }
    res.status(500).json({ message: 'Error creating machine specification type', error });
  }
};

export const updateMachineSpecType = async (req: Request, res: Response) => {
  try {
    const type = await MachineSpecificationType.findByPk(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Machine specification type not found' });
    }
    await type.update(req.body);
    res.status(200).json({ message: 'Specification type updated successfully', data: type });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Type name or code already exists' });
    }
    res.status(500).json({ message: 'Error updating machine specification type', error });
  }
};

export const deleteMachineSpecType = async (req: Request, res: Response) => {
  try {
    const type = await MachineSpecificationType.findByPk(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Machine specification type not found' });
    }
    await type.destroy();
    res.status(200).json({ message: 'Specification type deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting machine specification type', error });
  }
};