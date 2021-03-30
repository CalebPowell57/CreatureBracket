import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatureSubmissionService } from './creature-submission.service';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ICreatureDTO } from '../interfaces/CreatureDTO.interface';
import { ICreatureSubmission, eCreatureSubmissionStatus } from '../interfaces/creature-submission.interface';

@Component({
  selector: 'app-creature-submission',
  templateUrl: './creature-submission.component.html',
  styleUrls: ['./creature-submission.component.scss']
})
export class CreatureSubmissionComponent {
  showCropper = false;
  input: IInput = {name: "", bio: ""};
  imageChangedEvent: any = '';
  croppedImage: string = '';
  creature: ICreatureDTO;
  pendingSubmissions: ICreatureSubmission[];
  approvedSubmissions: ICreatureSubmission[];
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
    this.croppedImage = event.base64;
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
