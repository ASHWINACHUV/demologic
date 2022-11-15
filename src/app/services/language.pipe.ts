import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  constructor(private translate: TranslateService) {}
  transform(key: any): any {
    return this.translate.data[key] || key;
  }


}
