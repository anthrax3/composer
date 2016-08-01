import {
    Component,
    Input,
    trigger,
    style,
    animate,
    state,
    transition
} from "@angular/core";
import {NgFor} from "@angular/common";
import {FileModel} from "../../store/models/fs.models";
import {PropertyInputComponent} from "../forms/inputs/property-input.component";
import {GuiEditorService} from "./gui-editor.service";
import {EditorSidebarComponent} from "./sidebar/editor-sidebar.component";
import {PropertyPosition, VisibilityState} from "./animation.states";
import {CommandLineComponent} from "./commandline/commandline.component";

require("./gui-editor.component.scss");

@Component({
    selector: "gui-editor",
    providers: [GuiEditorService],
    directives: [NgFor, PropertyInputComponent, EditorSidebarComponent, CommandLineComponent],
    animations: [
        trigger("propertyPosition", [
            state("left", style({
                margin: '20px 0 0 0'
            })),
            state("center", style({
                margin: '20px auto'
            })),
            transition("hidden => visible", animate("100ms ease-in")),
            transition("visible => hidden", animate("100ms ease-out"))
        ])
    ],
    template: `
            <main>
                <property-input @propertyPosition="propertyPosition"
                     *ngFor="let property of mockInputProperties"
                     class="propertyInput" 
                     [type]="property.type" 
                     [model]="property.data">
                </property-input>
                
                <editor-sidebar (sidebarVisibility)="togglePropertyPosition($event)"></editor-sidebar>
            </main>
           
            <footer>
                <commandline [content]="commandlineContent"></commandline>
            </footer>
    `
})
export class GuiEditorComponent {
    /** The file that we are going to use to list the properties*/
    @Input()
    private file: FileModel;

    /** Positions of the listed properties */
    propertyPosition: PropertyPosition = "center";

    /* TODO: generate the commandline */
    commandlineContent: string = "This is the command line";

    /* TODO: get tool properties for display, probably create a service that returns a list of properties based on the tool */
    mockInputProperties: Array<any> = [
        {
            type: "DockerRequirement",
            data: {
                dockerPull: "some.docker.image.com"
            }
        },
        {
            type: "baseCommand",
            data: {
                command: "echo"
            }
        }
    ];
    /* mockInputProperties: Array<any> = [
     {
     type: "DockerRequirement",
     data: {}
     },
     {
     type: "baseCommand",
     data: {}
     }
     ];*/

    togglePropertyPosition(sidebarVisibility: VisibilityState) {
        this.propertyPosition = sidebarVisibility === "hidden" ? "center": "left";
    }
}
