import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

type Lang = 'ru' | 'ro';
type State = 'checking' | 'sent' | 'pending' | 'failed' | 'unknown' | 'error';

const T = {
  ru: {
    home: '/',
    read: '/read',
    back: '← На главную',
    backSite: 'Вернуться на сайт',
    readBtn: 'Читать книгу',
    badgeOk: 'Оплата прошла',
    badgeChecking: 'Проверяем оплату',
    badgeFail: 'Оплата не подтверждена',
    titleOk: 'Спасибо! Платёж успешно выполнен.',
    titleChecking: 'Проверяем платёж…',
    titleFail: 'Банк не подтвердил платёж.',
    checking: 'Проверяем статус платежа в банке… Обычно это занимает несколько секунд.',
    sent: '✅ Письмо со ссылкой на книгу отправлено на ваш email. Если не видите — проверьте «Спам».',
    pending: 'Банк ещё обрабатывает платёж. Как только он будет подтверждён, письмо придёт на ваш email автоматически.',
    failed: 'Если деньги всё же списались — напишите нам, мы проверим и вышлем доступ.',
    unknown: 'Если оплата прошла, письмо со ссылкой на книгу придёт на ваш email в ближайшее время.',
    error: 'Не удалось проверить платёж. Письмо придёт автоматически, если оплата прошла; если нет — напишите нам.',
    hint: 'Если письмо не пришло, проверьте «Спам» или напишите на',
  },
  ro: {
    home: '/ro',
    read: '/ro/read',
    back: '← Înapoi la pagina principală',
    backSite: 'Înapoi la site',
    readBtn: 'Citește cartea',
    badgeOk: 'Plata reușită',
    badgeChecking: 'Verificăm plata',
    badgeFail: 'Plata nu este confirmată',
    titleOk: 'Mulțumim! Plata a fost efectuată cu succes.',
    titleChecking: 'Verificăm plata…',
    titleFail: 'Banca nu a confirmat plata.',
    checking: 'Verificăm statutul plății la bancă… De obicei durează câteva secunde.',
    sent: '✅ Emailul cu linkul către carte a fost trimis. Dacă nu îl vedeți — verificați „Spam”.',
    pending: 'Banca încă procesează plata. Imediat ce va fi confirmată, emailul va veni automat.',
    failed: 'Dacă banii au fost totuși retrași — scrieți-ne, verificăm și vă trimitem accesul.',
    unknown: 'Dacă plata a reușit, emailul cu linkul către carte va veni în cel mai scurt timp.',
    error: 'Nu am putut verifica plata. Emailul va veni automat dacă plata a reușit; dacă nu — scrieți-ne.',
    hint: 'Dacă emailul nu a ajuns, verificați „Spam” sau scrieți la',
  },
} as const;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const PaymentSuccess = component$<{ lang: Lang }>(({ lang }) => {
  const t = T[lang];
  const loc = useLocation();
  const state = useSignal<State>('checking');

  useVisibleTask$(async () => {
    let payId = loc.url.searchParams.get('payId') || '';
    let email = '';
    try {
      payId = payId || localStorage.getItem('lastPayId') || '';
      email = localStorage.getItem('lastEmail') || '';
    } catch {
      /* localStorage недоступен — работаем без него */
    }

    if (!payId) {
      state.value = 'unknown';
      return;
    }

    // Банк иногда подтверждает не мгновенно — несколько попыток.
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ payId, email, language: lang }),
        });
        const data = await res.json().catch(() => ({}));

        if (data?.status === 'sent') {
          state.value = 'sent';
          return;
        }
        if (data?.status === 'failed' && res.ok) {
          state.value = 'failed';
          return;
        }
        if (!res.ok) {
          state.value = 'error';
          return;
        }
      } catch {
        state.value = 'error';
        return;
      }
      await sleep(3000);
    }
    state.value = 'pending';
  });

  const s = state.value;
  const isFail = s === 'failed';
  const isChecking = s === 'checking';

  return (
    <section class={`pay-result ${isFail ? 'pay-result--fail' : 'pay-result--success'}`}>
      <div class="pay-result__inner">
        <a class="pay-result__back" href={t.home}>
          {t.back}
        </a>

        <div class={`pay-result__badge${isFail ? ' pay-result__badge--fail' : ''}`}>
          {isFail ? t.badgeFail : isChecking ? t.badgeChecking : t.badgeOk}
        </div>

        <h1 class="pay-result__title">
          {isFail ? t.titleFail : isChecking ? t.titleChecking : t.titleOk}
        </h1>

        <p class="pay-result__text" style={s === 'error' ? 'color: #b00020;' : undefined}>
          {t[s]}
        </p>

        <div class="pay-result__actions">
          {!isFail && (
            <a class="pay-result__btn pay-result__btn--primary" href={t.read}>
              {t.readBtn}
            </a>
          )}
          <a class="pay-result__btn pay-result__btn--ghost" href={t.home}>
            {t.backSite}
          </a>
        </div>

        <p class="pay-result__hint">
          {t.hint}{' '}
          <a class="pay-result__link" href="mailto:support@11book.online">
            support@11book.online
          </a>
          .
        </p>
      </div>
    </section>
  );
});
