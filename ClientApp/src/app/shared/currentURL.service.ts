import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class getURL {
  constructor(private router: Router) { }

  currentURL = this.router.url;
}
