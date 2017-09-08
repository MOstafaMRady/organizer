import Group from '../models/group';
import BaseCtrl from './base';


export default class GroupController extends BaseCtrl {
  model = Group;
  getAll = (req, res) => {
    this.model
      .find({}, (err, docs) => {
        if (err) {
          return console.error(err);
        }
        res.json(docs);
      }).populate({path: 'course', populate: {path: 'place'}}).populate('attendees');
  }
}
