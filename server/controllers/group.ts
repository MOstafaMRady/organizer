import Group from '../models/group';
import Appointment from '../models/appointment';
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
      })
      .populate({
        path: 'course',
        populate: {
          path: 'place'
        }
      })
      .populate('attendees')
      .populate('appointments');
  }

  getAttendeeGroups = (req, res) => {
    const id = req.params.id;
    this.model
      .count({
        attendees: {$in: [id]}
      }, (err, docs) => {
        if (err) {
          return console.error(err);
        }
        res.json(docs);
      });
  }

  insertWithAppointments = (req, res) => {


    Appointment.insertMany(req.body.appointments, (err, results) => {
      if (err) {
        return console.error(err);
      }

      const obj = new this.model(req.body.group);
      obj.appointments = results.map(x => x._id);

      obj.save((err2, item) => {
        // 11000 is the code for duplicate key error
        if (err2 && err2.code === 11000) {
          res.sendStatus(400);
        }
        if (err2) {
          return console.error(err2);
        }
        res.status(200).json(item);
      });
    });
  }

  updateWithAppointments = (req, res) => {
    const id = req.params.id || res.params._id;
    console.log(id);
    if (!id) {
      res.sendStatus(404);
    }
    this.model.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {new: true},
      (err) => {
        if (err) {
          return console.error(err);
        }
        res.sendStatus(200);
      });
  }
  // Update by id
  updateAttendees = (req, res) => {
    const id = req.params.id || res.params._id;

    if (!id) {
      res.sendStatus(404);
    }

    this.model.findOneAndUpdate({_id: req.params.id}, req.body, {'new': true}, (err) => {
      if (err) {
        return console.error(err);
      }
      res.sendStatus(200);
    });
  }
}
