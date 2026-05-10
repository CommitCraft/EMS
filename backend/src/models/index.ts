import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

class RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string | null;
  declare permissions?: PermissionModel[];
}

class PermissionModel extends Model<InferAttributes<PermissionModel>, InferCreationAttributes<PermissionModel>> {
  declare id: CreationOptional<number>;
  declare module: string;
  declare action: string;
  declare name: string;
  declare description: string | null;
}

class RolePermissionModel extends Model<InferAttributes<RolePermissionModel>, InferCreationAttributes<RolePermissionModel>> {
  declare id: CreationOptional<number>;
  declare roleId: number;
  declare permissionId: number;
}

class DepartmentModel extends Model<InferAttributes<DepartmentModel>, InferCreationAttributes<DepartmentModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare manager: string | null;
  declare description: string | null;
  declare status: string;
}

class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare username: string;
  declare email: string;
  declare mobile: string | null;
  declare profileImage: string | null;
  declare password: string;
  declare roleId: number;
  declare departmentId: number | null;
  declare status: string;
  declare refreshTokenHash: string | null;
  declare passwordResetToken: string | null;
  declare passwordResetExpiresAt: Date | null;
  declare lastLoginAt: Date | null;
  declare role?: RoleModel;
  declare department?: DepartmentModel;
}

class SmtpSettingModel extends Model<InferAttributes<SmtpSettingModel>, InferCreationAttributes<SmtpSettingModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare host: string;
  declare port: number;
  declare secure: boolean;
  declare username: string;
  declare password: string;
  declare fromEmail: string;
  declare fromName: string | null;
  declare isActive: boolean;
}

class StorageSettingModel extends Model<InferAttributes<StorageSettingModel>, InferCreationAttributes<StorageSettingModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare provider: string;
  declare basePath: string | null;
  declare bucketName: string | null;
  declare region: string | null;
  declare endpoint: string | null;
  declare accessKey: string | null;
  declare secretKey: string | null;
  declare isActive: boolean;
  declare isDefault: boolean;
}

class CompanyProfileModel extends Model<InferAttributes<CompanyProfileModel>, InferCreationAttributes<CompanyProfileModel>> {
  declare id: CreationOptional<number>;
  declare companyTitle: string;
  declare logoUrl: string | null;
  declare faviconUrl: string | null;
  declare bannerUrl: string | null;
  declare isActive: boolean;
  declare isDefault: boolean;
}

class ActivityLogModel extends Model<InferAttributes<ActivityLogModel>, InferCreationAttributes<ActivityLogModel>> {
  declare id: CreationOptional<number>;
  declare userId: number | null;
  declare entity: string;
  declare entityId: number | null;
  declare action: string;
  declare description: string;
  declare meta: string | null;
}

class PlantModel extends Model<InferAttributes<PlantModel>, InferCreationAttributes<PlantModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare location: string;
  declare manager: string | null;
  declare description: string | null;
  declare status: string;
}

class LineModel extends Model<InferAttributes<LineModel>, InferCreationAttributes<LineModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare plantId: number;
  declare supervisor: string | null;
  declare capacity: number | null;
  declare specifications: string | null;
  declare description: string | null;
  declare status: string;
  declare plant?: PlantModel;
}

class ShiftModel extends Model<InferAttributes<ShiftModel>, InferCreationAttributes<ShiftModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare startTime: string;
  declare endTime: string;
  declare duration: number;
  declare description: string | null;
  declare status: string;
}

class MachineModel extends Model<InferAttributes<MachineModel>, InferCreationAttributes<MachineModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare plantId: number;
  declare machineTypeId: number | null;
  declare lineId: number;
  declare serialNumber: string | null;
  declare modelNumber: string | null;
  declare operator: string | null;
  declare capacity: number | null;
  declare machineSpecId: number | null;
  declare specifications: string | null;
  declare description: string | null;
  declare status: string;
  declare plant?: PlantModel;
  declare line?: LineModel;
  declare machineType?: MachineTypeModel;
  declare machineSpec?: MachineSpecificationModel;
}

class SupplierModel extends Model<InferAttributes<SupplierModel>, InferCreationAttributes<SupplierModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare email: string | null;
  declare phone: string | null;
  declare address: string | null;
  declare city: string | null;
  declare country: string | null;
  declare contactPerson: string | null;
  declare paymentTerms: string | null;
  declare rating: number | null;
  declare description: string | null;
  declare status: string;
}

class MachineTypeModel extends Model<InferAttributes<MachineTypeModel>, InferCreationAttributes<MachineTypeModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare categoryId: number | null;
  declare description: string | null;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare category?: MachineCategoryModel;
}

class MachineSpecificationModel extends Model<InferAttributes<MachineSpecificationModel>, InferCreationAttributes<MachineSpecificationModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare typeId: number | null;
  declare uom: string | null;
  declare description: string | null;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare specificationType?: MachineSpecificationTypeModel;
}

