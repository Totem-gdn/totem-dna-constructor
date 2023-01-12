import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";



@Component({
    selector: 'property-field',
    templateUrl: './property-field.component.html',
    styleUrls: ['./property-field.component.scss']
})

export class PropertyFieldComponent implements OnDestroy {

    @Output() addForm = new EventEmitter<any>();
    @Output() valueChanges = new EventEmitter<any>();

    @Input() label: string = '';
    @Input() placeholder = '';
    
    sub!: Subscription;

    control = new FormControl('')

    ngOnInit() {
        const name = this.placeholder == 'Offset' ? 'start' : this.placeholder;
        const control = {name: name.toLowerCase(), control: this.control};
        this.addForm.emit(control);

        this.control$();
    }

    control$() {
        this.sub = this.control.valueChanges.subscribe(val => {
            const name = this.placeholder == 'Offset' ? 'start' : this.placeholder;
            const control = { name: name.toLowerCase(), value: val}
            this.valueChanges.emit(control);
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}