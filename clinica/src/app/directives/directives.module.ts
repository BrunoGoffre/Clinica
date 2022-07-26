import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaptchaDirective } from '../directives/captcha.directive'
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
    declarations: [
        CaptchaDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        RecaptchaModule
    ],
    exports: [
        CaptchaDirective,
    ],
})
export class DirectivesModule { }
