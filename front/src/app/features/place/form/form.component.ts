import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as types from '../../../shared/types';
import { PlaceService } from '../place.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { sanitizer } from '../../../core/validators/validator';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule,
    ErrorMessageComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  place!: types.Place;
  placeForm: FormGroup;
  currentRoute: string;
  private message= inject(NzMessageService) 
  public readonly activeRoute = inject(ActivatedRoute);

  constructor(private router: Router, private fb: FormBuilder, private placeService: PlaceService) {
    this.placeForm = this.makeform();
    this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
   
    if (this.currentRoute === 'edit') {
      this.editForm();
    
  }
}


  editForm() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['place']) {
      this.place = navigation.extras.state['place'];
      this.placeForm.patchValue(this.place);
    }
  }

  makeform(): FormGroup {
    return this.fb.group({
      _id: [''],
      name: ['', [Validators.required, sanitizer()]],
      type: ['', [Validators.required, sanitizer()]],
      description: ['', [Validators.required, sanitizer()]],
      cover: ['', [Validators.required, sanitizer()]],
      provincia: ['',[Validators.required, sanitizer()]],
      location: this.fb.group({
        type: ['Point', Validators.required],
        coordinates: [[0, 0], [Validators.required, this.coordinatesValidator]]
      }),
      score: [0, Validators.required],
    });
  }

  coordinatesValidator(control: any): { [key: string]: boolean } | null {
    if (!Array.isArray(control.value) || control.value.length !== 2 || 
        typeof control.value[0] !== 'number' || typeof control.value[1] !== 'number') {
      return { invalidCoordinates: true };
    }
    return null;
  }

  submitForm() {
    if (this.placeForm.valid) {
      const formDataCopy = { ...this.placeForm.value };

      if (this.currentRoute === 'newplace') {
        delete formDataCopy._id;

        this.placeService.createPlaceService(formDataCopy).subscribe(
          (response) => {
            this.message.create("success", `Place has been successfully created`)
            this.router.navigate(['/welcome']);
          },
          (error) => {
            this.message.create("error", `Place hasn't been successfully created`);
          }
        );
      } else if (this.currentRoute === 'edit') {
        

        this.placeService.updatePlace(this.placeForm.value).subscribe(
          (response) => {
            this.message.create("success", `Place has been successfully edited`)
            this.router.navigate(['/welcome']);
          },
          (error) => {
            this.message.create("error", `Place hasn't been successfully edited`);
          }
        );
      }
    } else {
      
      for (const controlName in this.placeForm.controls) {
        if (this.placeForm.controls.hasOwnProperty(controlName)) {
          const control = this.placeForm.get(controlName);
          this.message.create("error", `${controlName}: ${control?.valid}`)
          if (control instanceof FormGroup) {
            for (const subControlName in control.controls) {
              if (control.controls.hasOwnProperty(subControlName)) {
                const subControl = control.get(subControlName);
                this.message.create("error", `  ${subControlName}: ${subControl?.valid}`)
              }
            }
          }
        }
      }
    }
  }
}
