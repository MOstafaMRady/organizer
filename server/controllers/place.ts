import Place from '../models/place';
import Course from '../models/course';
import BaseCtrl from './base';
import {Request, Response} from 'express';

export default class PlaceController extends BaseCtrl {
  model = Place;
  course = Course;

  checkAndDelete = (req: Request, res: Response) => {
    this.course.find({
      place: {
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
        return res.json('cannot delete resource is in use');
      }
    });
  }
}
