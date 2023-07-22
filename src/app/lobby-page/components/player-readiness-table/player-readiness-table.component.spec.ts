import { render, screen } from '@testing-library/angular';
import { PlayerReadinessTableComponent } from './player-readiness-table.component';
import { FormArray, FormControl } from '@angular/forms';

const renderComponent = async () => {
  const initialPlayerBase: FormArray<FormControl<string | null>> = new FormArray([new FormControl("player")])
  const {container, fixture, detectChanges } = await render(PlayerReadinessTableComponent, {
    imports: [],
    declarations: [PlayerReadinessTableComponent],
    componentProperties: {players: initialPlayerBase},
  })

  return {
    container,
    fixture,
    detectChanges
  }
}

describe('PlayerReadinessTableComponent', () => {
 
  it('should create', async () => {
    const {container} =  await renderComponent();
    expect(container).toBeTruthy();
  });

  describe('should render', () => {

    beforeEach(async () => {
        await renderComponent();
    });

    it('a table', async () => {
     const table = screen.getByRole('table', { name: 'players-readiness-table' })
     expect(table).toBeDefined();
   });

   it('a table row for the user: player', async () => {
    const row = screen.getByText('player');
    expect(row).toBeInTheDocument();
  });

 });
});
