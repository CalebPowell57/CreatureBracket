import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatureSubmissionService } from './creature-submission.service';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-creature-submission',
  templateUrl: './creature-submission.component.html'
})
export class CreatureSubmissionComponent {
  input: IInput = {name: "", bio: ""};

  constructor(
    private router: Router,
    private creatureSubmissionService: CreatureSubmissionService,
    private toastrService: ToastrService
  ) { }

  onSubmit(form: NgForm) {
    this.creatureSubmissionService.create({ name: this.input.name, bio: this.input.bio })
      .subscribe(
        () => {
          this.input.name = "";
          this.input.bio = "";
        }
      );
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  choosePhoto() {
    document.getElementById('select-file').click();
  }
}

interface IInput {
  name: string;
  bio: string;
}
