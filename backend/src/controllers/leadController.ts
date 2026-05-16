import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Lead from '../models/Lead';
import { AuthRequest } from '../middlewares/authMiddleware';
import { z } from 'zod';
import { parse } from 'json2csv';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
export const createLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const validatedData = leadSchema.safeParse(req.body);

  if (!validatedData.success) {
    res.status(400);
    throw new Error(validatedData.error.errors[0].message);
  }

  const { name, email, status, source } = validatedData.data;

  const lead = await Lead.create({
    name,
    email,
    status: status || 'New',
    source,
    createdBy: req.user?._id,
  });

  res.status(201).json(lead);
});

// @desc    Get all leads with advanced filtering, search, and pagination
// @route   GET /api/leads
// @access  Private
export const getLeads = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query: any = {};

  // Search by name or email
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search as string, 'i');
    query.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by source
  if (req.query.source) {
    query.source = req.query.source;
  }

  // Sort
  const sortOption = req.query.sort === 'Oldest' ? 1 : -1;

  const leads = await Lead.find(query)
    .sort({ createdAt: sortOption })
    .skip(skip)
    .limit(limit)
    .populate('createdBy', 'name email');

  const total = await Lead.countDocuments(query);

  res.json({
    leads,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  });
});

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Private
export const getLeadById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');

  if (lead) {
    res.json(lead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
export const updateLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    lead.name = req.body.name || lead.name;
    lead.email = req.body.email || lead.email;
    lead.status = req.body.status || lead.status;
    lead.source = req.body.source || lead.source;

    const updatedLead = await lead.save();
    res.json(updatedLead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    await Lead.deleteOne({ _id: lead._id });
    res.json({ message: 'Lead removed' });
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Export leads to CSV
// @route   GET /api/leads/export
// @access  Private
export const exportLeads = asyncHandler(async (req: AuthRequest, res: Response) => {
  const leads = await Lead.find({}).populate('createdBy', 'name email');

  if (leads.length === 0) {
    res.status(400);
    throw new Error('No leads to export');
  }

  const fields = ['name', 'email', 'status', 'source', 'createdBy.name', 'createdAt'];
  const opts = { fields };

  try {
    const csv = parse(leads, opts);
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  } catch (err) {
    res.status(500);
    throw new Error('Error exporting to CSV');
  }
});
