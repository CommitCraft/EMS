import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; 

export interface MachineTypeAttributes {
  id: number;
  name: string;
  code: string;
  category: 'Production' | 'Utility' | 'Testing' | 'Packaging';
  description?: string;
  status: 'Active' | 'Inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MachineTypeCreationAttributes extends Optional<MachineTypeAttributes, 'id' | 'status' | 'description'> {}

export class MachineType extends Model<MachineTypeAttributes, MachineTypeCreationAttributes> implements MachineTypeAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  public category!: 'Production' | 'Utility' | 'Testing' | 'Packaging';
  public description?: string;
  public status!: 'Active' | 'Inactive';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MachineType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.ENUM('Production', 'Utility', 'Testing', 'Packaging'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active',
    },
  },
  {
    sequelize,
    tableName: 'machine_types',
    timestamps: true,
    underscored: true,
  }
);

export default MachineType;