import { Component, OnInit } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { PopupsService, POPUP_STATE } from "@app/core/services/popups.service";
import { PropertiesService } from "@app/core/services/properties.service";

@Component({
    selector: 'template-popup',
    templateUrl: './new-template.component.html',
    styleUrls: ['./new-template.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class TemplatePopupComponent implements OnInit {
    get popupType() { return POPUP_STATE }

    constructor(private popupService: PopupsService,
                private propertiesService: PropertiesService) {}

    popup!: POPUP_STATE;

    ngOnInit(): void {
        this.popupService.templatePopup$
            .subscribe(state => {
                this.popup = state;
            })
    }

    onAdd() {
        this.popupService.templatePopup = POPUP_STATE.ACCEPTED;
    }

    onCancel() {
        this.popupService.templatePopup = POPUP_STATE.REJECTED;
    }
}