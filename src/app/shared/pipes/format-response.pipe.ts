import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatResponse',
  standalone: true
})
export class FormatResponsePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const formatted = value
      .replace(/<Think>(.*?)<\/Think>/gs, (_, text) => 
        `<div class="think-bubble">${text}</div>`
      )
      .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
      .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
      
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}