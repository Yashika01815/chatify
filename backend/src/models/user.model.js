import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Do not return password in queries by default
  },
  profilePic: {
    type: String,
    default: '', // URL to profile picture
  },
}, { timestamps: true });


export const User = mongoose.model('User', userSchema);
