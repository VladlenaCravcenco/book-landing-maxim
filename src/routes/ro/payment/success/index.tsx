import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="pay-result pay-result--success">
      <div class="pay-result__inner">
        <a class="pay-result__back" href="/ro">
          ← Înapoi la pagina principală
        </a>

        <div class="pay-result__badge">Plata reușită</div>

        <h1 class="pay-result__title">Mulțumim! Plata a fost efectuată cu succes.</h1>

        <p class="pay-result__text">
          Dacă ați cumpărat cartea electronică — linkul/accesul va fi trimis pe email în cel mai scurt timp.
        </p>

        <div class="pay-result__actions">
          <a class="pay-result__btn pay-result__btn--primary" href="/ro/read">
            Citește cartea
          </a>
          <a class="pay-result__btn pay-result__btn--ghost" href="/ro">
            Înapoi la site
          </a>
        </div>

        <p class="pay-result__hint">
          Dacă emailul nu a ajuns, verificați „Spam” sau scrieți la{' '}
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
  title: 'Plată reușită — 11book.online',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
};