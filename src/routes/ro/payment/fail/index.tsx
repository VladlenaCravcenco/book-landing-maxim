import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="pay-result pay-result--fail">
      <div class="pay-result__inner">
        <a class="pay-result__back" href="/ro">
          ← Înapoi la pagina principală
        </a>

        <div class="pay-result__badge pay-result__badge--fail">Plata eșuată</div>

        <h1 class="pay-result__title">Plata nu a fost finalizată.</h1>

        <p class="pay-result__text">
          Încercați din nou sau folosiți un alt card. Banii nu sunt retrași dacă plata nu este confirmată.
        </p>

        <div class="pay-result__actions">
          <a class="pay-result__btn pay-result__btn--primary" href="/ro">
            Încearcă din nou
          </a>
          <a class="pay-result__btn pay-result__btn--ghost" href="/ro/policies#terms">
            Termeni & condiții
          </a>
        </div>

        <p class="pay-result__hint">
          Dacă problema persistă, scrieți la{' '}
          <a class="pay-result__link" href="mailto:support@11book.online">
            support@11book.online
          </a>
          .
        </p>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Eroare plată — 11book.online',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
};