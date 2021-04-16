import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ICreatureSubmission } from '../interfaces/creature-submission.interface';
import { NaviService } from '../shared/navi.service';
import { CreatureSubmissionService } from './creature-submission.service';

@Component({
  templateUrl: './creature-submission.component.html',
  styleUrls: ['./creature-submission.component.scss'],
})
export class CreatureSubmissionComponent {
  showCropper = false;
  input: IInput = {name: "", bio: ""};
  imageChangedEvent: any = '';
  croppedImage: string = '';
  submissions: ICreatureSubmission[];

  constructor(
    private creatureSubmissionService: CreatureSubmissionService,
    private toastrService: ToastrService,
    private naviService: NaviService
  ) { }

  ngOnInit() {
    this.naviService.loadingChanged$.next(true);
    this.creatureSubmissionService.getSubmissions().subscribe(x => {
      this.submissions = x;
      this.naviService.loadingChanged$.next(false);
    });
  }

  onSubmit(form: NgForm) {
    this.naviService.loadingChanged$.next(true);
    this.creatureSubmissionService.create({ name: this.input.name, bio: this.input.bio, image: this.croppedImage })
      .subscribe(
        () => {
          this.toastrService.success(`${this.input.name} has been submitted!`, 'Success');

          this.input.name = "";
          this.input.bio = "";
          this.croppedImage = "";
          this.showCropper = false;
          this.naviService.loadingChanged$.next(false);
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
