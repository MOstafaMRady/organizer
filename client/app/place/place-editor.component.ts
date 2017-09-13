import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-place-editor',
  templateUrl: './place-editor.component.html'
})
export class PlaceEditorComponent {
  @Input() formTitle: string;
  @Output() onCancel = new EventEmitter();
  @Output() onSaved = new EventEmitter();
  form: FormGroup;

  @Input()
  set model(value) {
    this.resetModel();
    if (value) {
      this.form.patchValue(value);
    }
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      _id: [],
      name: ['', Validators.required],
      phone1: ['', [Validators.required, CustomValidators.number, CustomValidators.rangeLength([5, 11])]],
      phone2: this.addPhoneControl(),
      phone3: this.addPhoneControl(),
      address: ['', Validators.required]
    });
  }

  private resetModel() {
    this.form.patchValue({_id: null, name: '', phone1: '', phone2: '', phone3: '', address: ''});
  }

  addPhoneControl() {
    return this.fb.control('', [CustomValidators.number, CustomValidators.rangeLength([6, 11])]);
  }

  cancelled() {
    this.onCancel.emit();
  }

  save() {
    this.onSaved.emit(this.form.value);
  }
}
