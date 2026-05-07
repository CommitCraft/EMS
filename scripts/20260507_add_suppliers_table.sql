-- Migration: Add Suppliers Table
-- Created: 2026-05-07
-- Description: Creates suppliers master table for managing supplier information

CREATE TABLE IF NOT EXISTS suppliers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(180) NULL,
  phone VARCHAR(30) NULL,
  address VARCHAR(255) NULL,
  city VARCHAR(100) NULL,
  country VARCHAR(100) NULL,
  contact_person VARCHAR(150) NULL,
  payment_terms VARCHAR(100) NULL,
  rating DECIMAL(3,2) NULL,
  description TEXT NULL,
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_status (status),
  KEY idx_code (code),
  KEY idx_name (name)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add permissions for Suppliers module
INSERT IGNORE INTO permissions (module, action, name, description) VALUES
('suppliers', 'view', 'VIEW_SUPPLIERS', 'View suppliers list and details'),
('suppliers', 'create', 'CREATE_SUPPLIERS', 'Create new suppliers'),
('suppliers', 'update', 'UPDATE_SUPPLIERS', 'Update supplier information'),
('suppliers', 'delete', 'DELETE_SUPPLIERS', 'Delete suppliers');
