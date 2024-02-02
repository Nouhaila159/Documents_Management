import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
              private toastr: ToastrService) {
  }

  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control('user'),
    isactive: this.builder.control(false)
  });

  getErrorMessage(controlName: string): string {
    const control = this.registerform.get(controlName);

    if (control && control.hasError('required')) {
      return 'This field is required';
    } else if (control && control.hasError('minlength')) {
      return 'Minimum length is 5 characters';
    } else if (control && control.hasError('email')) {
      return 'Enter a valid email address';
    } else if (control && control.hasError('pattern')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    return '';
  }

  proceedregister() {
    if (this.registerform.valid) {
      const username = this.registerform.value.id;
      console.log('New User ID:', this.registerform.value.id);

      this.service.isUsernameUnique(username).subscribe(isUnique => {
        console.log('Is unique:', isUnique);

        if (isUnique.length === 0) {
          // The username is unique

          // Encode the password with Base64
          const encodedPassword = btoa(<string>this.registerform.value.password);
          // Create a new form control with the encoded password
          const encodedPasswordControl = this.builder.control(encodedPassword);

          const updatedRegisterForm = this.builder.group({
            ...this.registerform.value,
            password: encodedPasswordControl
          });

          // Use the updated form group in the API call
          this.service.RegisterUser(updatedRegisterForm.value).subscribe(result => {
            this.toastr.success('Please contact admin for enable access.', 'Registered successfully');
            this.router.navigate(['login']);
          });
        } else {
          // The username is not unique
          this.toastr.warning('Username is already taken. Please choose another username.');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

}
