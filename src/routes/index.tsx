import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>

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
          <div class="badge">Книга</div>
          <h1 class="title-main">
            Позвони мне, я свой<br />номер не менял
          </h1>
          <p class="author-name">Максим Лянка</p>

          <div class="btn-row">
            <a href="https://pay.revolut.com/YOUR-LINK" class="btn-3d">
              купить электронную книгу
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
              Печатная версия
            </button>
          </div>
          <p class="btn-caption">
            Безопасная оплата через Revolut.<br />Доступ к чтению — сразу после покупкu.
          </p>
        </div>
      </section>

      {/* 2. Второй экран — накладывается сверху при скролле */}
      <section class="second-screen" id="print-book">
        <div class="second-screen__content">
          <div>
            <div class="badge">Печатная книга</div>
            <h2 class="title-main">
              Позвони мне,<br />я свой номер<br />не менял
            </h2>

            <div class="btn-row-single">
              <h3>
                Заказать печатную книгу
                <span style="font-size: 20px; margin-left: 8px;">↓</span>
              </h3>
              <div class="btn-flex">
                <a href="https://carturesti.md/carte/236634017" class="btn btn--ghost">
                  Сarturesti
                </a>
                <a href="https://www.bestseller.md/kniga-pozvoni-mne-maxim-leanca.html" class="btn btn--ghost">
                  Bestseller
                </a>
                <a href="https://bookstore.md/ru/catalog/1057/801505/" class="btn btn--ghost">
                  Bookstore
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
  title: 'Позвони мне, я свой номер не менял — книга Максима Лянки',
  meta: [
    {
      name: 'description',
      content:
        'Электронная и печатная версия книги «Позвони мне, я свой номер не менял» Максима Лянки. Купить книгу онлайн и получить доступ к чтению сразу после оплаты.'
    }
  ]
};