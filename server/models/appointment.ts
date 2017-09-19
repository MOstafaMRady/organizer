import * as mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  day: String,
  time: String,
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }
});
const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
