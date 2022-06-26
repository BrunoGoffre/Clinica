import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'EspecialidadFoto' })
export class EspecialidadFotoPipe implements PipeTransform {

  transform(value: string,): string {
    switch (value) {
      case 'Traumatologo':
        return 'https://thumbs.dreamstime.com/b/icono-de-traumatolog%C3%ADa-la-colecci%C3%B3n-m%C3%A9dica-elemento-l%C3%ADnea-simple-s%C3%ADmbolo-para-plantillas-dise%C3%B1o-web-e-infograf%C3%ADas-elementos-172442579.jpg';
      case 'Medico clinico':
        return 'https://w7.pngwing.com/pngs/898/226/png-transparent-physician-computer-icons-medicine-health-care-clinic-icon-physician-miscellaneous-hospital-nursing.png';
      case 'Odontologo':
        return 'https://thumbs.dreamstime.com/b/icono-del-dentista-81260702.jpg';
      default:
        return 'https://w7.pngwing.com/pngs/898/226/png-transparent-physician-computer-icons-medicine-health-care-clinic-icon-physician-miscellaneous-hospital-nursing.png';
    }
  }
}
