import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  const isRo = loc.url.pathname.startsWith('/ro');

  const ruHref = '/';
  const roHref = '/ro';

  return (


    <>

      <div class="lang-switcher">
        <Link
          href={ruHref}
          class={['lang-btn', !isRo ? 'lang-btn--active' : ''].join(' ')}
        >
          RU
        </Link>

        <Link
          href={roHref}
          class={['lang-btn', isRo ? 'lang-btn--active' : ''].join(' ')}
        >
          RO
        </Link>
      </div>

      <div class="social-pill">
        <a
          href="https://www.instagram.com/leancamaxim/"
          target="_blank"
          rel="noreferrer"
          class="social-pill__icon"
          aria-label="Instagram"
        >
          {/* Примитивная иконка Instagram (можно заменить на SVG покрасивее) */}
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

      <section class="hero-full">
        <div class="hero-full__bg">
          <img src="/images/unnamed.webp" alt="Максим Лянка" />
        </div>

        <div class="hero-full__content">
          <div class="badge">roman</div>
          <h1 class="title-main">
            SUNĂ-MĂ, NU MI-AM<br />SCHIMBAT NUMĂRUL
          </h1>
          <p class="author-name">MAXIM LIANKA</p>

          <div class="btn-row">
            <a href="https://pay.revolut.com/YOUR-LINK" class="btn-3d">
              CUMPĂRĂ CARTEA ELECTRONICĂ
            </a>
            <button
              type="button"
              class="btn btn--ghost"
              onClick$={() => {
                const el = document.getElementById('print-book');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              VERSIUNE TIPĂRITĂ
            </button>
          </div>
          <p class="btn-caption">
            Plată sigură prin Revolut.<br />Acces la lectură imediat după cumpărare.
          </p>
        </div>
      </section>

      {/* 2. Второй экран — накладывается сверху при скролле */}
      <section class="second-screen" id="print-book">
        <div class="second-screen__content">
          <div>
            <div class="badge">CARTE TIPĂRITĂ</div>
            <h2 class="title-main">
              SUNĂ-MĂ,<br />NU MI-AM<br />SCHIMBAT NUMĂRUL
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

                <a href="https://www.bestseller.md/kniga-pozvoni-mne-maxim-leanca.html" class="btn btn--ghost">
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
      </section >

    </>
  );
});

export const head: DocumentHead = {
  title: 'Sună-mă, nu mi-am schimbat numărul — cartea lui Maxim Liancă',
  meta: [
    {
      name: 'description',
      content:
        'Versiune electronică și tipărită a cărții „Sună-mă, nu mi-am schimbat numărul” de Maxim Liancă. Cumpără cartea online și obține acces la lectură imediat după plată.'
    }
  ]
};