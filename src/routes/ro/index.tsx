import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BuyEbookButtonRo } from '~/components/BuyEbookButtonRo';

export default component$(() => {

  const amazonOpen = useSignal(false);

  const AMAZON = [
    { label: 'Italy', url: 'https://www.amazon.it/dp/B0GD9BHWMK' },
    { label: 'England', url: 'https://www.amazon.co.uk/dp/B0GD9BHWMK' },
    { label: 'Ireland', url: 'https://www.amazon.ie/dp/B0GD9BHWMK' },
    { label: 'USA', url: 'https://www.amazon.com/dp/B0GD9BHWMK' },
    { label: 'Germany', url: 'https://www.amazon.de/dp/B0GD9BHWMK' },
    { label: 'France', url: 'https://www.amazon.fr/dp/B0GD9BHWMK' },
    { label: 'Spain', url: 'https://www.amazon.es/dp/B0GD9BHWMK' },
    { label: 'Netherlands', url: 'https://www.amazon.nl/dp/B0GD9BHWMK' },
    { label: 'Poland', url: 'https://www.amazon.pl/dp/B0GD9BHWMK' },
    { label: 'Sweden', url: 'https://www.amazon.se/dp/B0GD9BHWMK' },
    { label: 'Belgium', url: 'https://www.amazon.com.be/dp/B0GD9BHWMK' },
    { label: 'Japan', url: 'https://www.amazon.co.jp/dp/B0GD9BHWMK' },
    { label: 'Canada', url: 'https://www.amazon.ca/dp/B0GD9BHWMK' },
    { label: 'Australia', url: 'https://www.amazon.com.au/dp/B0GD9BHWMK' },
  ];

  useVisibleTask$(({ track, cleanup }) => {
    track(() => amazonOpen.value);
    if (!amazonOpen.value) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') amazonOpen.value = false;
    };

    window.addEventListener('keydown', onKeyDown);
    cleanup(() => window.removeEventListener('keydown', onKeyDown));
  });

  return (
    <>
      {/* Переключатель языка — у тебя две отдельные страницы */}
      <div class="lang-switcher">
        <Link href="/" class="lang-btn">
          RU
        </Link>

        <Link href="/ro" class="lang-btn lang-btn--active">
          RO
        </Link>
      </div>

      {/* Соцсети */}
      <div class="social-pill">
        <a
          href="https://www.instagram.com/leancamaxim/"
          target="_blank"
          rel="noreferrer"
          class="social-pill__icon"
          aria-label="Instagram"
        >
          <img
            class="social-pill__img"
            src="/images/icons/instagram.png"
            alt=""
            width={18}
            height={18}
          />
        </a>

        <a
          href="https://www.facebook.com/maxim.leanca"
          target="_blank"
          rel="noreferrer"
          class="social-pill__icon"
          aria-label="Facebook"
        >
          <img
            class="social-pill__img"
            src="/images/icons/facebook.png"
            alt=""
            width={18}
            height={18}
          />
        </a>
      </div>
      {/* 1. Первый экран */}
      <section class="hero-full">
        <div class="hero-full__bg">
          <img src="/images/unnamed.webp" alt="Максим Лянка" />
        </div>

        <div class="hero-full__content">
          <div class="badge">Книга</div>
          <h1 class="title-main">
            Sună-mă, numărul meu<br />nu s-a schimbat
          </h1>
          <p class="author-name">MAXIM LEANCA</p>

          <div class="btn-row">
            <BuyEbookButtonRo />

            <button
              type="button"
              class="btn btn--ghost"
              onClick$={() => {
                const el = document.getElementById('print-book');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              VERSIUNE TIPĂRITĂ
            </button>
          </div>

          <p class="btn-caption">
            Plată sigură prin MAIB.<br />Acces la lectură imediat după cumpărare.
          </p>
        </div>
      </section>

      {/* 2. Второй экран */}
      <section class="second-screen" id="print-book">
        <div class="second-screen__content">
          <div>
            <div class="badge">CARTE TIPĂRITĂ</div>
            <h2 class="title-main">
              Sună-mă, numărul meu<br />nu s-a schimbat
            </h2>

            <div class="btn-row-single">
              <h3>
                COMANDĂ CARTEA TIPĂRITĂ
                <span style="font-size: 20px; margin-left: 8px;">↓</span>
              </h3>

              <div class="btn-flex">
                <a href="https://carturesti.md/carte/236634017" class="btn btn--ghost">
                  <img src="/images/carturesti-logo.png" alt="Carturesti" />
                </a>

                <a
                  href="https://www.bestseller.md/kniga-pozvoni-mne-maxim-leanca.html"
                  class="btn btn--ghost"
                >
                  <img src="/images/bestseller-logo.png" alt="Bestseller" />
                </a>

                <a href="https://bookstore.md/ru/catalog/1057/801505/" class="btn btn--ghost">
                  <img src="/images/bookstore-logo.png" alt="Bookstore" />
                </a>

                <div class="amazon-wrap">
                  <button
                    type="button"
                    class="btn btn--ghost amazon-trigger"
                    onClick$={() => (amazonOpen.value = !amazonOpen.value)}
                  >
                    <img src="/images/amazon-logo.png" alt="Amazon" />
                    <span class={amazonOpen.value ? 'amazon-chev amazon-chev--open' : 'amazon-chev'}>▾</span>
                  </button>

                  {amazonOpen.value && (
                    <>
                      {/* overlay — закрытие по клику мимо */}
                      <div
                        class="amazon-overlay"
                        onClick$={() => (amazonOpen.value = false)}
                      />

                      {/* модалка */}
                      <div
                        class="amazon-menu"
                        role="dialog"
                        aria-modal="true"
                        onClick$={(e) => e.stopPropagation()} // чтобы клик внутри не закрывал
                      >
                        <button
                          type="button"
                          class="amazon-close"
                          onClick$={() => (amazonOpen.value = false)}
                          aria-label="Close"
                        >
                          ✕
                        </button>

                        <div class="amazon-title">Choose Amazon region</div>

                        <div class="amazon-grid">
                          {AMAZON.map((x) => (
                            <a
                              key={x.label}
                              class="amazon-item"
                              href={x.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick$={() => (amazonOpen.value = false)}
                            >
                              {x.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div class="hero-book">
            <img src="/images/Book-cover.png" alt="Печатная версия книги" />
          </div>
        </div>
      </section>

      {/* ✅ ФУТЕР — под требования MAIB */}
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div class="site-footer__grid">
            {/* Юридическая информация */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Informații legale</h4>
              <p class="site-footer__text">Summit Property SRL</p>
              <p class="site-footer__text">IDNO: 1024600059151</p>
              <p class="site-footer__text">Adresa juridică: Moldova, or. laloveni, str. Alexandru cel Bun,5/4.</p>
            </div>

            {/* Контакты */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Contacte</h4>
              <p class="site-footer__text">
                Email:{' '}
                <a class="site-footer__link" href="mailto:grunge.studio.rental@gmail.com">
                  grunge.studio.rental@gmail.com
                </a>
              </p>
              <p class="site-footer__text">
                Тел:{' '}
                <a class="site-footer__link" href="tel:+37378042077">
                  +373 78 04 20 77
                </a>
              </p>
            </div>

            {/* Политики (обязательно для MAIB) */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Politici</h4>
              <ul class="site-footer__list">
                <li>
                  <a
                    class="site-footer__link"
                    href="/ro/policies#terms"
                    data-qwik-city="reload"
                  >
                    Termeni și condiții
                  </a>
                </li>
                <li>
                  <a
                    class="site-footer__link"
                    href="/ro/policies#privacy"
                    data-qwik-city="reload"
                  >
                    Politica de confidențialitate
                  </a>
                </li>
                <li>
                  <a
                    class="site-footer__link"
                    href="/ro/policies#refund"
                    data-qwik-city="reload"
                  >
                    Politica de retur
                  </a>
                </li>
                <li>
                  <a
                    class="site-footer__link"
                    href="/ro/policies#delivery"
                    data-qwik-city="reload"
                  >
                    Livrare / Prestare servicii
                  </a>
                </li>
              </ul>
            </div>

            {/* Оплата */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Plăți</h4>

              <div class="payment-logos">
                <img src="/images/payments/maib.png" alt="Plată securizată prin maib" />
                <img src="/images/payments/visa.png" alt="Visa" />
                <img src="/images/payments/mastercard.png" alt="Mastercard" />
                <img src="/images/payments/amex.png" alt="American Express" />
              </div>

              <p class="site-footer__note">
                Plată securizată. Confirmare prin e-mail după achitare.
              </p>
            </div>
          </div>

          <div class="site-footer__bottom">
            <span>© {new Date().getFullYear()} 11book.online — Toate drepturile rezervate.</span>
          </div>
        </div>
      </footer>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Sună-mă, nu mi-am schimbat numărul — cartea lui Maxim Liancă',
  meta: [
    {
      name: 'description',
      content:
        'Versiune electronică și tipărită a cărții „Sună-mă, nu mi-am schimbat numărul” de Maxim Liancă. Cumpără cartea online și obține acces la lectură imediat după plată.',
    },
  ],
};