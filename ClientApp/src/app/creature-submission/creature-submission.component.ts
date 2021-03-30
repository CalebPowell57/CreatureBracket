import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatureSubmissionService } from './creature-submission.service';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { eCreatureSubmissionStatus, ICreatureSubmission } from '../interfaces/creature-submission.interface';

@Component({
  selector: 'app-creature-submission',
  templateUrl: './creature-submission.component.html',
  styleUrls: ['./creature-submission.component.scss'],
})
export class CreatureSubmissionComponent {
  showCropper = false;
  input: IInput = {name: "", bio: ""};
  imageChangedEvent: any = '';
  croppedImage: string = '';
  Pending_ApprovedSubmissions: ICreatureSubmission[];
  constructor(
    private router: Router,
    private creatureSubmissionService: CreatureSubmissionService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.creatureSubmissionService.getSubmissionsById().subscribe(x => {
      this.Pending_ApprovedSubmissions = x;
    });
  }
  onSubmit(form: NgForm) {
    this.creatureSubmissionService.create({ name: this.input.name, bio: this.input.bio, image: this.croppedImage })
      .subscribe(
        () => {
          this.toastrService.success(`${this.input.name} has been submitted!`, 'Success');

          this.input.name = "";
          this.input.bio = "";
          this.croppedImage = "";
          this.showCropper = false;
        }
      );
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    const img = new Image();
    img.src = event.base64;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = 200;
      elem.height = 200;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, 200, 200);
      const data = ctx.canvas.toDataURL();
      this.croppedImage = data;
    }
  }
  imageLoaded() {
    this.showCropper = true;
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
