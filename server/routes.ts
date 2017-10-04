import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import PlaceController from './controllers/place';
import CourseController from './controllers/course';
import AttendeeController from './controllers/attendee';
import GroupController from './controllers/group';
import AppointmentController from './controllers/appointment';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const placeController = new PlaceController();
  const courseController = new CourseController();
  const attendeeController = new AttendeeController();
  const groupController = new GroupController();
  const appointmentController = new AppointmentController();

  // appointments
  router.route('/group/:id/appointmentss').post(appointmentController.postMany);

  // Attendees
  router.route('/groups').get(groupController.getAll);
  router.route('/groups/count').get(groupController.count);
  router.route('/group').post(groupController.insertWithAppointments);
  router.route('/group/:id').get(groupController.get);
  router.route('/group/:id').put(groupController.updateWithAppointments);
  router.route('/group/:id').delete(groupController.delete);
  router.route('/attendee/group/count/:id').get(groupController.getAttendeeGroups);
  router.route('/group/:id/appointments').post(groupController.updateAttendees);
  router.route('/group/join').post(groupController.join);

  // Attendees
  router.route('/attendees').get(attendeeController.getAll);
  router.route('/attendees/count').get(attendeeController.count);
  router.route('/attendee').post(attendeeController.insert);
  router.route('/attendee/:id').get(attendeeController.get);
  router.route('/attendee/:id').put(attendeeController.update);
  router.route('/attendee/:id').delete(attendeeController.delete);

  // Courses
  router.route('/courses').get(courseController.getAll);
  router.route('/courses/count').get(courseController.count);
  router.route('/course').post(courseController.insert);
  router.route('/course/:id').get(courseController.get);
  router.route('/update-course/:id').put(courseController.updateItem);
  router.route('/course/:id').delete(courseController.checkAnddelete);

  // Places
  router.route('/places').get(placeController.getAll);
  router.route('/places/count').get(placeController.count);
  router.route('/place').post(placeController.insert);
  router.route('/place/:id').get(placeController.get);
  router.route('/place/:id').put(placeController.update);
  router.route('/place/:id').delete(placeController.delete);
  router.route('/place/:id/checkAndDelete').delete(placeController.checkAndDelete);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
