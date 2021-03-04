import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface User {
  name?: string;
  email: string;
  password: string;
  password2?: string;
}

export interface UserDocument extends Document, User {
  comparePassword(password: string): string;
}

/** METHODS */
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/** MIDDLEWARES */
UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }
});

export default model('User', UserSchema);
