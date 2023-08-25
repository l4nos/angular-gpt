import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../interfaces/Message";
import {environment} from "../../environments/environment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, OnDestroy{

  messages: Message[] = [];
  currentQuestion: string | null | undefined;
  conversationId: string | null | undefined;
  routeSubscription?: Subscription;
  isWaitingForResponse: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params)=>{
      this.conversationId = params['conversationID'];
      this.fetchMessages();
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  fetchMessages(): void {
    this.http.get<string[]>(environment.apiURL + 'conversations/' + this.conversationId)
      .subscribe((data: any) => {
        this.messages = data.messages;
      });
  }

  submitQuestion(): void {
    this.isWaitingForResponse = true; // Disable button and input when sending message

    if (!this.currentQuestion) return;
    const payload = { question: this.currentQuestion };
    this.currentQuestion = '';                // Clear the input box.

    this.http.post(environment.apiURL + 'conversations/' + this.conversationId, payload)
      .subscribe((response: any) => {
        this.messages.push(response.question as Message);   // Assuming API sends back just the answer string.
        this.messages.push(response.answer as Message);   // Assuming API sends back just the answer string.
        this.isWaitingForResponse = false; // Enable button and input when response is received
      });
  }

}
