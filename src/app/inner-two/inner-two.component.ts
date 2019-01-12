import { Component, OnInit, forwardRef, ViewChild, Input, AfterViewChecked } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel, NgModelGroup } from '@angular/forms';
import { Comp } from '../outer/outer.model';

@Component({
  selector: 'app-inner-two',
  templateUrl: './inner-two.component.html',
  styleUrls: ['./inner-two.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InnerTwoComponent),
      multi: true
    }
  ]
})

export class InnerTwoComponent implements OnInit, ControlValueAccessor, AfterViewChecked {

  _value: Comp;
  registered = false;

  @ViewChild('two') two: NgModel;
  @Input() modelGroup: NgModelGroup;
  @Input() isRequired: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.registered) {
      if (this.modelGroup && this.modelGroup.control && this.two) {
        this.modelGroup.control.registerControl('two', this.two.control);
        this.registered = true;
      }
    }
  }

  // reregisterControl() {
  //   if (this.registered) {
  //     if (this.modelGroup && this.modelGroup.control && this.two) {
  //       this.modelGroup.control.removeControl('two');
  //       this.modelGroup.control.registerControl('two', this.two.control);
  //       this.registered = true;
  //     }
  //   }
  // }

  onChange = (value: string) => {};

  writeValue(obj: any): void {
    if (!obj) {
      obj = new Comp(null, null);
    }
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
