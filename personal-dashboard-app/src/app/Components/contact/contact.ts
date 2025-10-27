import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  messages: any[] = []; // Store message history
  showModal = false; // Toggle for modal visibility

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    // Load existing messages from localStorage when the component loads
    const stored = localStorage.getItem('messages');
    this.messages = stored ? JSON.parse(stored) : [];
  }
  onSubmit() {
    if (this.contactForm.valid) {
      const newMessage = this.contactForm.value;

      // Add timestamp for clarity
      newMessage.time = new Date().toLocaleString();

      // Push to array
      this.messages.push(newMessage);

      // Save to localStorage
      localStorage.setItem('messages', JSON.stringify(this.messages));

      console.log('Message saved:', this.contactForm.value);

      // Clear form
      this.contactForm.reset();
      console.log(newMessage);
    }
  }
    openModal() {
    this.showModal = true;
  }
    closeModal() {
    this.showModal = false;
  }

}
