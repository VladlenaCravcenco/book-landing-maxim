import { component$, useSignal, $ } from '@builder.io/qwik';

export const BuyEbookButtonRo = component$(() => {
  const open = useSignal(false);
  const email = useSignal('');
  const accepted = useSignal(false);
  const loading = useSignal(false);
  const error = useSignal('');

  const startPayment$ = $(async () => {
    error.value = '';
    const e = email.value.trim();

    if (!e || !e.includes('@')) {
      error.value = 'Introduceți un email valid.';
      return;
    }
    if (!accepted.value) {
      error.value = 'Trebuie să acceptați Termenii și Politica de confidențialitate.';
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
          description: '11book — carte electronică',
          customerEmail: e,
          language: 'ro',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.payUrl) {
        console.error('MAIB create-payment error:', data);
        error.value = data?.error || 'Nu am putut iniția plata. Încercați mai târziu.';
        loading.value = false;
        return;
      }

      if (data?.payId) localStorage.setItem('lastPayId', String(data.payId));
      localStorage.setItem('lastEmail', e);

      window.location.href = data.payUrl;
    } catch (err) {
      console.error(err);
      error.value = 'A apărut o eroare. Încercați din nou.';
      loading.value = false;
    }
  });

  return (
    <>
      <button type="button" class="btn-3d" onClick$={() => (open.value = true)}>
        CUMPĂRĂ CARTEA ELECTRONICĂ
      </button>

      {open.value && (
        <div class="pay-modal" role="dialog" aria-modal="true">
          <div class="pay-modal__overlay" onClick$={() => (open.value = false)} />

          {/* ✅ добавили модификатор, чтобы включить 2-колоночную сетку */}
          <div class="pay-modal__card pay-modal__card--with-book">
            <button
              class="pay-modal__close"
              type="button"
              onClick$={() => (open.value = false)}
              aria-label="Close"
            >
              ✕
            </button>

            {/* ✅ 2 колонки */}
            <div class="pay-modal__layout">
              {/* LEFT: форма */}
              <div class="pay-modal__left">
                <h3 class="pay-modal__title">Acces la carte</h3>

                <p class="pay-modal__desc">
                  Email-ul este necesar ca să vă trimitem bonul și linkul către carte — în caz că închideți pagina.
                </p>

                <label class="pay-modal__label" for="pay-email-ro">
                  Email
                </label>

                <input
                  id="pay-email-ro"
                  class="pay-modal__input"
                  type="email"
                  placeholder="name@email.com"
                  value={email.value}
                  onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
                />

                <label class="pay-modal__check">
                  <input
                    type="checkbox"
                    checked={accepted.value}
                    onChange$={(e) => (accepted.value = (e.target as HTMLInputElement).checked)}
                  />
                  <span>
                    Accept{' '}
                    <a href="/ro/policies#terms" data-qwik-city="reload">
                      Termenii
                    </a>{' '}
                    și{' '}
                    <a href="/ro/policies#privacy" data-qwik-city="reload">
                      Politica de confidențialitate
                    </a>
                  </span>
                </label>

                {error.value && <div class="pay-modal__error">{error.value}</div>}

                <button
                  type="button"
                  class="btn-3d pay-modal__btn"
                  disabled={loading.value}
                  onClick$={startPayment$}
                >
                  {loading.value ? 'Deschidem plata…' : 'Mergi la plată'}
                </button>
              </div>

              {/* RIGHT: обложка */}
              <div class="pay-modal__right" aria-hidden="true">
                <div class="pay-modal__book">
                  <img
                    src="/images/Book-cover.png"
                    alt="Coperta cărții"
                    loading="eager"
                  />
                </div>

                <div class="pay-modal__book-note">
                  E-book • acces imediat după plată
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});