-- Migration: Add Machine Types Table
-- Description: Creates machine_types master table for managing machine classifications

CREATE TABLE IF NOT EXISTS machine_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  category ENUM('Production', 'Utility', 'Testing', 'Packaging') NOT NULL,
  description TEXT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_status (status),
  KEY idx_code (code),
  KEY idx_category (category)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add permissions for Machine Types module
INSERT IGNORE INTO permissions (module, action, name, description) VALUES
('machine_types', 'view', 'VIEW_MACHINE_TYPES', 'View machine types list and details'),
('machine_types', 'create', 'CREATE_MACHINE_TYPES', 'Create new machine types'),
('machine_types', 'update', 'UPDATE_MACHINE_TYPES', 'Update machine type information'),
('machine_types', 'delete', 'DELETE_MACHINE_TYPES', 'Delete machine types');