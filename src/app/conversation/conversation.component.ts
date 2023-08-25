import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../interfaces/Message";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {

  messages: Message[] = [];
  currentQuestion: string | null | undefined;
  conversationId: string | null | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.conversationId = this.route.snapshot.paramMap.get('conversationID');
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.http.get<string[]>(environment.apiURL + 'conversations/' + this.conversationId)
      .subscribe((data: any) => {
        this.messages = data.messages;
      });
  }

  submitQuestion(): void {
    if (!this.currentQuestion) return;
    const payload = { question: this.currentQuestion };

    this.http.post(environment.apiURL + 'conversations/' + this.conversationId, payload)
      .subscribe((response: any) => {
        this.messages.push(response.question as Message);   // Assuming API sends back just the answer string.
        this.messages.push(response.answer as Message);   // Assuming API sends back just the answer string.
        this.currentQuestion = '';                // Clear the input box.
      });
  }

}
