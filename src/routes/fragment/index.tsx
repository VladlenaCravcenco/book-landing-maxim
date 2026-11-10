import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { BookReader, BookText } from '~/components/BookReader';
import { FragmentCta } from '~/components/FragmentCta';
import { prepareBook } from '~/lib/book/normalize';
import { chapters } from '~/lib/book/ru';

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
            lang="ru"
            toc={[{ id: ch.id, title: ch.title }]}
            storageKey="maxim-book-fragment-ru"
            homeHref="/"
        >
            <BookText chapters={[ch]} />
            <FragmentCta lang="ru" restCount={data.value.restCount} />
        </BookReader>
    );
});

export const head: DocumentHead = {
    title: 'Первая глава бесплатно — «Позвони мне, я свой номер не менял», Максим Лянка',
    meta: [
        {
            name: 'description',
            content: 'Читайте бесплатно первую главу книги Максима Лянки «Позвони мне, я свой номер не менял». Электронная версия целиком — 199 MDL, доступ сразу после оплаты.',
        },
    ],
};
