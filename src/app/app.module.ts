import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';
import { PlayerReadinessTableComponent } from './lobby-page/components/player-readiness-table/player-readiness-table.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ReactiveFormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LobbyPageComponent,
    PlayerReadinessTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
