import { model, Schema } from 'mongoose';

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  planned: {
    type: Date,
  },
});

export interface Event {
  title: String;
  important: Boolean;
  complete: Boolean;
  createdAt: String;
  createdBy: String;
  assignedTo: String;
  planned: String;
}

export default model('Event', EventSchema);
