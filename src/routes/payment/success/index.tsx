import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();

  const sending = useSignal(false);
  const sent = useSignal(false);
  const sendError = useSignal<string>('');

  useVisibleTask$(async () => {
    // Важно: useVisibleTask$ выполняется только в браузере (там есть localStorage)
    if (sent.value || sending.value) return;

    const payId = String(loc.url.searchParams.get('payId') || '');
    const orderId = String(loc.url.searchParams.get('orderId') || '');
    const email = localStorage.getItem('lastEmail') || '';

    // Если нет email — не можем отправить письмо автоматически
    if (!email) {
      sendError.value =
        'Мы не нашли email в браузере. Пожалуйста, напишите на support@11book.online, и мы вышлем доступ вручную.';
      return;
    }

    sending.value = true;
    sendError.value = '';

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          language: 'ru',
          payId,
          orderId,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        sendError.value = data?.error || `Ошибка отправки письма (HTTP ${res.status})`;
        sending.value = false;
        return;
      }

      sent.value = true;
      sending.value = false;
    } catch {
      sendError.value = 'Ошибка сети при отправке письма. Попробуйте обновить страницу.';
      sending.value = false;
    }
  });

  return (
    <section class="pay-result pay-result--success">
      <div class="pay-result__inner">
        <a class="pay-result__back" href="/">
          ← На главную
        </a>

        <div class="pay-result__badge">Оплата прошла</div>

        <h1 class="pay-result__title">Спасибо! Платёж успешно выполнен.</h1>

        {/* Статус отправки */}
        {sending.value && (
          <p class="pay-result__text">
            Отправляем письмо на ваш email… (обычно это занимает 10–30 секунд)
          </p>
        )}

        {sent.value && (
          <p class="pay-result__text">
            ✅ Письмо отправлено на ваш email. Если не видите — проверьте «Спам».
          </p>
        )}

        {!sending.value && !sent.value && !sendError.value && (
          <p class="pay-result__text">
            Если вы покупали электронную книгу — ссылка/доступ будет отправлен на ваш email в ближайшее время.
          </p>
        )}

        {sendError.value && (
          <p class="pay-result__text" style="color: #b00020;">
            ❌ {sendError.value}
          </p>
        )}

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
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
};