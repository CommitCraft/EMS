-- Migration: Add Machine Specification Types Table
-- Description: Replaces the hardcoded type ENUM in machine_specifications with a dynamic master table

CREATE TABLE IF NOT EXISTS machine_specification_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT IGNORE INTO permissions (module, action, name, description) VALUES
('machine_specification_types', 'view', 'VIEW_MACHINE_SPECIFICATION_TYPES', 'View machine specification types list'),
('machine_specification_types', 'create', 'CREATE_MACHINE_SPECIFICATION_TYPES', 'Create new specification types'),
('machine_specification_types', 'update', 'UPDATE_MACHINE_SPECIFICATION_TYPES', 'Update specification types'),
('machine_specification_types', 'delete', 'DELETE_MACHINE_SPECIFICATION_TYPES', 'Delete specification types');

ALTER TABLE machine_specifications ADD COLUMN type_id INT UNSIGNED NULL AFTER code;
ALTER TABLE machine_specifications ADD CONSTRAINT fk_machine_specs_type FOREIGN KEY (type_id) REFERENCES machine_specification_types(id) ON DELETE SET NULL;
ALTER TABLE machine_specifications DROP COLUMN type;