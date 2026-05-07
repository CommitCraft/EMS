-- Add dedicated specifications fields for Lines and Machines.
-- Safe to run multiple times (will only add if columns are missing).

ALTER TABLE lines
  ADD COLUMN IF NOT EXISTS specifications TEXT NULL AFTER capacity;

ALTER TABLE machines
  ADD COLUMN IF NOT EXISTS specifications TEXT NULL AFTER capacity;
