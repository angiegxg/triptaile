import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  @Input() control!: AbstractControl | null;

  errorMessage: string | null = null;
  private statusSubscription?: Subscription;

  ngOnInit(): void {
    if (this.control) {
      this.statusSubscription = this.control.statusChanges.subscribe(() => {
        this.setErrorMessage();
      });
      this.setErrorMessage(); 
    }
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
  }

  private setErrorMessage()  {
    if (!this.control || !this.control.errors) {
      this.errorMessage = null;
      return;
    }
    if (this.control.errors['required']) {
      this.errorMessage = 'This field is required.';
    } else if (this.control.errors['invalidchar']) {
      this.errorMessage = 'Invalid characters are not allowed: <, >, /, ", \', ;, {, }.';
    } else if (this.control.errors['email']) {
      this.errorMessage = 'Please enter a valid email address.';
    } else {
      this.errorMessage = null;
    }
  }
}
