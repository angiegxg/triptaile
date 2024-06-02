import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as types from '../../../shared/types';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  place!: types.Place;
  placeForm: FormGroup;
  currentRoute: string;
  public readonly activeRoute = inject(ActivatedRoute);

  constructor(private router: Router, private fb: FormBuilder, private placeService: PlaceService) {
    this.placeForm = this.makeform();
    this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
    console.log(this.currentRoute);
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
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      cover: ['', Validators.required],
      provincia: ['', Validators.required],
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
        console.log("Estoy dentro del submit para saber la ruta actual", this.currentRoute);
        delete formDataCopy._id;
        console.log(formDataCopy);

        this.placeService.createPlaceService(formDataCopy).subscribe(
          (response) => {
            console.log('Server response:', response);
            this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error('Error creating place:', error);
          }
        );
      } else if (this.currentRoute === 'edit') {
        console.log(this.placeForm.valid);

        this.placeService.updatePlace(this.placeForm.value).subscribe(
          (response) => {
            console.log('Server response:', response);
            this.router.navigate(['/welcome']);
          },
          (error) => {
            console.error('Error updating place:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid:', this.placeForm);
      for (const controlName in this.placeForm.controls) {
        if (this.placeForm.controls.hasOwnProperty(controlName)) {
          const control = this.placeForm.get(controlName);
          console.log(`${controlName}: ${control?.valid}`);
          if (control instanceof FormGroup) {
            for (const subControlName in control.controls) {
              if (control.controls.hasOwnProperty(subControlName)) {
                const subControl = control.get(subControlName);
                console.log(`  ${subControlName}: ${subControl?.valid}`);
              }
            }
          }
        }
      }
    }
  }
}
