import { component$ } from '@builder.io/qwik';
import { BuyEbookButtonRo } from './BuyEbookButtonRo';
import { BuyEbookButtonRu } from './BuyEbookButtonRu';

function ruPlural(n: number, one: string, few: string, many: string) {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
    return many;
}

/** Блок в конце бесплатной главы: «понравилось? читайте дальше». */
export const FragmentCta = component$<{ lang: 'ru' | 'ro'; restCount: number }>(
    ({ lang, restCount }) => {
        const ru = lang === 'ru';
        const rest = ru
            ? `Впереди ещё ${restCount} ${ruPlural(restCount, 'глава', 'главы', 'глав')}.`
            : `Vă mai așteaptă încă ${restCount} ${restCount === 1 ? 'capitol' : 'capitole'}.`;

        return (
            <aside class="fragment-cta">
                <div class="badge">{ru ? 'Конец первой главы' : 'Sfârșitul primului capitol'}</div>
                <h2 class="fragment-cta__title">
                    {ru ? 'Хотите узнать, что было дальше?' : 'Vreți să aflați ce urmează?'}
                </h2>
                <p class="fragment-cta__text">
                    {rest}{' '}
                    {ru
                        ? 'Электронная книга целиком — 199 MDL, доступ сразу после оплаты.'
                        : 'Cartea electronică completă — 199 MDL, acces imediat după plată.'}
                </p>
                <div class="fragment-cta__actions">
                    {ru ? <BuyEbookButtonRu /> : <BuyEbookButtonRo />}
                </div>
                <a class="fragment-cta__back" href={ru ? '/' : '/ro/'}>
                    {ru ? '← Вернуться на главную' : '← Înapoi la pagina principală'}
                </a>
            </aside>
        );
    },
);
