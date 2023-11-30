import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDecimalFormat',
})
export class ChangeDecimalFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      // Reemplaza las comas con un carácter temporal
      const sinComas = (value as any).replace(/,/g, '|');
      // Reemplaza los puntos con comas y el carácter temporal con puntos
      const invertido = sinComas.replace(/\./g, ',').replace(/\|/g, '.');
      return invertido;
    }
    return null;
  }
}
