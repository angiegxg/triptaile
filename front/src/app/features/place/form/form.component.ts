import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as types from '../../../shared/types'
import { PlaceService } from '../../../services/place.service';
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
  styleUrl: './form.component.scss'
})
export class FormComponent {

  place!: types.Place;
  placeForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private placeService: PlaceService) {
    this.placeForm = this.makeform();
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['place']) {
      this.place = navigation.extras.state['place'];
      this.placeForm.patchValue(this.place)
      
    }
  }
  makeform(): FormGroup { 
    return this.fb.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      cover: ['', Validators.required],
      provincia: ['', Validators.required],
      location: this.fb.group({
        type: ['Point', Validators.required], 
        coordinates: [[0, 0], Validators.required] 
      }),
      score: ['', Validators.required],
    });
  }

  submitForm(){
    if (this.placeForm.valid ) {
      const formData = this.placeForm.value;
     
        this.placeService.updatePlace(formData).subscribe(
        (response) => {
          console.log('Server response:', response);
         
          this.router.navigate(['/welcome']); 
        },
        (error) => {
          console.error('Error updating place:', error);
         
        }
      );
    }
     
      

  }
}

