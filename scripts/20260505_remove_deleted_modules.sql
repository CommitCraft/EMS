-- ============================================================================
-- Migration: Remove Deleted Modules (May 5, 2026)
-- ============================================================================
-- This migration removes database tables and permissions for all modules
-- that have been removed from the codebase:
-- - Audit Management
-- - CAPA (Corrective and Preventive Action)
-- - Non Conformance (NCR)
-- - Complaint Management
-- - Risk Management
-- - 4M Change Management
-- - Supplier Management
-- - Training & Learning Management System (LMS)
-- - Document Management
-- - Workflows
-- - Reminders
-- - Clients
-- ============================================================================

USE qms;

-- ============================================================================
-- STEP 1: Drop Tables for Training/LMS Module (Handle Dependencies First)
-- ============================================================================
-- These tables reference courses, so drop in dependency order

DROP TABLE IF EXISTS course_content_progress;
DROP TABLE IF EXISTS test_attempts;
DROP TABLE IF EXISTS test_questions;
DROP TABLE IF EXISTS test_series;
DROP TABLE IF EXISTS assignment_submissions;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS course_contents;
DROP TABLE IF EXISTS course_progress;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS courses;

-- ============================================================================
-- STEP 2: Drop Tables for Other Deleted Modules
-- ============================================================================

DROP TABLE IF EXISTS audit_findings;
DROP TABLE IF EXISTS audits;
DROP TABLE IF EXISTS capa;
DROP TABLE IF EXISTS ncr;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS document_versions;

-- ============================================================================
-- STEP 3: Clean Up Permissions for Deleted Modules
-- ============================================================================
-- Remove all permission entries for deleted modules from the permissions table

DELETE FROM permissions WHERE module IN (
  'Audit',
  'CAPA',
  'Non Conformance',
  'Complaint',
  'Risk Management',
  '4M Change',
  'Supplier',
  'Training',
  'Document Management',
  'Workflows',
  'Reminder',
  'Clients'
);

-- ============================================================================
-- STEP 4: Verify Remaining Tables
-- ============================================================================
-- Remaining core tables after cleanup:
-- - roles
-- - permissions
-- - role_permissions
-- - departments
-- - users
-- - smtp_settings
-- - storage_settings
-- - company_profiles
-- - activity_logs
--
-- To verify: SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'qms';

-- ============================================================================
-- Migration Complete
-- ============================================================================
-- All references to deleted modules have been removed from the database
-- The application should now only use the remaining core modules
-- ============================================================================
