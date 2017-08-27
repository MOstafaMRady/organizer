import * as mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  },
  title: String,
  description: String,
  cost: Number
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
