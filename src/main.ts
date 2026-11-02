import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

async function main(): Promise<void> {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');

    await worker.start();
  }

  await bootstrapApplication(App, appConfig);
}

main().catch(err => console.error(err));