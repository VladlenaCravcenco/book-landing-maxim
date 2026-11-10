import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead, type RequestHandler } from '@builder.io/qwik-city';
import { BookReader, BookText } from '~/components/BookReader';
import { ReadAccessGate } from '~/components/ReadAccessGate';
import { hasAccess } from '~/lib/access';
import { prepareBook } from '~/lib/book/normalize';
import { chapters } from '~/lib/book/ru';
import { handleReadRequest } from '~/lib/read-route';

export const onRequest: RequestHandler = (ev) => handleReadRequest(ev);

// Текст книги отдаётся только с сервера и только при наличии доступа.
export const useBook = routeLoader$(async (ev) => {
    if (!(await hasAccess(ev))) return { access: false, chapters: [] };
    return { access: true, chapters: prepareBook(chapters) };
});

export default component$(() => {
    const book = useBook();
    if (!book.value.access) return <ReadAccessGate lang="ru" />;

    const toc = book.value.chapters.map(({ id, title }) => ({ id, title }));
    return (
        <BookReader lang="ru" toc={toc}>
            <BookText chapters={book.value.chapters} />
        </BookReader>
    );
});

export const head: DocumentHead = {
    title: 'Позвони мне, я свой номер не менял — онлайн чтение',
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
};
