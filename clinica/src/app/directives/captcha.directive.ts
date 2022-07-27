import { Directive, ViewContainerRef } from '@angular/core';
import { RecaptchaComponent, RecaptchaLoaderService } from 'ng-recaptcha';


@Directive({
  selector: '[CustomCaptcha]',
  providers: [RecaptchaLoaderService],
})
export class CaptchaDirective {

  constructor(private element: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.element.clear();
    const captcha = this.element.createComponent(RecaptchaComponent);
    captcha.instance.siteKey = '6Le1OhkhAAAAAM7Az5UtwsHwkPTX9USl_8b0cZZY';
  }
}
