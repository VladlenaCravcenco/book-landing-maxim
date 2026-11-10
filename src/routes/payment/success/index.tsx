import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PaymentSuccess } from '~/components/PaymentSuccess';

export default component$(() => <PaymentSuccess lang="ru" />);

export const head: DocumentHead = {
  title: 'Оплата прошла успешно — 11book.online',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
};
