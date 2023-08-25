import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {ConversationComponent} from "./conversation/conversation.component";

// Define your routes here
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: ':conversationID', component: ConversationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
