import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { rolePermissionService, RoleOption, PermissionModuleNode, PermissionActionNode, PermissionPageNode } from '../services/rolePermissionService';

type PermissionMatrixProps = {
  moduleFilter?: string;
  pageFilter?: string;
};

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ moduleFilter, pageFilter }) => {
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [permissionTree, setPermissionTree] = useState<PermissionModuleNode[]>([]);
  const [rolePermissionsMap, setRolePermissionsMap] = useState<Record<number, Set<number>>>({});
  const [dirtyRoles, setDirtyRoles] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const rolesResp = await rolePermissionService.listRoles();
        const roleList = rolesResp.data || [];
        setRoles(roleList);

        const permResp = await rolePermissionService.listPermissions();
        let tree = permResp.data?.modules || [];
        if (moduleFilter) tree = tree.filter((m) => m.label === moduleFilter);
        if (pageFilter) tree = tree.map((m) => ({ ...m, pages: m.pages.filter((p) => p.label === pageFilter) })).filter((m) => m.pages.length > 0);
        setPermissionTree(tree);

        // select first role if none selected
        if (!selectedRoleId && roleList.length) {
          setSelectedRoleId(roleList[0].id);
        }

        // load permissions for each role in parallel
        const permsPromises = (roleList || []).map(async (r) => {
          try {
            const rp = await rolePermissionService.getRolePermissions(r.id);
            return { roleId: r.id, ids: rp.data?.permissionIds || [] };
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Failed loading role perms', r.id, err);
            return { roleId: r.id, ids: [] as number[] };
          }
        });

        const resolved = await Promise.all(permsPromises);
        const rolePerms: Record<number, Set<number>> = {};
        for (const item of resolved) {
          rolePerms[item.roleId] = new Set(item.ids);
        }
        setRolePermissionsMap(rolePerms);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load roles/permissions', err);
        toast.error('Failed to load roles or permissions');
      } finally {
        setLoading(false);
      }
    };

    void load();
    // reload when filters change
  }, [moduleFilter, pageFilter]);

  // when selectedRoleId changes, ensure it's valid
  useEffect(() => {
    if (selectedRoleId && !roles.find((r) => r.id === selectedRoleId)) {
      setSelectedRoleId(roles.length ? roles[0].id : null);
    }
  }, [selectedRoleId, roles]);

  const getRoleSet = (roleId: number) => rolePermissionsMap[roleId] ?? new Set<number>();

  const toggle = (roleId: number, actionId: number) => {
    setRolePermissionsMap((prev) => {
      const copy: Record<number, Set<number>> = { ...prev };
      const setForRole = new Set(copy[roleId] ? Array.from(copy[roleId]) : []);
      if (setForRole.has(actionId)) setForRole.delete(actionId);
      else setForRole.add(actionId);
      copy[roleId] = setForRole;
      return copy;
    });
    setDirtyRoles((prev) => ({ ...prev, [roleId]: true }));
  };

  const handleSaveForRole = async (roleId: number) => {
    if (!roleId) {
      toast.error('Select a role first');
      return;
    }
    setLoading(true);
    try {
      const ids = Array.from(getRoleSet(roleId));
      await rolePermissionService.updateRolePermissions(roleId, ids);
      setDirtyRoles((prev) => ({ ...prev, [roleId]: false }));
      toast.success('Permissions saved');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Save failed', err);
      toast.error('Failed to save permissions');
    } finally {
      setLoading(false);
    }
  };

  const toggleModuleForRole = (roleId: number, moduleNode: PermissionModuleNode, selectAll: boolean) => {
    const actionIds = moduleNode.pages.flatMap((p) => p.actions.map((a) => a.id));
    setRolePermissionsMap((prev) => {
      const copy: Record<number, Set<number>> = { ...prev };
      const setForRole = new Set(copy[roleId] ? Array.from(copy[roleId]) : []);
      if (selectAll) {
        for (const id of actionIds) setForRole.add(id);
      } else {
        for (const id of actionIds) setForRole.delete(id);
      }
      copy[roleId] = setForRole;
      return copy;
    });
    setDirtyRoles((prev) => ({ ...prev, [roleId]: true }));
  };

  const togglePageForRole = (roleId: number, pageNode: PermissionPageNode, selectAll: boolean) => {
    const actionIds = pageNode.actions.map((a) => a.id);
    setRolePermissionsMap((prev) => {
      const copy: Record<number, Set<number>> = { ...prev };
      const setForRole = new Set(copy[roleId] ? Array.from(copy[roleId]) : []);
      if (selectAll) {
        for (const id of actionIds) setForRole.add(id);
      } else {
        for (const id of actionIds) setForRole.delete(id);
      }
      copy[roleId] = setForRole;
      return copy;
    });
    setDirtyRoles((prev) => ({ ...prev, [roleId]: true }));
  };

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Permission Matrix</h3>
        <div>
          <select
            value={selectedRoleId ?? ''}
            onChange={(e) => setSelectedRoleId(Number(e.target.value) || null)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Select role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div>Loading…</div>}

      {!loading && (
        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Module</th>
                <th className="p-2 text-left">Page</th>
                <th className="p-2 text-left">Action</th>
                {roles.map((r) => (
                  <th key={r.id} className="p-2 text-left">
                    <div className="flex items-center gap-2">
                      <span>{r.name}</span>
                      <button
                        className={`text-sm px-2 py-0.5 rounded ${dirtyRoles[r.id] ? 'bg-yellow-200' : 'bg-gray-100'}`}
                        onClick={() => handleSaveForRole(r.id)}
                      >
                        Save
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionTree.map((mod) => {
                const moduleActionIds = mod.pages.flatMap((p) => p.actions.map((a) => a.id));
                return (
                  <React.Fragment key={mod.label}>
                    <tr className="bg-gray-100">
                      <td className="p-2 font-semibold">{mod.label}</td>
                      <td className="p-2" />
                      <td className="p-2">Select All</td>
                      {roles.map((r) => {
                        const allSelected = moduleActionIds.every((id) => getRoleSet(r.id).has(id));
                        return (
                          <td key={r.id} className="p-2">
                            <label className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={() => toggleModuleForRole(r.id, mod, !allSelected)}
                                aria-label={`Select all for ${r.name} on ${mod.label}`}
                              />
                              <span className="text-sm">All</span>
                            </label>
                          </td>
                        );
                      })}
                    </tr>

                    {mod.pages.map((page) => (
                      <React.Fragment key={page.label}>
                        <tr className="bg-white">
                          <td className="p-2" />
                          <td className="p-2 font-medium">{page.label}</td>
                          <td className="p-2">Select Page</td>
                          {roles.map((r) => {
                            const pageActionIds = page.actions.map((a) => a.id);
                            const allSelected = pageActionIds.every((id) => getRoleSet(r.id).has(id));
                            return (
                              <td key={r.id} className="p-2">
                                <label className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={() => togglePageForRole(r.id, page, !allSelected)}
                                    aria-label={`Select all for ${r.name} on ${mod.label} / ${page.label}`}
                                  />
                                  <span className="text-sm">All</span>
                                </label>
                              </td>
                            );
                          })}
                        </tr>

                        {page.actions.map((action) => (
                          <tr key={action.id} className="border-t">
                            <td className="p-2 align-top" />
                            <td className="p-2 align-top" />
                            <td className="p-2 align-top">{action.label}</td>
                            {roles.map((r) => (
                              <td key={r.id} className="p-2">
                                <input
                                  type="checkbox"
                                  checked={getRoleSet(r.id).has(action.id)}
                                  onChange={() => toggle(r.id, action.id)}
                                  aria-label={`${r.name} permission for ${mod.label} / ${page.label} / ${action.label}`}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PermissionMatrix;
