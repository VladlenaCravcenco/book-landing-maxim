import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
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
          <span class="social-pill__icon-inner social-pill__icon-inner--ig" />
        </a>

        <a
          href="https://www.facebook.com/maxim.leanca"
          target="_blank"
          rel="noreferrer"
          class="social-pill__icon"
          aria-label="Facebook"
        >
          <span class="social-pill__icon-inner social-pill__icon-inner--fb" />
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
            <button
              type="button"
              class="btn-3d"
              onClick$={async () => {
                try {
                  const res = await fetch('/api/maib/create-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      amount: 200, // <-- поставь свою цену
                      currency: 'MDL',
                      description: '11book — carte electronică',
                    }),
                  });

                  const data = await res.json();

                  if (!res.ok || !data?.payUrl) {
                    console.error('MAIB create-payment error:', data);
                    alert('Nu am putut iniția plata. Încearcă din nou.');
                    return;
                  }

                  // ✅ редирект на страницу оплаты MAIB
                  window.location.href = data.payUrl;
                } catch (err) {
                  console.error(err);
                  alert('Eroare. Încearcă din nou.');
                }
              }}
            >
              CUMPĂRĂ CARTEA ELECTRONICĂ
            </button>

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
              <p class="site-footer__text">SRL „Numele Companiei”</p>
              <p class="site-footer__text">IDNO: 1234567890123</p>
              <p class="site-footer__text">Adresa juridică: Chișinău, str. Exemplu 10</p>
            </div>

            {/* Контакты */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Contacte</h4>
              <p class="site-footer__text">
                Email:{' '}
                <a class="site-footer__link" href="mailto:support@11book.online">
                  support@11book.online
                </a>
              </p>
              <p class="site-footer__text">
                Тел:{' '}
                <a class="site-footer__link" href="tel:+37360000000">
                  +373 60 000 000
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