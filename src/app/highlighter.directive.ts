import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }
    @Input() set appHighlighter(condition: boolean) {
        const role = localStorage.getItem('role');
        if (role === '1') {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();        }
        }

}
