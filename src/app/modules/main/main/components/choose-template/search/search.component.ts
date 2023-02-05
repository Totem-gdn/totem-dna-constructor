import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs";

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})  

export class SearchComponent {
    @Input() set reset(any: any) {
        this.control.patchValue('');
    }
    @Output() search = new EventEmitter<string>();
    @Output() blur = new EventEmitter<any>();
    control = new FormControl('')

    ngOnInit() {
        this.control.valueChanges
        .pipe(debounceTime(250))
        .subscribe(value => {
          this.search.emit(value?.toLowerCase());
        })
    }

    onBlur(e: any) {
        this.blur.emit(e);
    }
}