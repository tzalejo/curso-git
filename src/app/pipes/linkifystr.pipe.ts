import { Pipe, PipeTransform } from "@angular/core";
// esta libreria me permite tomar texto, y si este tiene un vinculo lo formatea como tal
import linkifyStr from 'linkifyjs/string'; 
// import linkifyStr from 'linkifyjs/lib/linkify-string';
@Pipe({name: 'linkifystr'})
export class LinkifystrPipe implements PipeTransform{
  transform(str: string): string{
    return str ? linkifyStr(str,{target:'_system'}) : str;
  }
}
