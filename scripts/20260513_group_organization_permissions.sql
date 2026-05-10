-- Migration: Group Organization and Machine Permissions
-- Migration: Group Organization and Machines Center Permissions
-- Description: Inserts and strictly groups all Machines Center CRUD permissions under the "Organization" module for a unified UI Matrix

-- 1. Insert permissions for All Machines Center modules directly under 'Organization'
INSERT IGNORE INTO permissions (module, action, name, description, createdAt, updatedAt) VALUES
-- All Machines
('Organization', 'view', 'VIEW_MACHINES', 'View machines list and details', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'create', 'CREATE_MACHINES', 'Create new machines', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'update', 'UPDATE_MACHINES', 'Update machine information', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'delete', 'DELETE_MACHINES', 'Delete machines', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Machine Categories
('Organization', 'view', 'VIEW_MACHINE_CATEGORIES', 'View machine categories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'create', 'CREATE_MACHINE_CATEGORIES', 'Create machine categories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'update', 'UPDATE_MACHINE_CATEGORIES', 'Update machine categories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'delete', 'DELETE_MACHINE_CATEGORIES', 'Delete machine categories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Machine Types
('Organization', 'view', 'VIEW_MACHINE_TYPES', 'View machine types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'create', 'CREATE_MACHINE_TYPES', 'Create machine types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'update', 'UPDATE_MACHINE_TYPES', 'Update machine types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'delete', 'DELETE_MACHINE_TYPES', 'Delete machine types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Spec Types
('Organization', 'view', 'VIEW_MACHINE_SPECIFICATION_TYPES', 'View specification types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'create', 'CREATE_MACHINE_SPECIFICATION_TYPES', 'Create specification types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'update', 'UPDATE_MACHINE_SPECIFICATION_TYPES', 'Update specification types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'delete', 'DELETE_MACHINE_SPECIFICATION_TYPES', 'Delete specification types', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Machine Specs
('Organization', 'view', 'VIEW_MACHINE_SPECIFICATIONS', 'View machine specifications', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'create', 'CREATE_MACHINE_SPECIFICATIONS', 'Create machine specifications', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'update', 'UPDATE_MACHINE_SPECIFICATIONS', 'Update machine specifications', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Organization', 'delete', 'DELETE_MACHINE_SPECIFICATIONS', 'Delete machine specifications', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2. Force update existing permissions just in case they were previously created under different module names
UPDATE permissions 
SET module = 'Organization' 
WHERE name IN (
  'VIEW_MACHINES', 'CREATE_MACHINES', 'UPDATE_MACHINES', 'DELETE_MACHINES',
  'VIEW_MACHINE_CATEGORIES', 'CREATE_MACHINE_CATEGORIES', 'UPDATE_MACHINE_CATEGORIES', 'DELETE_MACHINE_CATEGORIES',
  'VIEW_MACHINE_TYPES', 'CREATE_MACHINE_TYPES', 'UPDATE_MACHINE_TYPES', 'DELETE_MACHINE_TYPES',
  'VIEW_MACHINE_SPECIFICATION_TYPES', 'CREATE_MACHINE_SPECIFICATION_TYPES', 'UPDATE_MACHINE_SPECIFICATION_TYPES', 'DELETE_MACHINE_SPECIFICATION_TYPES',
  'VIEW_MACHINE_SPECIFICATIONS', 'CREATE_MACHINE_SPECIFICATIONS', 'UPDATE_MACHINE_SPECIFICATIONS', 'DELETE_MACHINE_SPECIFICATIONS',
  -- Also group core organization entities
  'VIEW_PLANTS', 'CREATE_PLANTS', 'UPDATE_PLANTS', 'DELETE_PLANTS',
  'VIEW_LINES', 'CREATE_LINES', 'UPDATE_LINES', 'DELETE_LINES',
  'VIEW_SHIFTS', 'CREATE_SHIFTS', 'UPDATE_SHIFTS', 'DELETE_SHIFTS',
  'VIEW_DEPARTMENTS', 'CREATE_DEPARTMENTS', 'UPDATE_DEPARTMENTS', 'DELETE_DEPARTMENTS',
  'VIEW_SUPPLIERS', 'CREATE_SUPPLIERS', 'UPDATE_SUPPLIERS', 'DELETE_SUPPLIERS'
);