import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BuyEbookButtonRu } from '~/components/BuyEbookButtonRu';

export default component$(() => {
  return (
    <>
      {/* Переключатель языка — у тебя две отдельные страницы */}
      <div class="lang-switcher">
        <Link href="/" class="lang-btn lang-btn--active">
          RU
        </Link>

        <Link href="/ro" class="lang-btn">
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
            Позвони мне, я свой<br />номер не менял
          </h1>
          <p class="author-name">Максим Лянка</p>

          <div class="btn-row">
            <BuyEbookButtonRu />

            <button
              type="button"
              class="btn btn--ghost"
              onClick$={() => {
                const el = document.getElementById('print-book');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Печатная версия
            </button>
          </div>

          <p class="btn-caption">
            Безопасная оплата через Revolut.<br />
            Доступ к чтению — сразу после покупки.
          </p>
        </div>
      </section>

      {/* 2. Второй экран */}
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
              <h4 class="site-footer__title">Юридическая информация</h4>
              <p class="site-footer__text">SRL «НАЗВАНИЕ КОМПАНИИ»</p>
              <p class="site-footer__text">IDNO: 1234567890123</p>
              <p class="site-footer__text">Юр. адрес: Кишинёв, ул. Пример 10</p>
            </div>

            {/* Контакты */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Контакты</h4>
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
              <h4 class="site-footer__title">Политики</h4>
              <ul class="site-footer__list">
                <li>
                  <a class="site-footer__link" href="/policies#terms" data-qwik-city="reload">
                    Условия (Terms & Conditions)
                  </a>
                </li>
                <li>
                  <a class="site-footer__link" href="/policies#privacy" data-qwik-city="reload">
                    Политика конфиденциальности
                  </a>
                </li>
                <li>
                  <a class="site-footer__link" href="/policies#refund" data-qwik-city="reload">
                    Политика возврата
                  </a>
                </li>
                <li>
                  <a class="site-footer__link" href="/policies#delivery" data-qwik-city="reload">
                    Доставка / оказание услуги
                  </a>
                </li>
              </ul>
            </div>

            {/* Оплата */}
            <div class="site-footer__col">
              <h4 class="site-footer__title">Оплата</h4>

              <div class="payment-logos">
                <img src="/images/payments/maib.png" alt="Plată securizată prin maib" />
                <img src="/images/payments/visa.png" alt="Visa" />
                <img src="/images/payments/mastercard.png" alt="Mastercard" />
                <img src="/images/payments/amex.png" alt="American Express" />
              </div>

              <p class="site-footer__note">
                Безопасная онлайн-оплата через maib. Поддерживаются карты Visa, Mastercard и American Express.
              </p>
            </div>
          </div>

          <div class="site-footer__bottom">
            <span>© {new Date().getFullYear()} 11book.online — Все права защищены.</span>
          </div>
        </div>
      </footer>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Позвони мне, я свой номер не менял — книга Максима Лянки',
  meta: [
    {
      name: 'description',
      content:
        'Электронная и печатная версия книги «Позвони мне, я свой номер не менял» Максима Лянки. Купить книгу онлайн и получить доступ к чтению сразу после оплаты.',
    },
  ],
};