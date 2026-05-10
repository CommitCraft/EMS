-- Migration: Add Machine Type and Spec foreign keys to Machines
-- Description: Links the new Machine Types and Specifications modules directly to the Machines master

ALTER TABLE machines
  ADD COLUMN machine_type_id INT UNSIGNED NULL AFTER code,
  ADD COLUMN machine_spec_id INT UNSIGNED NULL AFTER capacity;

ALTER TABLE machines
  ADD CONSTRAINT fk_machines_type FOREIGN KEY (machine_type_id) REFERENCES machine_types(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_machines_spec FOREIGN KEY (machine_spec_id) REFERENCES machine_specifications(id) ON DELETE SET NULL;