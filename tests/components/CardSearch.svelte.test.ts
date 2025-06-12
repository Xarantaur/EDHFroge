import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, findByText, findAllByText} from '@testing-library/svelte';
import CardSearch from '../../src/lib/components/CardSearch.svelte';
import { autocompleteCardNames } from '$lib/utils/scryfall';
import CardHoverTrigger from '$lib/components/CardHoverTrigger.svelte';
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';


vi.mock('$lib/utils/scryfall', () => ({
  autocompleteCardNames: vi.fn().mockResolvedValue(['Lightning Bolt']),
  searchCardByName: vi.fn().mockResolvedValue({ name: 'Lightning Bolt' }),
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
      cardName: card.name
    }
  })),
}));

const mockCard: ParsedDeckCard = {
  card: {
    id: 'card-1',
    deckId: 'deck-1',
    cardName: 'Lightning Bolt',
    typeLine: 'Instant',
    cmc: 1,
    quantity: 1,
  },
  images: [
    {
      imageType: 'normal',
      uri: 'https://example.com/lightning-bolt.jpg',
    },
  ],
  colors: [
    {
      color: 'R',
    },
  ],
  colorIdentity: [
    {
      color: 'R',
    },
  ],
};


describe('CardHoverTrigger', () => {
  it('sets previewCard on mouseenter and clears on mouseleave', async () => {
    const { getByText } = render(CardHoverTrigger, {
      props: {
        card: mockCard,
        commander: null
      }
    }) ;
    const span = getByText('Lightning Bolt');

    await fireEvent.mouseEnter(span);
    const { previewCard } = await import('$lib/stores/previewCardStore');
    expect(previewCard.set).toHaveBeenCalledWith({ card: mockCard, commander: null });

    await fireEvent.mouseLeave(span)
    expect(previewCard.set).toHaveBeenCalledWith(null)  
  })
})


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
 const { getByPlaceholderText, findAllByText } = render(CardSearch, {
  props: { title: 'Search Cards', onAddCard },
});

const input = getByPlaceholderText('Search for a card name');
await fireEvent.input(input, { target: { value: 'Lightning Bolt' } });

const suggestions = await findAllByText('Lightning Bolt');
const suggestion = suggestions[0];

expect(suggestion).toBeInTheDocument();
})

it('calls onAddCard when suggestion is clicked', async () => {
  const onAddCard = vi.fn();
  const { getByPlaceholderText, findAllByText } = render(CardSearch, {
    props: { title: 'Search Cards', onAddCard },
  });

  const input = getByPlaceholderText('Search for a card name');
  await fireEvent.input(input, { target: { value: 'Lightning Bolt' } });

  const suggestions = await findAllByText('Lightning Bolt');
const suggestion = suggestions[0];
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
