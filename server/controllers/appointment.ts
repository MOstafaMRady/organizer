import BaseCtrl from './base';
import Appointment from '../models/appointment';

export default class AppointmentController extends BaseCtrl {
  model = Appointment;

  postMany = (req, res) => {
    this.model.insertMany(req.body,
      function (err, appointments) {
        if (err) {
          return console.error(err);
        }

        res.status(201).json(appointments);
      });
  }
}
