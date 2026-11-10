import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PaymentSuccess } from '~/components/PaymentSuccess';

export default component$(() => <PaymentSuccess lang="ro" />);

export const head: DocumentHead = {
  title: 'Plată reușită — 11book.online',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
};
