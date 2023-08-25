import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {AppRoutingModule} from "./app-routing.module";
import { WelcomeComponent } from './welcome/welcome.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ConversationListComponent,
    ConversationComponent,
    ChatMessageComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
