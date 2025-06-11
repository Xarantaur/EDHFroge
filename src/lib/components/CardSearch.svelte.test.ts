import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import CardSearch from './CardSearch.svelte';


vi.mock('$lib/utils/scryfall', () => ({
  autocompleteCardNames: vi.fn().mockResolvedValue(['Lightning Bolt']),
  searchCardByName: vi.fn().mockResolvedValue({ name: 'Lightning Bolt' }),
}));
vi.mock('$lib/utils/transformToParsedDeckCard', () => ({
  transformToParsedDeckCard: vi.fn().mockImplementation((card) => ({ card })),
}));
vi.mock('$lib/stores/previewCardStore', () => ({
  previewCard: { set: vi.fn() },
}));

describe('CardSearch', () => {
  it('renders and updates input value', async () => {
    const onAddCard = vi.fn();

    const { getByPlaceholderText } = render(CardSearch, {
      props: { title: 'Search Cards', onAddCard },
    });

    const input = getByPlaceholderText('Search for a card name');

    await fireEvent.input(input, { target: { value: 'Bolt' } });

    expect(input).toHaveValue('Bolt');
  });
});
