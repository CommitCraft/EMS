import { Request, Response } from 'express';
import { MachineSpecification } from './index';

export const getMachineSpecs = async (req: Request, res: Response) => {
  try {
    const specs = await MachineSpecification.findAll({ 
      include: ['specificationType'],
      order: [['createdAt', 'DESC']] 
    });
    res.status(200).json({ data: specs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine specifications', error });
  }
};

export const getMachineSpecById = async (req: Request, res: Response) => {
  try {
    const spec = await MachineSpecification.findByPk(req.params.id, {
      include: ['specificationType']
    });
    if (!spec) {
      return res.status(404).json({ message: 'Machine specification not found' });
    }
    res.status(200).json({ data: spec });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine specification', error });
  }
};

export const createMachineSpec = async (req: Request, res: Response) => {
  try {
    const spec = await MachineSpecification.create(req.body);
    const fullSpec = await MachineSpecification.findByPk(spec.id, {
      include: ['specificationType']
    });
    res.status(201).json({ message: 'Machine specification created successfully', data: fullSpec });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Machine specification name or code already exists' });
    }
    res.status(500).json({ message: 'Error creating machine specification', error });
  }
};

export const updateMachineSpec = async (req: Request, res: Response) => {
  try {
    const spec = await MachineSpecification.findByPk(req.params.id);
    if (!spec) {
      return res.status(404).json({ message: 'Machine specification not found' });
    }
    await spec.update(req.body);
    const fullSpec = await MachineSpecification.findByPk(spec.id, {
      include: ['specificationType']
    });
    res.status(200).json({ message: 'Machine specification updated successfully', data: fullSpec });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Machine specification name or code already exists' });
    }
    res.status(500).json({ message: 'Error updating machine specification', error });
  }
};

export const deleteMachineSpec = async (req: Request, res: Response) => {
  try {
    const spec = await MachineSpecification.findByPk(req.params.id);
    if (!spec) {
      return res.status(404).json({ message: 'Machine specification not found' });
    }
    await spec.destroy();
    res.status(200).json({ message: 'Machine specification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting machine specification', error });
  }
};