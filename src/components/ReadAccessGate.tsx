import { $, component$, useSignal } from '@builder.io/qwik';

type Lang = 'ru' | 'ro';

const T = {
    ru: {
        home: '/',
        badge: 'Доступ к книге',
        title: 'Книга доступна после покупки',
        text: 'Откройте ссылку «Читать книгу» из письма, которое пришло после оплаты, — книга откроется на этом устройстве.',
        restore: 'Нет письма под рукой? Введите «ID платежа» из письма:',
        placeholder: 'например 6492ab00-eea8-4920-8ebe-65084b290543',
        submit: 'Открыть книгу',
        checking: 'Проверяем…',
        buy: 'Купить электронную книгу',
        notPaid: 'Оплата с таким ID не найдена или не подтверждена банком.',
        badId: 'Проверьте ID — он выглядит как набор букв и цифр через дефис.',
        error: 'Не удалось проверить. Попробуйте ещё раз чуть позже.',
        hint: 'Не получается? Напишите на',
    },
    ro: {
        home: '/ro',
        badge: 'Acces la carte',
        title: 'Cartea este disponibilă după cumpărare',
        text: 'Deschideți linkul „Citește cartea” din emailul primit după plată — cartea se va deschide pe acest dispozitiv.',
        restore: 'Nu aveți emailul la îndemână? Introduceți „Pay ID” din email:',
        placeholder: 'de exemplu 6492ab00-eea8-4920-8ebe-65084b290543',
        submit: 'Deschide cartea',
        checking: 'Verificăm…',
        buy: 'Cumpără cartea electronică',
        notPaid: 'Plata cu acest ID nu a fost găsită sau nu este confirmată de bancă.',
        badId: 'Verificați ID-ul — arată ca un șir de litere și cifre cu cratime.',
        error: 'Nu am putut verifica. Încercați din nou puțin mai târziu.',
        hint: 'Nu reușiți? Scrieți la',
    },
} as const;

export const ReadAccessGate = component$<{ lang: Lang }>(({ lang }) => {
    const t = T[lang];
    const payId = useSignal('');
    const loading = useSignal(false);
    const error = useSignal('');

    const submit$ = $(async () => {
        error.value = '';
        const id = payId.value.trim();
        if (!/^[A-Za-z0-9-]{8,64}$/.test(id)) {
            error.value = t.badId;
            return;
        }
        loading.value = true;
        try {
            const res = await fetch('/api/read-access', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ payId: id }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data?.ok) {
                window.location.reload();
                return;
            }
            error.value = res.status >= 500 ? t.error : t.notPaid;
        } catch {
            error.value = t.error;
        }
        loading.value = false;
    });

    return (
        <section class="pay-result">
            <div class="pay-result__inner">
                <a class="pay-result__back" href={t.home}>
                    ←
                </a>

                <div class="pay-result__badge">{t.badge}</div>
                <h1 class="pay-result__title">{t.title}</h1>
                <p class="pay-result__text">{t.text}</p>

                <form
                    preventdefault:submit
                    onSubmit$={submit$}
                    style="display:flex;flex-direction:column;gap:10px;margin:20px 0;"
                >
                    <label class="pay-result__text" for="read-pay-id" style="margin:0;">
                        {t.restore}
                    </label>
                    <input
                        id="read-pay-id"
                        class="pay-modal__input"
                        type="text"
                        autocomplete="off"
                        placeholder={t.placeholder}
                        value={payId.value}
                        onInput$={(e) => (payId.value = (e.target as HTMLInputElement).value)}
                    />
                    {error.value && (
                        <p class="pay-result__text" style="color:#b00020;margin:0;">
                            {error.value}
                        </p>
                    )}
                    <div class="pay-result__actions">
                        <button
                            type="submit"
                            class="pay-result__btn pay-result__btn--primary"
                            disabled={loading.value}
                        >
                            {loading.value ? t.checking : t.submit}
                        </button>
                        <a class="pay-result__btn pay-result__btn--ghost" href={t.home}>
                            {t.buy}
                        </a>
                    </div>
                </form>

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
