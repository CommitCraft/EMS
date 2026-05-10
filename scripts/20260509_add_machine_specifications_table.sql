-- Migration: Add Machine Specifications Table
-- Description: Creates machine_specifications master table for managing standard machine technical parameters

CREATE TABLE IF NOT EXISTS machine_specifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  type ENUM('Electrical', 'Mechanical', 'Operational', 'Environmental', 'Other') NOT NULL,
  uom VARCHAR(50) NULL COMMENT 'Unit of Measure',
  description TEXT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_status (status),
  KEY idx_code (code),
  KEY idx_type (type)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add permissions for Machine Specifications module
INSERT IGNORE INTO permissions (module, action, name, description) VALUES
('machine_specifications', 'view', 'VIEW_MACHINE_SPECIFICATIONS', 'View machine specifications list and details'),
('machine_specifications', 'create', 'CREATE_MACHINE_SPECIFICATIONS', 'Create new machine specifications'),
('machine_specifications', 'update', 'UPDATE_MACHINE_SPECIFICATIONS', 'Update machine specification information'),
('machine_specifications', 'delete', 'DELETE_MACHINE_SPECIFICATIONS', 'Delete machine specifications');