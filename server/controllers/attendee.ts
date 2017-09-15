import Attendee from '../models/attendee';
import BaseCtrl from './base';

export default class AttendeeController extends BaseCtrl {
  model = Attendee;

  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    }).populate('user');
  }
}
