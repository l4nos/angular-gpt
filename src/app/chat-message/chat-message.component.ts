import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import hljs from 'highlight.js';
import {Message} from "../interfaces/Message";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit, AfterViewInit {

  @Input() message!: Message;
  parsedMessage?: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private el: ElementRef, private clipboard: Clipboard) { }

  ngOnInit(): void {
    this.parsedMessage = this.parseMessage(this.message);
  }

  ngAfterViewInit(): void {
    this.highlightCode();
  }

  parseMessage(message: Message): SafeHtml {
    const messageContent = message.content;

    // The regex captures the language (if provided) and the code content.
    let regex = /```(\w+)?\n([\s\S]*?)```/g;

    let newMessage = messageContent.replace(regex, (match, language, code) => {
      let barHtml = language ? `<div class="code-copy-bar flex justify-between items-center bg-gray-800 px-2 py-1">
            <span class="text-gray-400 text-xs">${language}</span>
            <button class="text-xs text-blue-500 hover:text-blue-600 copy-code-btn">Copy</button>
        </div>` : '';
      return barHtml + `<pre><code class="${language}">${code}</code></pre>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(newMessage);
  }


  private highlightCode() {
    this.el.nativeElement.querySelectorAll('pre code').forEach((block: HTMLElement) => {
      hljs.highlightBlock(block);
    });
  }


  isCodeBlock(content: string): boolean {
    return /```([\s\S]*?)```/.test(content);
  }

  copyCode(event: Event): void {
    // Find the closest parent 'pre' element to the clicked copy button.
    const parentPre = (event.target as HTMLElement).closest('pre');
    if (parentPre) {
      const codeBlock = parentPre.querySelector('code');
      if (codeBlock) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(codeBlock);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
        // You can also show a toast message or something here to indicate the code was copied.
      }
    }
  }




}
