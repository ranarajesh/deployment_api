import mongoose, { Schema, Document } from 'mongoose';

export interface DeploymentInterface extends Document {
  url: string;
  templateName: string;
  version: [String];
  deployedAt: Date;
}
const DeploymentSchema: Schema = new Schema({
  templateName: {
    type: String,
    required: [true, 'Please enter template name field'],
    unique: true,
    trim: true,
    maxlength: [70, 'Template Name  should not more than 70 character'],
  },
  version: {
    type: [String],
    // validate: {
    //   validator: (v: any) => {
    //     return v.length && /^([0-9]+)\.([0-9]+)\.([0-9]+)?$/.test(v);
    //   },
    //   message: () => `Please provide valid version for deployment`,
    // },
    required: [true, 'Please provide version for deployment'],
    trim: true,
  },
  url: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please add a valid deployment url',
    ],
  },
  deployedAt: {
    type: Date,
    default: new Date(),
  },
});

const Deployment = mongoose.model<DeploymentInterface>(
  'Deployment',
  DeploymentSchema
);
export default Deployment;
