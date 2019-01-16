import { Component, OnInit, forwardRef, Input, Attribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModelGroup, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Comp } from './outer.model';

@Component({
  selector: 'app-outer',
  templateUrl: './outer.component.html',
  styleUrls: ['./outer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OuterComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OuterComponent),
      multi: true,
    }
  ]
})
export class OuterComponent implements OnInit, ControlValueAccessor, Validator {

  _value: Comp = new Comp(null, null);
  @Input() required;

  constructor() {
  }

    /**
     * Returns null if valid else key value object
     *
     * @param c Form Control
     */
    public validate(c: FormControl): {[key: string]: any} | null {

      const inputsValid: boolean =
        !!this._value &&
          (
            // all fields required
            (this.required &&
              (!!this._value.innerOne && !!this._value.innerTwo)
            )
            ||
            // or, all or none fields required
            (!this.required &&
              !(!!this._value.innerOne !== !!this._value.innerTwo)
            )
          );

      return inputsValid ? null : {required: true};
  }

  ngOnInit() { }

  onChange = (value: Comp) => {};
  onValidatorChange = () => {};

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnValidatorChange?(fn: () => void): void {
    fn = this.onValidatorChange;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  doChange() {
    this.onChange(this._value);
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
