import { Response } from 'express';
import { fn, literal } from 'sequelize';
import { AuthenticatedRequest } from '../../../common/middleware';
import { Department, User } from '../../../models';

export const getSummary = async (_req: AuthenticatedRequest, res: Response) => {
  const [totalUsers, departments] = await Promise.all([User.count(), Department.count()]);

  res.json({
    success: true,
    data: {
      totalUsers,
      departments,
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
