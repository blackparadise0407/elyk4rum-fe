import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

enum ErrorKey {
  min = 'min',
  max = 'max',
  minlength = 'minlength',
  maxlength = 'maxlength',
  required = 'required',
}

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent implements OnInit {
  @Input() displayName = '';
  @Input() control!: AbstractControl;

  public error!: string;

  constructor() {}

  public ngOnInit(): void {
    this.error = this.constructError();
  }

  private constructError() {
    if (this.control.errors) {
      const errors = this.control.errors;
      if (errors[ErrorKey.max]) {
        return `${this.displayName} không được lớn hơn ${
          errors[ErrorKey.max]?.max
        }`;
      }
      if (errors[ErrorKey.min]) {
        return `${this.displayName} không được bé hơn ${
          errors[ErrorKey.min]?.min
        }`;
      }
      if (errors[ErrorKey.maxlength]) {
        return `${this.displayName} có tối đa ${
          errors[ErrorKey.maxlength]?.requiredLength
        } ký tự`;
      }
      if (errors[ErrorKey.minlength]) {
        return `${this.displayName} không có tối thiểu ${
          errors[ErrorKey.minlength]?.requiredLength
        } ký tự`;
      }
      if (errors[ErrorKey.required]) {
        return `${this.displayName} không được để trống`;
      }
    }
    return '';
  }
}
