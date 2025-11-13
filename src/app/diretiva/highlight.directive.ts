import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input('appHighlight') highlightColor = '#a24bff';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

  // DEBUG: veja no console quando a diretiva for instanciada
    ngOnInit() {
    console.log('✨ HighlightDirective inicializada em', this.el.nativeElement);
        }
    @HostListener('mouseenter')

    @HostListener('mouseenter')
    onMouseEnter() {
     // Tenta aplicar box-shadow no próprio host (div). Renderer2 é mais seguro.
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', `0 8px 20px ${this.highlightColor}`);
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.25s ease');
        console.log('✨ mouseenter em', this.el.nativeElement);
        // opcional para dar destaque no texto
        // this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-2px)');
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
        // this.renderer.removeStyle(this.el.nativeElement, 'transform');
    }

    @HostListener('mouseenter')

    @HostListener('touchstart')
    onEnter() {
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', `0 0 20px ${this.highlightColor}`);
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease');
    }

    @HostListener('mouseleave')

    @HostListener('touchend')
    onLeave() {
        this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    }
}
