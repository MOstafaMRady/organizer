import Course from '../models/course';
import BaseCtrl from './base';

export default class CourseController extends BaseCtrl {
  model = Course;

  getAll = (req, res) => {
    this.model
      .find({}, (err, docs) => {
        if (err) {
          return console.error(err);
        }
        res.json(docs);
      }).populate('place');
  }

  updateItem = (req, res) => {
    this.model.findOne({_id: req.params.id},
      (err, obj) => {
        if (err) {
          return console.error(err);
        }

        obj.title = req.body.title;
        obj.description = req.body.description;
        obj.cost = req.body.cost;
        obj.place = req.body.place;

        obj.save(function (err1, updatedObj) {
          if (err1) {
            return console.error(err1);
          }
          res.send(updatedObj);
        });
      });
  }
}
