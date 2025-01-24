import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:11434/api/generate';

  constructor() {}

  getStreamResponse(messages: any[]): Observable<string> {
    return new Observable<string>(observer => {
      // Format messages into prompt
      const prompt = messages
        .map(msg => `${msg.role === 'user' ? 'user' : 'assistant'}: ${msg.content}`)
        .join('\n\n') + '\n\nassistant: ';

      const requestBody = {
        model: 'deepseek-r1:14b',
        prompt: prompt,
        stream: true
      };

      fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        const readChunk = () => {
          reader?.read().then(({ done, value }) => {
            if (done) {
              observer.complete();
              return;
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            lines.forEach(line => {
              try {
                const json = JSON.parse(line);
                if (json.response) {
                  observer.next(json.response);
                }
              } catch (e) {
                console.error('Error parsing JSON:', e);
              }
            });

            readChunk();
          }).catch(err => observer.error(err));
        };

        readChunk();
      })
      .catch(err => observer.error(err));
    });
  }
}