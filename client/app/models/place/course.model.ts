import {Place} from './place.model';

export class Course {
  _id: string;
  place: Place;
  title: string;
  description: string;
  cost: number;
}
