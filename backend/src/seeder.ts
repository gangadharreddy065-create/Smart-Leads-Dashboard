import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import connectDB from './config/db';

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });

    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    await User.create({
      name: 'System Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin',
    });

    console.log('Admin user successfully created!');
    console.log('-------------------------');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    console.log('-------------------------');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
