import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { IcecreamRepository } from './app/repository/icecream-repository';
import { IcecreamRepositoryDummyImpl } from './app/repository/icecream-repository-dummy-impl';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: IcecreamRepository, useClass: IcecreamRepositoryDummyImpl }
  ]
});
