import Course from '../models/course';
import Group from '../models/group';
import BaseCtrl from './base';

export default class CourseController extends BaseCtrl {
  model = Course;
  group = Group;

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

  checkAnddelete = (req, res) => {
    console.log('by base');

    this.group.find({
      'course': {
        $eq: req.params.id
      }
    }, (err, courses) => {
      if (err) {
        return console.error(err);
      }

      if (!courses || courses.length === 0) {
        this.model.findOneAndRemove({_id: req.params.id}, (err2) => {
          if (err2) {
            return console.error(err2);
          }
          res.sendStatus(200);
        });
      } else {
        res.status(409).json(courses);
      }
    });
  }
}
