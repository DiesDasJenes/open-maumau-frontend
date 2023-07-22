import { LobbyPageComponent } from './lobby-page.component';
import { createMock, Mock } from '@testing-library/angular/jest-utils';
import { ActivatedRoute, Router } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { PlayerReadinessTableComponent } from './components/player-readiness-table/player-readiness-table.component';
import userEvent from '@testing-library/user-event';
import { BasePath } from '../app-routing.module';
import { LobbyService } from './services/lobby.service';

function createMocks():{
  router: Mock<Router>;
  activatedRoute: unknown;
  lobbyService: Mock<LobbyService>;
} {

  const router: Mock<Router> = createMock(Router);
  const activatedRoute = {
    snapshot: {
      params: {
        id: "12334",
      },
    },
  };
  const lobbyService: Mock<LobbyService> = createMock(LobbyService); 

  return {
    router,
    activatedRoute,
    lobbyService,
  }
}

const renderComponent = async () => {
   const {router, activatedRoute, lobbyService} = createMocks();

    const {container, fixture, detectChanges } = await render(LobbyPageComponent, {
    imports: [],
    declarations: [PlayerReadinessTableComponent],
    providers: [],
    componentProviders: [
      { provide: Router, useValue: router },
      { provide: ActivatedRoute, useValue: activatedRoute },
      { provide: LobbyService, useValue: lobbyService }
    ],
  })

  return {
    container,
    fixture,
    detectChanges,
    router
  }
}

describe('LobbyPageComponent', () => {
  const user = userEvent.setup();

  it('should create', async () => {
    const {container} =  await renderComponent();
    expect(container).toBeTruthy();
  });

  describe('should render', () => {

    beforeEach(async () => {
        await renderComponent();
    });

    it('the button to leave the lobby', async () => {
     const button = screen.getByRole('button', { name: 'Leave Lobby' })
     expect(button).toBeDefined();
   });

   it('the button to set readiness', async () => {
     const button = screen.getByRole('button', { name: 'Set to ready' })
     expect(button).toBeDefined();
   });

   it('the lobby code display', async () => {
     const label = screen.getByRole('lobby-code-display')
     expect(label).toBeDefined();
     expect(label.innerHTML).toBe("Code: 12334");
   });

   it('the Rules of the game', async () => {
     const list = screen.getByRole('list')
     expect(list).toBeDefined();
   });
 });

 describe('should navigate to another page', () => {
  let routerMock: Mock<Router>;
  beforeEach(async () => {
      const { router } = await renderComponent();
      routerMock = router;
  });

  it('after pressing leave lobby user should be sent to landingpage', async () => {
   const button = screen.getByRole('button', { name: 'Leave Lobby' })
   await user.click(button);
   expect(routerMock.navigateByUrl).toBeCalledTimes(1);
   const url = routerMock.navigateByUrl.mock.calls[0]
   expect(url[0]).toBe(BasePath);
 });

});
});
