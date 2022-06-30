import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHorario'
})
export class FormatHorarioPipe implements PipeTransform {

  transform(value: string | undefined,): string {
    let hora = Number.parseInt(value as string);
    if (hora >= 0 && hora < 12) {
      return value + ' AM';
    } else {
      return value + ' PM';
    }
  }

}
