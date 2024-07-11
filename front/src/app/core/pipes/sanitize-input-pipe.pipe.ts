import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeInputPipe',
  standalone: true
})
export class SanitizeInputPipePipe implements PipeTransform {

  transform(value: string): string  {
    return value.replace(/[<>/"'`;{}]/g, '')
  }

}
