import * as mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendee'
    }
  ]
});

const Group = mongoose.model('Group', groupSchema);
export default Group;
