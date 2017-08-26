import * as mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: String,
  phone1: String,
  phone2: String,
  phone3: String,
  address: String
});
const Place = mongoose.model('Place', placeSchema);
export default Place;

