import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { LandingPageComponent } from './landing-page.component';
import { Router } from '@angular/router';
import { createMock, Mock  } from '@testing-library/angular/jest-utils'


const renderComponent = async () => {
  const router: Mock<Router> = createMock(Router);

    const {container, fixture, detectChanges } = await render(LandingPageComponent, {
    imports: [],
    declarations: [],
    providers: [],
    componentProviders: [
      { provide: Router, useValue: router }
    ],
  })

  return {
    container,
    fixture,
    detectChanges,
    router
  }
}

describe('LandingPageComponent', () => {
  const user = userEvent.setup();

  it('should create', async () => {
    const {container} =  await renderComponent();
    expect(container).toBeTruthy();
  });

  describe('should render', () => {

     beforeEach(async () => {
         await renderComponent();
     });

     it('the button to join a game', async () => {
      const button = screen.getByRole('button', { name: 'Join Game' })
      expect(button).toBeDefined();
    });

    it('the button to create a game', async () => {
      const button = screen.getByRole('button', { name: 'Create Game' })
      expect(button).toBeDefined();
    });

    it('the input field for the player alias to join a game', async () => {
      const textBox = screen.getByRole('textbox', { name: 'player-alias' })
      expect(textBox).toBeDefined();
    });

    it('the input field for the lobby code to join a game', async () => {
      const textBox = screen.getByRole('textbox', { name: 'lobby-code' })
      expect(textBox).toBeDefined();
    });

  });

  describe('should validate on', () => {
  
  beforeEach(async () => {
     await renderComponent();
  });

  it('clicking the create button that the user has entered a name', async () => {
    const textBoxPlayerName = screen.getByRole('textbox', { name: 'player-alias' })
    const button = screen.getByRole('button', { name: 'Create Game' })
    await user.click(button);

    expect(textBoxPlayerName).toBeInvalid();
  });

});

  describe('should navigate to LobbyCompenent', () => {
      let routerMock: Mock<Router>;
    beforeEach(async () => {
        const {router} = await renderComponent();
        routerMock = router;
    });

    it('the user is redirected to the lobby after pushing the create button', async () => {
      const button = screen.getByRole('button', { name: 'Create Game' })
      await user.click(button);
      expect(routerMock.navigateByUrl).toBeCalledTimes(1)
    });

    it('the lobby ID is generated and added to the url', async () => {
      const button = screen.getByRole('button', { name: 'Create Game' })
      await user.click(button);
      const regex = /\S+\/lobby\/\S+/gm;
      const url = routerMock.navigateByUrl.mock.calls[0];
      expect(url[0]).toMatch(regex);
    });
  });
});
