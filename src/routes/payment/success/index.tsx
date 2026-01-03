import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="pay-result pay-result--success">
      <div class="pay-result__inner">
        <a class="pay-result__back" href="/">
          ← На главную
        </a>

        <div class="pay-result__badge">Оплата прошла</div>

        <h1 class="pay-result__title">Спасибо! Платёж успешно выполнен.</h1>

        <p class="pay-result__text">
          Если вы покупали электронную книгу — ссылка/доступ будет отправлен на ваш email в ближайшее время.
        </p>

        <div class="pay-result__actions">
          <a class="pay-result__btn pay-result__btn--primary" href="/read">
            Читать книгу
          </a>
          <a class="pay-result__btn pay-result__btn--ghost" href="/">
            Вернуться на сайт
          </a>
        </div>

        <p class="pay-result__hint">
          Если письмо не пришло, проверьте «Спам» или напишите на{' '}
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
  title: 'Оплата прошла успешно — 11book.online',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
};