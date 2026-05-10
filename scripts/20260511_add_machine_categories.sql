-- Migration: Add Machine Categories Table
-- Description: Replaces the hardcoded category ENUM in machine_types with a dynamic master table

CREATE TABLE IF NOT EXISTS machine_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT IGNORE INTO permissions (module, action, name, description) VALUES
('machine_categories', 'view', 'VIEW_MACHINE_CATEGORIES', 'View machine categories list and details'),
('machine_categories', 'create', 'CREATE_MACHINE_CATEGORIES', 'Create new machine categories'),
('machine_categories', 'update', 'UPDATE_MACHINE_CATEGORIES', 'Update machine category information'),
('machine_categories', 'delete', 'DELETE_MACHINE_CATEGORIES', 'Delete machine categories');

ALTER TABLE machine_types ADD COLUMN category_id INT UNSIGNED NULL AFTER code;
ALTER TABLE machine_types ADD CONSTRAINT fk_machine_types_category FOREIGN KEY (category_id) REFERENCES machine_categories(id) ON DELETE SET NULL;
ALTER TABLE machine_types DROP COLUMN category;