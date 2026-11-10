import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { BookReader, BookText } from '~/components/BookReader';
import { FragmentCta } from '~/components/FragmentCta';
import { prepareBook } from '~/lib/book/normalize';
import { chapters } from '~/lib/book/ro';

// Бесплатный фрагмент: только первая глава (chapters[0] — «О книге», chapters[1] — глава 1).
// Остальные главы на эту страницу не попадают.
export const useFragment = routeLoader$(() => {
    const [first] = prepareBook([chapters[1]]);
    return { chapter: first, restCount: chapters.length - 2 };
});

export default component$(() => {
    const data = useFragment();
    const ch = data.value.chapter;
    return (
        <BookReader
            lang="ro"
            toc={[{ id: ch.id, title: ch.title }]}
            storageKey="maxim-book-fragment-ro"
            homeHref="/ro/"
        >
            <BookText chapters={[ch]} />
            <FragmentCta lang="ro" restCount={data.value.restCount} />
        </BookReader>
    );
});

export const head: DocumentHead = {
    title: 'Primul capitol gratuit — „Sună-mă, numărul meu nu s-a schimbat”, Maxim Leanca',
    meta: [
        {
            name: 'description',
            content: 'Citiți gratuit primul capitol al cărții lui Maxim Leanca „Sună-mă, numărul meu nu s-a schimbat”. Cartea electronică completă — 199 MDL, acces imediat după plată.',
        },
    ],
};
