import { Pipe, PipeTransform } from "@angular/core";
import { PROPERTIES } from "@app/core/enums/properties.enum";

@Pipe({
    name: 'mapProperty'
})

export class MapPropertyPipe implements PipeTransform {

    transform(value: PROPERTIES | undefined) {
        if(value == PROPERTIES.BOOLEAN) return 'boolean';
        if(value == PROPERTIES.COLOR) return 'color';
        if(value == PROPERTIES.ENUM) return 'enum';
        if(value == PROPERTIES.INTEGER) return 'integer';
        if(value == PROPERTIES.RANGE) return 'range';
        return '';
    }   
}