import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ApiService } from "./app/services/api.service";
import { Message } from "@shared/interfaces/message";
import { FormatResponsePipe } from "@shared/pipes/format-response.pipe";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, CommonModule, FormatResponsePipe],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
          <p class="text-gray-600">
            An AI assistant that can help you with your questions.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="space-y-4">
            <!-- Conversation History -->
            <div
              #conversationHistory
              class="h-96 overflow-y-auto space-y-4 mb-4 scrollbar-thin"
              (scroll)="checkScrollPosition()"
            >
              <div *ngFor="let message of messages" class="space-y-2">
                <div *ngIf="message.role === 'user'" class="flex justify-end">
                  <div
                    class="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]"
                  >
                    {{ message.content }}
                  </div>
                </div>
                <div
                  *ngIf="message.role === 'assistant'"
                  class="flex justify-start"
                >
                  <div
                    class="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]"
                  >
                    <div
                      class="prose prose-sm text-gray-700"
                      [innerHTML]="message.content | formatResponse"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input Area -->
            <div>
              <textarea
                [(ngModel)]="prompt"
                (keydown.enter)="onKeydown($event)"
                [disabled]="isLoading"
                class="input-field h-32 resize-none"
                placeholder="Type your message..."
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                (click)="sendPrompt()"
                [disabled]="isLoading || !prompt"
                class="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? "Processing..." : "Send" }}
              </button>
            </div>

            <div *ngIf="error" class="mt-4 p-4 bg-red-50 rounded-lg">
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class App implements AfterViewChecked {
  @ViewChild("conversationHistory") private conversationHistory!: ElementRef;
  private apiService = inject(ApiService);
  private shouldAutoScroll = true;

  prompt = "";
  messages: Message[] = [];
  error = "";
  isLoading = false;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (!this.shouldAutoScroll) return;

    try {
      if (this.conversationHistory) {
        setTimeout(() => {
          this.conversationHistory.nativeElement.scrollTop =
            this.conversationHistory.nativeElement.scrollHeight;
        }, 0);
      }
    } catch (err) {
      console.error("Scroll error:", err);
    }
  }

  checkScrollPosition(): void {
    this.shouldAutoScroll = false;
  }

  sendPrompt() {
    if (!this.prompt.trim() || this.isLoading) return;

    // Add user message to conversation
    this.messages = [...this.messages, { content: this.prompt, role: "user" }];

    // Create empty assistant message for streaming
    this.messages = [...this.messages, { content: "", role: "assistant" }];

    const originalPrompt = this.prompt;
    this.prompt = "";
    this.error = "";
    this.isLoading = true;

    this.apiService.getStreamResponse(this.messages).subscribe({
      next: (chunk) => {
        this.messages = this.messages.map((msg, index) => {
          if (index === this.messages.length - 1) {
            return {
              ...msg,
              content: msg.content + chunk,
            };
          }
          return msg;
        });
        this.scrollToBottom();
      },
      error: (err) => {
        this.error = "An error occurred. Please try again.";
        this.isLoading = false;
        this.messages = this.messages.filter((msg) => msg.content !== "");
        this.prompt = originalPrompt; // Restore the original prompt
      },
      complete: () => {
        this.isLoading = false;
        this.shouldAutoScroll = true;
      },
    });
  }

  onKeydown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.sendPrompt();
    }
  }
}

bootstrapApplication(App);
