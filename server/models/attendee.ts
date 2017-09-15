import * as mongoose from 'mongoose';

const attendeeSchema = new mongoose.Schema({
  address: String,
  birthDate: Date,
  firstName: String,
  lastName: String,
  gender: String,
  middleName: String,
  phone1: String,
  phone2: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Attendee = mongoose.model('Attendee', attendeeSchema);
export default Attendee;
