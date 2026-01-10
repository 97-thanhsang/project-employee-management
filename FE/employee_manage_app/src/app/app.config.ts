import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  TeamOutline,
  PlusOutline,
  PlusCircleOutline,
  DeploymentUnitOutline,
  FileTextOutline,
  HomeOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DownOutline,
  InboxOutline,
  EditOutline,
  DeleteOutline,
  UserOutline,
  LockOutline,
  WarningFill,
  MailOutline,
  ApartmentOutline,
  UserAddOutline,
  CloseOutline,
  IdcardOutline
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';

const icons = [
  TeamOutline,
  PlusOutline,
  PlusCircleOutline,
  DeploymentUnitOutline,
  FileTextOutline,
  HomeOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DownOutline,
  InboxOutline,
  EditOutline,
  DeleteOutline,
  UserOutline,
  LockOutline,
  WarningFill,
  MailOutline,
  ApartmentOutline,
  UserAddOutline,
  CloseOutline,
  IdcardOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAnimations(),
    provideNzIcons(icons),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ]
};
