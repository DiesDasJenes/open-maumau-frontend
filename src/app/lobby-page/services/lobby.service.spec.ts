import { Socket } from 'ngx-socket-io';
import { LobbyService } from './lobby.service';
import { createMock, Mock } from '@testing-library/angular/jest-utils';
import { Lobby } from 'src/app/common/lobby';
import { Observable } from 'rxjs';


describe('LobbyService', () => {
  let lobbyService: LobbyService;
  let socket: Mock<Socket>

  beforeEach(() => {
    socket = createMock(Socket);
    const observable = createMock(Observable<Lobby>)
    socket.fromEvent.mockReturnValue(observable);
    lobbyService = new LobbyService(socket);
  });

  it('create lobby with given id and creator information', () => {
    const id = "some-id";
    const creatorAlias = "some-player-alias";
    const expectedLobby: Lobby = { id: id, players: [{alias: creatorAlias, ready: false}]}
    lobbyService.createLobby(id,creatorAlias);

    expect(socket.emit).toBeCalledWith("addLobby", expectedLobby);
  });
});
