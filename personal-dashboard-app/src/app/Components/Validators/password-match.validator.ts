import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey);
    const confirmPassword = formGroup.get(confirmPasswordKey);

    if (!password || !confirmPassword) return null;
    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) return null;

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };
}
