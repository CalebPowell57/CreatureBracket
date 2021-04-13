import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadStateService {

  private HomeLoaded: boolean;

  constructor() { }


  public set HomeHasLoaded(LoadState: boolean) {
    this.HomeLoaded = LoadState;
  }

  public get HomeHasLoaded(): boolean {
    return this.HomeLoaded;
  }


}
