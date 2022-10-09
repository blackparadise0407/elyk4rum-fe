import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

type Variant = 'success' | 'warning' | 'error';

const defaultOptions = {
  closeButton: false,
  enableHtml: true,
} as IndividualConfig;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  public enqueue(
    msg: string,
    opts: Partial<IndividualConfig> & {
      variant?: Variant;
    } = {}
  ) {
    const variant = opts.variant ?? 'success';
    const toastClass = this.getWrapperToastCls(variant);
    this.toastr.show(this.getMessageTemplate(msg, variant), undefined, {
      ...opts,
      ...defaultOptions,
    });
  }

  private getMessageTemplate(message: string, v: Variant) {
    switch (v) {
      case 'error':
        return `<p class='font-medium text-red-500'>${message}</p>`;
      case 'success':
        return `<p class='font-medium text-green-500'>${message}</p>`;
      case 'warning':
        return `<p class='font-medium text-orange-500'>${message}</p>`;
      default:
        return message;
    }
  }

  private getWrapperToastCls(v: Variant) {
    let commonCls = 'mb-3 p-3 rounded shadow hover:shadow-md transition-shadow';
    let privateCls = '';
    switch (v) {
      case 'error':
        privateCls = 'bg-red-500';
        break;
      case 'success':
        privateCls = 'bg-green-500';
        break;
      case 'warning':
        privateCls = 'bg-orange-500';
        break;
      default:
        privateCls = '';
        break;
    }
    return [commonCls, privateCls].join(' ');
  }
}
