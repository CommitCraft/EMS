# Database Migration: Module Cleanup (May 5, 2026)

## Overview
This migration removes all database tables and permissions related to modules that have been completely removed from the MERN QMS application codebase.

## Removed Modules
The following 13 modules have been removed from the application:
1. **Audit Management** - Audit tracking and finding management
2. **CAPA** - Corrective and Preventive Action requests
3. **Non Conformance (NCR)** - Non-conformance reports
4. **Complaint Management** - Customer/internal complaints
5. **Risk Management** - Risk assessment and tracking
6. **4M Change Management** - Change request workflows
7. **Supplier Management** - Supplier database
8. **Training/LMS** - Learning Management System and courses
9. **Document Management** - Document versioning and storage
10. **Workflows** - Workflow automation system
11. **Reminders** - Notification reminders
12. **Clients** - Client management

## Database Changes

### Tables Dropped
**Training/LMS Tables:**
- `courses`
- `course_enrollments`
- `course_progress`
- `course_contents`
- `assignments`
- `assignment_submissions`
- `test_series`
- `test_questions`
- `test_attempts`
- `course_content_progress`

**Audit Module:**
- `audits`
- `audit_findings`

**CAPA & NCR Modules:**
- `capa`
- `ncr`

**Document Management:**
- `documents`
- `document_versions`

### Permissions Removed
All permission entries in the `permissions` table for the above 13 modules have been deleted. These included 50+ individual permission records.

### Tables Retained (Core Functionality)
- `roles` - User role definitions
- `permissions` - Remaining permission definitions
- `role_permissions` - Role-permission assignments
- `departments` - Department structure
- `users` - User management
- `smtp_settings` - Email configuration
- `storage_settings` - File storage configuration
- `company_profiles` - Company branding
- `activity_logs` - System activity logging

## How to Run the Migration

### MySQL/MariaDB
```bash
# Using mysql CLI
mysql -u [username] -p [database_name] < scripts/20260505_remove_deleted_modules.sql

# Example:
mysql -u root -p qms < scripts/20260505_remove_deleted_modules.sql
```

### With Connection String
```bash
mysql -h localhost -u root -p -D qms < scripts/20260505_remove_deleted_modules.sql
```

### Using a GUI Tool
1. Open MySQL Workbench, DataGrip, or similar tool
2. Connect to your database
3. Open the migration file: `scripts/20260505_remove_deleted_modules.sql`
4. Execute the script

## Important Notes

⚠️ **BACKUP FIRST**: Create a complete database backup before running this migration
```bash
mysqldump -u root -p qms > backup_before_cleanup_$(date +%Y%m%d_%H%M%S).sql
```

⚠️ **ONE-WAY OPERATION**: This migration is destructive and cannot be easily reversed. Data in dropped tables will be permanently deleted.

⚠️ **DOWNTIME**: Run this migration during a maintenance window when no users are actively accessing the application.

⚠️ **APPLICATION STATE**: Ensure the application is stopped or in read-only mode before running this migration to avoid data inconsistency.

## Post-Migration Verification

After running the migration, verify the cleanup:

```sql
-- Check remaining tables
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'qms' 
ORDER BY TABLE_NAME;

-- Should return 9 tables:
-- activity_logs
-- company_profiles
-- departments
-- permissions
-- role_permissions
-- roles
-- smtp_settings
-- storage_settings
-- users

-- Verify permissions were cleaned up
SELECT COUNT(*) as total_permissions FROM permissions;

-- Should be significantly fewer (only Dashboard, Access Control, Settings, Logs)
SELECT DISTINCT module FROM permissions ORDER BY module;
```

## Expected Results After Migration
✓ All deleted module tables removed from database  
✓ Orphaned permissions deleted  
✓ Database size reduced (depending on data volume)  
✓ Foreign key integrity maintained for remaining tables  
✓ No orphaned references in activity_logs (module names still logged for historical purposes)  
✓ Application ready to start with cleaned database schema

## Rollback Strategy

If issues occur, restore from backup:
```bash
# Restore from backup
mysql -u root -p qms < backup_before_cleanup_YYYYMMDD_HHMMSS.sql
```

## Related Code Changes

This migration complements the following codebase cleanups:
- ✅ Backend module routers removed: `backend/src/modules/{capa,lms}/`
- ✅ Frontend pages deleted: `frontend/src/pages/{course,documents}/`
- ✅ Database models removed from `backend/src/models/index.ts`
- ✅ Permission constants cleaned: `backend/src/common/constants/permissions.ts`
- ✅ Navigation menu updated: `frontend/src/layouts/app-shell/navConfig.ts`
- ✅ Route definitions updated: `frontend/src/routes/groups/coreRoutes.tsx`

## Support

For questions about this migration or to verify successful execution, review:
- Migration script: `scripts/20260505_remove_deleted_modules.sql`
- Build logs: `backend/build_log.txt`
- Application README: `README.md`
