import { useMemo, useState } from 'react';
import { CrudPage } from '../../entity/CrudPage';
import { departmentConfig, userConfig } from '../../entity/entityConfigs';
import { PageHeader } from '../../../components/PageHeader';
import { useAuth } from '../../../hooks/useAuth';

type UsersSection = 'users' | 'departments';

const UsersPage = () => {
	const { user } = useAuth();
	const [activeSection, setActiveSection] = useState<UsersSection>('users');

	const canViewDepartments = useMemo(
		() => Boolean(user?.permissions?.includes('VIEW_DEPARTMENTS')),
		[user?.permissions],
	);

	const sections = [
		{ key: 'users' as const, label: 'Users' },
		...(canViewDepartments ? [{ key: 'departments' as const, label: 'Departments' }] : []),
	];

	const activeConfig = activeSection === 'departments' ? departmentConfig : userConfig;
	const activeSectionLabel = activeSection === 'departments' ? 'Department CRUD' : 'User CRUD';

	return (
		<div className="space-y-6">
			<PageHeader
				title="Access Control"
				description="Manage users and department master data from a single workspace."
			/>

			<div className="rounded-[14px] border border-[#b8c7c7] bg-[#f8fbfb] p-4 shadow-sm">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							Workspace
						</div>
						<div className="mt-1 text-[18px] font-semibold text-slate-900">
							{activeSectionLabel}
						</div>
						<p className="mt-1 text-[13px] text-slate-600">
							Use the tabs to switch between the two master-data screens without leaving this page.
						</p>
					</div>

					<div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[12px] font-semibold text-blue-700 shadow-sm">
						{sections.length} section{sections.length > 1 ? 's' : ''} available
					</div>
				</div>

				<div className="mt-4 inline-flex flex-wrap rounded-full border border-[#d9e0e4] bg-white p-1 shadow-sm">
					{sections.map((section) => {
						const isActive = activeSection === section.key;

						return (
							<button
								key={section.key}
								type="button"
								onClick={() => setActiveSection(section.key)}
								className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
									isActive
										? 'bg-blue-600 text-white shadow-sm'
										: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
								}`}
							>
								{section.label}
							</button>
						);
					})}
				</div>
			</div>

			{!canViewDepartments ? (
				<div className="rounded-[10px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
					Department management is hidden because your account does not have VIEW_DEPARTMENTS permission.
				</div>
			) : null}

			<CrudPage config={activeConfig} />
		</div>
	);
};

export default UsersPage;
