# Quick Deployment Guide - Module Cleanup (May 5, 2026)

## 🚀 Pre-Deployment Verification

### ✅ Code Status: READY
```bash
# Backend builds successfully
cd backend && npm run build
# Result: 0 errors ✓

# Frontend builds successfully  
cd frontend && npm run build
# Result: 23 chunks generated ✓
```

---

## 📋 Deployment Checklist

### Step 1: Backup Database (CRITICAL)
```bash
# Create backup before any changes
mysqldump -u root -p qms > backup_$(date +%Y%m%d_%H%M%S).sql

# Verify backup exists
ls -lh backup_*.sql
```

### Step 2: Stop Application
```bash
# Stop any running application instances
pkill -f "node"        # Backend
pkill -f "npm"         # Frontend dev server

# Wait 5 seconds for graceful shutdown
sleep 5
```

### Step 3: Run Database Migration
```bash
# Execute migration script
mysql -u root -p qms < scripts/20260505_remove_deleted_modules.sql

# Alternative if above fails, use this approach:
# 1. Open MySQL Workbench or CLI
# 2. Connect to qms database
# 3. Open file: scripts/20260505_remove_deleted_modules.sql
# 4. Execute (Ctrl+Enter or Run button)
```

### Step 4: Verify Database Cleanup
```bash
# Check remaining tables (should show 9 tables)
mysql -u root -p -e "USE qms; SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='qms' ORDER BY TABLE_NAME;"

# Expected output:
# activity_logs
# company_profiles
# departments
# permissions
# role_permissions
# roles
# smtp_settings
# storage_settings
# users
```

### Step 5: Start Application

#### Backend
```bash
cd backend
npm install  # (if needed)
npm run build
npm start

# Verify console shows:
# - "Database connected successfully"
# - "Server running on port ..."
```

#### Frontend
```bash
cd frontend
npm install  # (if needed)
npm run build

# Serve dist/ folder:
# - Using your web server (nginx, Apache, etc.)
# - Or local: npx serve dist
```

---

## 🧪 Post-Deployment Testing

### Smoke Tests (5 mins)
- [ ] Login with admin account
- [ ] Navigate to Dashboard - should load
- [ ] Check sidebar - verify only: Dashboard, Users, Roles, Permissions, Departments, Reports, Settings, Logs
- [ ] Click on Users page - should load user list
- [ ] Click on Departments page - should load departments
- [ ] Check Error Logs page - should be empty or show logs
- [ ] Open browser console (F12) - verify no JavaScript errors
- [ ] Try logout and login again - verify auth still works

### Functional Tests (10 mins)
- [ ] Create a new user
- [ ] Assign role to user
- [ ] Modify user permissions
- [ ] Generate a report
- [ ] Check SMTP settings configuration
- [ ] Verify company profile settings
- [ ] Test role-based access (try accessing with different user roles)

### Database Tests (5 mins)
```bash
# Verify permissions table
mysql -u root -p -e "USE qms; SELECT DISTINCT module FROM permissions ORDER BY module;"
# Should show only: Access Control, Dashboard, Logs, Misc (if any), Settings

# Check user count
mysql -u root -p -e "USE qms; SELECT COUNT(*) as user_count FROM users;"

# Verify no orphaned references
mysql -u root -p -e "USE qms; SELECT COUNT(*) FROM activity_logs WHERE entity IN ('capa', 'ncr', 'documents', 'courses', 'audits');"
# Should return 0 (or small number from historical logs)
```

---

## ❌ If Issues Occur

### Issue: Database Migration Fails
```bash
# Rollback from backup
mysql -u root -p qms < backup_*.sql
# Then contact DevOps team
```

### Issue: Application Won't Start (Backend)
```bash
# Check logs
cat backend/build_log.txt

# Rebuild
cd backend && npm run build

# If still fails, restore from git:
git status  # See what changed
git checkout -- .  # Revert all changes
```

### Issue: Frontend Shows 404 Errors
```bash
# Clear browser cache
# Ctrl+Shift+Delete (open cache clear dialog)
# Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

# Rebuild frontend
cd frontend && npm run build
```

### Issue: Permission Denied or Cannot Access Modules
```bash
# This is expected! Those modules are removed
# Verify the following modules are gone:
# ❌ CAPA, NCR, Audits, Training, Documents
# ✅ Only these remain: Dashboard, Access Control, Settings, Logs

# If user sees them, clear browser cache and refresh
```

### Issue: Database Connection Error
```bash
# Verify MySQL is running
mysql -u root -p -e "SELECT 1"

# Check credentials in backend config
cat backend/src/config/env.ts  # Check DATABASE_* env vars

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;" | grep qms
```

---

## 📊 Deployment Summary

### Changes Made
- ✅ Removed 6 backend modules (capa, ncr, audits, documents, training, lms)
- ✅ Removed 6 frontend pages and their directories
- ✅ Dropped 16 database tables
- ✅ Removed 50+ permission records
- ✅ Updated all routes and navigation
- ✅ Cleaned TypeScript type definitions
- ✅ Both builds pass without errors

### What's Gone
- ❌ Audit Management
- ❌ CAPA Requests
- ❌ Non-Conformance (NCR)
- ❌ Complaint Management
- ❌ Risk Management
- ❌ 4M Change Management
- ❌ Supplier Management
- ❌ Training/LMS/Courses
- ❌ Document Management
- ❌ Workflows
- ❌ Reminders
- ❌ Clients
- ❌ Login Audits

### What Remains (Core Functionality)
- ✅ Dashboard
- ✅ Users Management
- ✅ Roles Management
- ✅ Permissions Management
- ✅ Role-Users Management
- ✅ Departments Management
- ✅ Reports
- ✅ Settings (SMTP, Storage, Company Profile)
- ✅ Error Logs
- ✅ Access Control

---

## 📞 Support

### For Questions:
1. **Migration details:** See `docs/database/MIGRATION_20260505.md`
2. **Full cleanup report:** See `docs/cleanup/CLEANUP_REPORT.md`
3. **Database schema:** Review `schema.sql` (after migration)
4. **Build info:** Check `backend/build_log.txt`

### Important Files:
- `scripts/20260505_remove_deleted_modules.sql` - Database migration
- `docs/database/MIGRATION_20260505.md` - Detailed migration guide
- `docs/cleanup/CLEANUP_REPORT.md` - Complete cleanup documentation
- `README.md` - General project documentation

---

## ✅ Sign-Off

**Ready for Deployment:** May 5, 2026  
**Backend Build Status:** ✅ PASS  
**Frontend Build Status:** ✅ PASS  
**Database Migration:** ✅ Ready  
**Estimated Deployment Time:** 15-30 minutes  
**Estimated Downtime:** 5-10 minutes (for database migration)  

**Next Step:** Follow the 5-step deployment checklist above.
