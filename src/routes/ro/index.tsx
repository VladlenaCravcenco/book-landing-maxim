import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BuyEbookButtonRo } from '~/components/BuyEbookButtonRo';

export default component$(() => {
  const amazonOpen = useSignal(false);

  // оставляю массив и логику, чтобы ничего не ломать, если вернёшь секцию позже
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
    // ✅ ВАЖНО: обёртка, которая переключит CSS-поведение hero (не fixed) только для RO
    <div class="page page--single">
      {/* Переключатель языка */}
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

      {/* 1 экран (в RO станет обычным блоком 100vh через CSS override) */}
      <section class="hero-full">
        <div class="hero-full__bg">
          <img src="/images/unnamed.webp" alt="Максим Лянка" />
        </div>

        <div class="hero-full__content">
          <div class="badge">carte</div>

          <h1 class="title-main">
            Sună-mă, numărul meu<br />
            nu s-a schimbat
          </h1>

          <p class="author-name">MAXIM LEANCA</p>

          <div class="btn-row">
            <BuyEbookButtonRo />
          </div>

          <p class="btn-caption">
            Plată sigură prin MAIB.<br />
            Acces la lectură imediat după cumpărare.
          </p>
        </div>
      </section>

      {/* ✅ 2 экран удалён полностью по требованию */}

      {/* ФУТЕР */}
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div class="site-footer__grid">
            <div class="site-footer__col">
              <h4 class="site-footer__title">Informații legale</h4>
              <p class="site-footer__text">Summit Property SRL</p>
              <p class="site-footer__text">IDNO: 1024600059151</p>
              <p class="site-footer__text">
                Adresa juridică: Moldova, or. laloveni, str. Alexandru cel Bun,5/4.
              </p>
            </div>

            <div class="site-footer__col">
              <h4 class="site-footer__title">Contacte</h4>
              <p class="site-footer__text">
                Email:{' '}
                <a class="site-footer__link" href="mailto:grunge.studio.rental@gmail.com">
                  grunge.studio.rental@gmail.com
                </a>
              </p>
              <p class="site-footer__text">
                Tel:{' '}
                <a class="site-footer__link" href="tel:+37378042077">
                  +373 78 04 20 77
                </a>
              </p>
            </div>

            <div class="site-footer__col">
              <h4 class="site-footer__title">Politici</h4>
              <ul class="site-footer__list">
                <li>
                  <a class="site-footer__link" href="/ro/policies#terms" data-qwik-city="reload">
                    Termeni și condiții
                  </a>
                </li>
                <li>
                  <a class="site-footer__link" href="/ro/policies#privacy" data-qwik-city="reload">
                    Politica de confidențialitate
                  </a>
                </li>
                <li>
                  <a class="site-footer__link" href="/ro/policies#refund" data-qwik-city="reload">
                    Politica de retur
                  </a>
                </li>
                <li>
                  <a class="site-footer__link" href="/ro/policies#delivery" data-qwik-city="reload">
                    Livrare / Prestare servicii
                  </a>
                </li>
              </ul>
            </div>

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
    </div>
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