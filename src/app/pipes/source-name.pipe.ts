import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sourceName',
    standalone: true
})
export class SourceNamePipe implements PipeTransform {
    transform(source: any): string {
        if (!source) return 'Fonte desconhecida';

    // Caso o source seja um objeto (ex: { name: 'ESPN' })
    if (typeof source === 'object' && source.name) {
        return this.formatName(source.name);
    }

    // Caso seja uma string direta
    if (typeof source === 'string') {
        return this.formatName(source);
    }

    return 'Fonte desconhecida';
    }

    private formatName(name: string): string {
    // Remove espaços extras e capitaliza cada palavra
    return name
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());
    }
}
