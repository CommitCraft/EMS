import { Request, Response } from 'express';
import { MachineCategory } from './index';

export const getMachineCategories = async (req: Request, res: Response) => {
  try {
    const categories = await MachineCategory.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine categories', error });
  }
};

export const getMachineCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await MachineCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Machine category not found' });
    }
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching machine category', error });
  }
};

export const createMachineCategory = async (req: Request, res: Response) => {
  try {
    const category = await MachineCategory.create(req.body);
    res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Category name or code already exists' });
    }
    res.status(500).json({ message: 'Error creating machine category', error });
  }
};

export const updateMachineCategory = async (req: Request, res: Response) => {
  try {
    const category = await MachineCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Machine category not found' });
    }
    await category.update(req.body);
    res.status(200).json({ message: 'Category updated successfully', data: category });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Category name or code already exists' });
    }
    res.status(500).json({ message: 'Error updating machine category', error });
  }
};

export const deleteMachineCategory = async (req: Request, res: Response) => {
  try {
    const category = await MachineCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Machine category not found' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting machine category', error });
  }
};