import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ActivateComponent } from 'src/app/pages/activate/activate.component';
import { ForgotComponent } from 'src/app/pages/forgot/forgot.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'forgot-password',
        component: ForgotComponent
    },
    {
        path: 'forgot-password/:id',
        component: ForgotComponent
    },
    { path: 'active', component: ActivateComponent }
];
