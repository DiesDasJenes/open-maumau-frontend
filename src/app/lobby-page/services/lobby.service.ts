import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { Lobby } from 'src/app/common/lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private currentLobby: Lobby | undefined;
  lobbySub: Subscription | undefined;

  constructor(private socket: Socket) {
    this.lobbySub = this.socket.fromEvent<Lobby>('lobby').subscribe(lobby => this.currentLobby = lobby);
   }

  getLobby(id: string) {
    return this.socket.emit('getLobby', id);
  }

  createLobby(id: string, creatorAlias: string) {
    const lobby: Lobby = { id: id, players: [{alias: creatorAlias, ready: false }] };
    return this.socket.emit('addLobby', lobby);
  }

  editLobby(lobby: Lobby) {
    return this.socket.emit('editLobby', lobby);
  }

  unsubscribeLobby() {
    this.lobbySub?.unsubscribe();
  }
}
