import Group from '../models/group';
import Appointment from '../models/appointment';
import BaseCtrl from './base';
import {app} from '../app';


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

    const appointments = req.body.appointments;
    const groupId = req.params.id;
    const group = req.body.group;

    Appointment.find({group: {$eq: groupId}}, (err, dbAppointments) => {
      if (err) {
        return console.error(err);
      }

      dbAppointments.forEach(d => {
        const foundAppointment = appointments.find(x => x._Id === d._id);
        if (!foundAppointment) {
          d.remove();
        }
      });

      const newAppointments = appointments.filter(x => !x._Id);
      newAppointments.forEach(x => x.group = groupId);
      Appointment.insertMany(req.body.appointments, (insertErr, results) => {
        if (insertErr) {
          return console.error(insertErr);
        }
        group.appointments = results;
        this.model.findOneAndUpdate({_id: groupId}, group, {'new': true}, (err2) => {
          if (err2) {
            return console.error(err2);
          }
          res.sendStatus(200);
        });
      });
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
