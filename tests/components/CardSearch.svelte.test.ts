import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, findByText } from '@testing-library/svelte';
import CardSearch from '../../src/lib/components/CardSearch.svelte';
import { autocompleteCardNames } from '$lib/utils/scryfall';


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
vi.mock('$lib/utils/debounce', () => ({
  debounce: (fn: any) => fn
}))

vi.mock('$lib/utils/transformToParsedDeckCard', () => ({
  transformToParsedDeckCard: vi.fn().mockImplementation((card) => ({
    card: {
      cardName: card.name // use the name field as cardName
    }
  })),
}));


it('calls autocompleteCardNames on input', async () => {
  const onAddCard = vi.fn();
  const { getByPlaceholderText } = render(CardSearch, {
    props: { title: 'Search Cards', onAddCard},
  });
  const input = getByPlaceholderText('Search for a card name');
  await fireEvent.input(input, { target: { value: 'Bolt' }})
  
  expect(autocompleteCardNames).toHaveBeenCalledWith('Bolt');
})

it('displays autoomplete results', async () => {
  const onAddCard = vi.fn();
 const { getByPlaceholderText, findByText } = render(CardSearch, {
  props: { title: 'Search Cards', onAddCard },
});

const input = getByPlaceholderText('Search for a card name');
await fireEvent.input(input, { target: { value: 'Lightning Bolt' } });

const suggestion = await findByText(
  (_: unknown, element: Element | null) =>
    Boolean(element?.tagName === 'LI' && element.textContent?.includes('Lightning Bolt'))
);

expect(suggestion).toBeInTheDocument();


})

it('calls onAddCard when suggestion is clicked', async () => {
  const onAddCard = vi.fn();
  const { getByPlaceholderText, findByText } = render(CardSearch, {
    props: { title: 'Search Cards', onAddCard },
  });

  const input = getByPlaceholderText('Search for a card name');
  await fireEvent.input(input, { target: { value: 'Lightning Bolt' } });

  const suggestion = await findByText(
    (_: unknown, element: Element | null) =>
      Boolean(
        element?.tagName === 'LI' &&
        element.textContent?.includes('Lightning Bolt')
      )
  );

  await fireEvent.click(suggestion);

  expect(onAddCard).toHaveBeenCalledWith(
    expect.objectContaining({
      card: expect.objectContaining({ cardName: 'Lightning Bolt' }),
    })
  );
});


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
