import { component$, useSignal, $ } from '@builder.io/qwik';

export const BuyEbookButtonRu = component$(() => {
  const open = useSignal(false);
  const email = useSignal('');
  const accepted = useSignal(false);
  const loading = useSignal(false);
  const error = useSignal('');

  const startPayment$ = $(async () => {
    error.value = '';
    const e = email.value.trim();

    if (!e || !e.includes('@')) {
      error.value = 'Введите корректный email.';
      return;
    }
    if (!accepted.value) {
      error.value = 'Нужно принять условия и политику конфиденциальности.';
      return;
    }

    loading.value = true;

    try {
      const res = await fetch('/api/maib/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 10,
          currency: 'MDL',
          description: '11book — электронная книга',
          customerEmail: e,
          language: 'ru',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.payUrl) {
        console.error('MAIB create-payment error:', data);
        error.value = data?.error || 'Не удалось инициировать оплату. Попробуйте позже.';
        loading.value = false;
        return;
      }

      if (data?.payId) localStorage.setItem('lastPayId', String(data.payId));
      localStorage.setItem('lastEmail', e);

      window.location.href = data.payUrl;
    } catch (err) {
      console.error(err);
      error.value = 'Произошла ошибка. Попробуйте ещё раз.';
      loading.value = false;
    }
  });

  return (
    <>
      <button type="button" class="btn-3d" onClick$={() => (open.value = true)}>
        купить электронную книгу
      </button>

      {open.value && (
        <div class="pay-modal" role="dialog" aria-modal="true">
          <div class="pay-modal__overlay" onClick$={() => (open.value = false)} />
          <div class="pay-modal__card">
            <button class="pay-modal__close" type="button" onClick$={() => (open.value = false)}>
              ✕
            </button>

            <h3 class="pay-modal__title">Доступ к книге</h3>
            <p class="pay-modal__desc">
              Email нужен, чтобы отправить чек и ссылку на книгу — на случай если вы закроете страницу.
            </p>

            <label class="pay-modal__label">
              Email
              <input
                class="pay-modal__input"
                type="email"
                placeholder="name@email.com"
                value={email.value}
                onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
              />
            </label>

            <label class="pay-modal__check">
              <input
                type="checkbox"
                checked={accepted.value}
                onChange$={(e) => (accepted.value = (e.target as HTMLInputElement).checked)}
              />
              <span>
                Я принимаю <a href="/policies#terms" data-qwik-city="reload">Terms</a> и{' '}
                <a href="/policies#privacy" data-qwik-city="reload">Privacy</a>
              </span>
            </label>

            {error.value && <div class="pay-modal__error">{error.value}</div>}

            <button
              type="button"
              class="btn-3d pay-modal__btn"
              disabled={loading.value}
              onClick$={startPayment$}
            >
              {loading.value ? 'Открываем оплату…' : 'Перейти к оплате'}
            </button>
          </div>
        </div>
      )}
    </>
  );
});