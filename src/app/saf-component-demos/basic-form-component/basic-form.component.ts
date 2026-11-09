import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LinkIconComponent } from '../../link-icon/link-icon.component';
import { InPageNavigationComponent, InPageNavigationLink } from '../../layout/in-page-navigation/index';

@Component({
  selector: 'app-basic-form',
  imports: [FormsModule, ReactiveFormsModule, LinkIconComponent, InPageNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class SafBasicFormComponent implements OnInit {
  inPageLinks: InPageNavigationLink[] = [
    { id: 'basic-form', label: 'Basic form' },
  ];

  selectedList: any;
  firstName: any;
  lastName: any;
  emailAddress: any;
  country: any;
  zipPostalCode: any;
  phoneNumber: any;
  jobTitle: any;
  organizationName: any;
  organizationType: any;
  companyRevenue: any;
  selectedCompanySizeValue: any;
  isAllowReceiveMailNotification: any;
  public testForm!: FormGroup;
  showView: any;

  isInvalid = false;
  isSuccess = false;
  validationMessage = '';
  isInvalidLastName = false;
  isSuccessLastName = false;
  emailInvalid = false;
  emailIsSuccess = false;
  postalCodeIsInvalid = false;
  postalCodeIsSuccess = false;
  phoneNumberInvalid = false;
  phoneNumberIsSuccess = false;
  jobTitleIsInvalid = false;
  jobTitleIsSuccess = false;
  emailValidationMessage = '';
  zipCodeValidationMessage = '';
  jobTitleIsInvalidValidationMessage = '';
  phoneNumberValidationMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      firstName: '',
      lastName: '',
      emailAddress: '',
      country: '',
      zipPostalCode: '',
      phoneNumber: '',
      jobTitle: '',
      organizationName: '',
      organizationType: '',
      companyRevenue: '',
      selectedCompanySizeValue: '',
      isAllowReceiveMailNotification: '',
    });
  }

  checkCheckBoxvalue(event: any) {
    this.isAllowReceiveMailNotification = event.target.checked;
  }

  clearForm() {
    this.showView = false;
    this.isSuccess = false;
    this.isInvalid = false;
    this.isInvalidLastName = false;
    this.isSuccessLastName = false;
    this.emailInvalid = false;
    this.emailIsSuccess = false;
    this.postalCodeIsInvalid = false;
    this.postalCodeIsSuccess = false;
    this.phoneNumberInvalid = false;
    this.phoneNumberIsSuccess = false;
    this.jobTitleIsInvalid = false;
    this.jobTitleIsSuccess = false;
    this.validationMessage = '';
    this.emailValidationMessage = '';
    this.zipCodeValidationMessage = '';
    this.jobTitleIsInvalidValidationMessage = '';
    this.phoneNumberValidationMessage = '';
    this.testForm.reset();
  }

  onRenevueSelect(option: string) {
    this.testForm.patchValue({ companyRevenue: option });
  }

  onRenevueInput(event: Event) {
    this.testForm.patchValue({
      companyRevenue: (event.target as HTMLInputElement).value,
    });
  }

  saveBasicForm() {
    if (this.testForm.value.firstName.length <= 0) {
      this.isInvalid = true;
      this.showView = false;
      this.validationMessage = 'Enter your first name.';
    } else {
      this.isInvalid = false;
      this.isSuccess = true;
      this.showView = true;
      this.validationMessage = 'Success message.';
    }

    if (this.testForm.value.lastName.length <= 0) {
      this.isInvalidLastName = true;
      this.showView = false;
      this.validationMessage = 'Enter your last name.';
    } else {
      this.isInvalidLastName = false;
      this.isSuccessLastName = true;
      this.showView = true;
      this.validationMessage = 'Success messsage.';
    }

    if (this.testForm.value.jobTitle.length <= 0) {
      this.jobTitleIsInvalid = true;
      this.showView = false;
      this.jobTitleIsInvalidValidationMessage = 'Enter your job title.';
    } else {
      this.showView = true;
      this.jobTitleIsInvalid = false;
      this.jobTitleIsSuccess = true;
      this.jobTitleIsInvalidValidationMessage = 'Success messsage.';
    }

    if (this.testForm.value.emailAddress) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (emailRegex.test(this.testForm.value.emailAddress)) {
        this.emailInvalid = false;
        this.emailIsSuccess = true;
        this.showView = true;
        this.emailValidationMessage = 'Success messsage.';
      } else {
        this.emailInvalid = true;
        this.showView = false;
        this.emailValidationMessage = 'Use the format email@address.com.';
      }
    }

    if (this.testForm.value.phoneNumber) {
      const validPhoneNumber =
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (validPhoneNumber.test(this.testForm.value.phoneNumber)) {
        this.phoneNumberInvalid = false;
        this.phoneNumberIsSuccess = true;
        this.showView = true;
        this.phoneNumberValidationMessage = 'Success message.';
      } else {
        this.phoneNumberInvalid = true;
        this.showView = false;
        this.phoneNumberValidationMessage = 'Use the format 123-123-1234.';
      }
    }

    if (this.testForm.value.zipPostalCode) {
      if (this.testForm.value.zipPostalCode.length != 5) {
        this.postalCodeIsInvalid = true;
        this.showView = false;
        this.zipCodeValidationMessage = 'ZIP codes must be 6 digits.';
      } else {
        this.showView = true;
        this.postalCodeIsInvalid = false;
        this.postalCodeIsSuccess = true;
        this.zipCodeValidationMessage = 'Verified ZIP code.';
      }
    }

    this.firstName = this.testForm.value.firstName;
    this.lastName = this.testForm.value.lastName;
    this.emailAddress = this.testForm.value.emailAddress;
    this.country = this.testForm.value.country;
    this.zipPostalCode = this.testForm.value.zipPostalCode;
    this.phoneNumber = this.testForm.value.phoneNumber;
    this.jobTitle = this.testForm.value.jobTitle;
    this.organizationName = this.testForm.value.organizationName;
    this.organizationType = this.testForm.value.organizationType;
    this.companyRevenue = this.testForm.value.companyRevenue;
    this.selectedCompanySizeValue =
      this.testForm.value.selectedCompanySizeValue;
    this.isAllowReceiveMailNotification =
      this.testForm.value.isAllowReceiveMailNotification;
  }

  keyPressInputField(e: any) {
    e = e || window.event;
    const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);
    if (/\d/.test(charStr)) {
      return false;
    } else {
      let k;
      document.all ? (k = e.keyCode) : (k = e.which);
      return (
        (k > 64 && k < 91) ||
        (k > 96 && k < 123) ||
        k == 8 ||
        k == 32 ||
        (k >= 48 && k <= 57)
      );
    }
  }
}
