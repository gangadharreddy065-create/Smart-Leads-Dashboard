import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeads,
} from '../controllers/leadController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/export').get(protect, exportLeads);

router
  .route('/')
  .get(protect, getLeads)
  .post(protect, createLead);

router
  .route('/:id')
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, admin, deleteLead); // Only admin can delete leads

export default router;
