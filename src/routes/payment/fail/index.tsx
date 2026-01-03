import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="pay-result pay-result--fail">
      <div class="pay-result__inner">
        <a class="pay-result__back" href="/">
          ← На главную
        </a>

        <div class="pay-result__badge pay-result__badge--fail">Оплата не прошла</div>

        <h1 class="pay-result__title">Платёж не был завершён.</h1>

        <p class="pay-result__text">
          Попробуйте ещё раз или используйте другую карту. Деньги не списываются, если платёж не подтверждён.
        </p>

        <div class="pay-result__actions">
          <a class="pay-result__btn pay-result__btn--primary" href="/">
            Попробовать снова
          </a>
          <a class="pay-result__btn pay-result__btn--ghost" href="/policies#terms">
            Условия оплаты
          </a>
        </div>

        <p class="pay-result__hint">
          Если ошибка повторяется — напишите на{' '}
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
  title: 'Ошибка оплаты — 11book.online',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
};
