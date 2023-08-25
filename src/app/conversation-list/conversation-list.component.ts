import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {

  conversations: any[] = []; // assuming each conversation is an object, adjust type accordingly

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchConversations();
  }

  fetchConversations(): void {
    this.http.get<any[]>(environment.apiURL + 'conversations')
      .subscribe((data: any) => {
        this.conversations = data;
      });
  }

  addConversation(): void {
    this.http.post(environment.apiURL + 'conversations', {})
      .subscribe((response: any) => {
        // Assuming the response is the new conversation object
        this.conversations.push(response);
      });
  }

}