class MachineSpecificationTypeModel extends Model<InferAttributes<MachineSpecificationTypeModel>, InferCreationAttributes<MachineSpecificationTypeModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare description: string | null;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

class MachineCategoryModel extends Model<InferAttributes<MachineCategoryModel>, InferCreationAttributes<MachineCategoryModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare code: string;
  declare description: string | null;
  declare status: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const initModels = (sequelizeInstance: Sequelize) => {
  RoleModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize: sequelizeInstance, tableName: 'roles' },
  );

  PermissionModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      module: { type: DataTypes.STRING(100), allowNull: false },
      action: { type: DataTypes.STRING(100), allowNull: false },
      name: { type: DataTypes.STRING(200), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize: sequelizeInstance, tableName: 'permissions' },
  );

  RolePermissionModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'role_id' },
      permissionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'permission_id' },
    },
    { sequelize: sequelizeInstance, tableName: 'role_permissions' },
  );

  DepartmentModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      manager: { type: DataTypes.STRING(150), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'departments' },
  );

  UserModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false },
      username: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(180), allowNull: false, unique: true },
      mobile: { type: DataTypes.STRING(30), allowNull: true },
      profileImage: { type: DataTypes.STRING(500), allowNull: true, field: 'profile_image' },
      password: { type: DataTypes.STRING(255), allowNull: false },
      roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'role_id' },
      departmentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'department_id' },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
      refreshTokenHash: { type: DataTypes.STRING(255), allowNull: true, field: 'refresh_token_hash' },
      passwordResetToken: { type: DataTypes.STRING(255), allowNull: true, field: 'password_reset_token' },
      passwordResetExpiresAt: { type: DataTypes.DATE, allowNull: true, field: 'password_reset_expires_at' },
      lastLoginAt: { type: DataTypes.DATE, allowNull: true, field: 'last_login_at' },
    },
    { sequelize: sequelizeInstance, tableName: 'users' },
  );

  SmtpSettingModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      host: { type: DataTypes.STRING(255), allowNull: false },
      port: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 587 },
      secure: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      username: { type: DataTypes.STRING(255), allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      fromEmail: { type: DataTypes.STRING(255), allowNull: false, field: 'from_email' },
      fromName: { type: DataTypes.STRING(255), allowNull: true, field: 'from_name' },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
    },
    { sequelize: sequelizeInstance, tableName: 'smtp_settings' },
  );

  StorageSettingModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      provider: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'local' },
      basePath: { type: DataTypes.STRING(255), allowNull: true, field: 'base_path' },
      bucketName: { type: DataTypes.STRING(255), allowNull: true, field: 'bucket_name' },
      region: { type: DataTypes.STRING(100), allowNull: true },
      endpoint: { type: DataTypes.STRING(500), allowNull: true },
      accessKey: { type: DataTypes.STRING(255), allowNull: true, field: 'access_key' },
      secretKey: { type: DataTypes.STRING(255), allowNull: true, field: 'secret_key' },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
      isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_default' },
    },
    { sequelize: sequelizeInstance, tableName: 'storage_settings' },
  );

  CompanyProfileModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      companyTitle: {
        type: DataTypes.STRING(180),
        allowNull: false,
        defaultValue: 'QMS - Quality Management System',
        field: 'company_title',
      },
      logoUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'logo_url' },
      faviconUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'favicon_url' },
      bannerUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'banner_url' },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
      isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_default' },
    },
    { sequelize: sequelizeInstance, tableName: 'company_profiles' },
  );

  ActivityLogModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'user_id' },
      entity: { type: DataTypes.STRING(150), allowNull: false },
      entityId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'entity_id' },
      action: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      meta: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize: sequelizeInstance, tableName: 'activity_logs' },
  );

  PlantModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      location: { type: DataTypes.STRING(200), allowNull: false },
      manager: { type: DataTypes.STRING(150), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'plants' },
  );

  LineModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false },
      code: { type: DataTypes.STRING(50), allowNull: false },
      plantId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'plant_id' },
      supervisor: { type: DataTypes.STRING(150), allowNull: true },
      capacity: { type: DataTypes.INTEGER, allowNull: true },
      specifications: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'lines' },
  );

  ShiftModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      startTime: { type: DataTypes.STRING(8), allowNull: false, field: 'start_time' },
      endTime: { type: DataTypes.STRING(8), allowNull: false, field: 'end_time' },
      duration: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'shifts' },
  );

  MachineModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false },
      code: { type: DataTypes.STRING(60), allowNull: false, unique: true },
      plantId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'plant_id' },
      machineTypeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'machine_type_id' },
      lineId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'line_id' },
      serialNumber: { type: DataTypes.STRING(120), allowNull: true, field: 'serial_number' },
      modelNumber: { type: DataTypes.STRING(120), allowNull: true, field: 'model_number' },
      operator: { type: DataTypes.STRING(150), allowNull: true },
      capacity: { type: DataTypes.INTEGER, allowNull: true },
      machineSpecId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'machine_spec_id' },
      specifications: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'machines' },
  );

  SupplierModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(180), allowNull: true },
      phone: { type: DataTypes.STRING(30), allowNull: true },
      address: { type: DataTypes.STRING(255), allowNull: true },
      city: { type: DataTypes.STRING(100), allowNull: true },
      country: { type: DataTypes.STRING(100), allowNull: true },
      contactPerson: { type: DataTypes.STRING(150), allowNull: true, field: 'contact_person' },
      paymentTerms: { type: DataTypes.STRING(100), allowNull: true, field: 'payment_terms' },
      rating: { type: DataTypes.DECIMAL(3, 2), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'suppliers' },
  );

  MachineTypeModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'category_id' },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'machine_types', timestamps: true, underscored: true },
  );

  MachineSpecificationModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      typeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, field: 'type_id' },
      uom: { type: DataTypes.STRING(50), allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'machine_specifications', timestamps: true, underscored: true },
  );

  MachineSpecificationTypeModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'machine_specification_types', timestamps: true, underscored: true },
  );

  MachineCategoryModel.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('Active', 'Inactive'), allowNull: false, defaultValue: 'Active' },
    },
    { sequelize: sequelizeInstance, tableName: 'machine_categories', timestamps: true, underscored: true },
  );

  RoleModel.hasMany(UserModel, { foreignKey: 'roleId', as: 'users' });
  UserModel.belongsTo(RoleModel, { foreignKey: 'roleId', as: 'role' });
  DepartmentModel.hasMany(UserModel, { foreignKey: 'departmentId', as: 'users' });
  UserModel.belongsTo(DepartmentModel, { foreignKey: 'departmentId', as: 'department' });
  PlantModel.hasMany(LineModel, { foreignKey: 'plantId', as: 'lines' });
  LineModel.belongsTo(PlantModel, { foreignKey: 'plantId', as: 'plant' });
  PlantModel.hasMany(MachineModel, { foreignKey: 'plantId', as: 'machines' });
  LineModel.hasMany(MachineModel, { foreignKey: 'lineId', as: 'machines' });
  MachineModel.belongsTo(PlantModel, { foreignKey: 'plantId', as: 'plant' });
  MachineModel.belongsTo(LineModel, { foreignKey: 'lineId', as: 'line' });
  MachineTypeModel.hasMany(MachineModel, { foreignKey: 'machineTypeId', as: 'machines' });
  MachineModel.belongsTo(MachineTypeModel, { foreignKey: 'machineTypeId', as: 'machineType' });
  MachineSpecificationModel.hasMany(MachineModel, { foreignKey: 'machineSpecId', as: 'machines' });
  MachineModel.belongsTo(MachineSpecificationModel, { foreignKey: 'machineSpecId', as: 'machineSpec' });
  MachineCategoryModel.hasMany(MachineTypeModel, { foreignKey: 'categoryId', as: 'machineTypes' });
  MachineTypeModel.belongsTo(MachineCategoryModel, { foreignKey: 'categoryId', as: 'category' });
  MachineSpecificationTypeModel.hasMany(MachineSpecificationModel, { foreignKey: 'typeId', as: 'specifications' });
  MachineSpecificationModel.belongsTo(MachineSpecificationTypeModel, { foreignKey: 'typeId', as: 'specificationType' });
  RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: 'roleId',
    otherKey: 'permissionId',
    as: 'permissions',
  });
  PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: 'permissionId',
    otherKey: 'roleId',
    as: 'roles',
  });

  return {
    Role: RoleModel,
    Permission: PermissionModel,
    RolePermission: RolePermissionModel,
    Department: DepartmentModel,
    User: UserModel,
    SmtpSetting: SmtpSettingModel,
    StorageSetting: StorageSettingModel,
    CompanyProfile: CompanyProfileModel,
    ActivityLog: ActivityLogModel,
    Plant: PlantModel,
    Line: LineModel,
    Shift: ShiftModel,
    Machine: MachineModel,
    Supplier: SupplierModel,
    MachineType: MachineTypeModel,
    MachineSpecification: MachineSpecificationModel,
    MachineSpecificationType: MachineSpecificationTypeModel,
    MachineCategory: MachineCategoryModel,
  };
};

const models = initModels(sequelize);

export const {
  Role,
  Permission,
  RolePermission,
  Department,
  User,
  SmtpSetting,
  StorageSetting,
  CompanyProfile,
  ActivityLog,
  Plant,
  Line,
  Shift,
  Machine,
  Supplier,
  MachineType,
  MachineSpecification,
  MachineSpecificationType,
  MachineCategory,
} = models;
