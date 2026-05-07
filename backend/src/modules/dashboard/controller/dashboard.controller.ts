import { Response } from 'express';
import { Op, fn, literal } from 'sequelize';
import { AuthenticatedRequest } from '../../../common/middleware';
import { Department, Line, Machine, Plant, Shift, Supplier, User, Role } from '../../../models';

export const getSummary = async (_req: AuthenticatedRequest, res: Response) => {
  const [totalUsers, departments, plants, lines, shifts, machines, suppliers, roles, roleUsers] = await Promise.all([
    User.count(),
    Department.count(),
    Plant.count(),
    Line.count(),
    Shift.count(),
    Machine.count(),
    Supplier.count(),
    Role.count(),
    User.count({ where: { roleId: { [Op.gt]: 0 } } }),
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      departments,
      plants,
      lines,
      shifts,
      machines,
      suppliers,
      roles,
      roleUsers,
      pendingApprovals: 0,
      totalDocuments: 0,
      openCapa: 0,
      openNcr: 0,
    },
  });
};

export const getCharts = async (_req: AuthenticatedRequest, res: Response) => {
  const departmentIssues = await Department.findAll({
    attributes: ['name', [fn('COUNT', literal('DISTINCT users.id')), 'users']],
    include: [{ association: 'users', attributes: [] }],
    group: ['DepartmentModel.id', 'DepartmentModel.name'],
    raw: true,
  });

  res.json({
    success: true,
    data: {
      monthlyCapa: [],
      departmentIssues,
      documentStatus: [],
      auditScores: [],
    },
  });
};
