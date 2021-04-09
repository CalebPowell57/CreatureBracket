import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic(providers).bootstrapModule(AppModule)
//  .catch(err => console.log(err));
const navi = document.querySelector(".navi");
const captionContainer = document.querySelector(".captionContainer");
const LoadingAnimation = document.querySelector(".LoadingAnimation");

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // trigger the transition
  .then(() => navi.classList.add("Loaded"))
  .then(() => captionContainer.classList.add("Loaded"))
  .then(() => LoadingAnimation.classList.add("Loaded"))

  // remove the loading element after the transition is complete to prevent swallowed clicks
  .then(() => setTimeout(() => navi.remove(), 3000))
  .then(() => setTimeout(() => captionContainer.remove(), 3000))
  .then(() => setTimeout(() => LoadingAnimation.remove(), 3000));

  

