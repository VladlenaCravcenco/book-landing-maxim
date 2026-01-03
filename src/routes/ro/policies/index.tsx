import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <section class="policies">
            <div class="policies__inner">
                <div class="policies__back">
                    <a href="/ro" class="policies__back-link">
                        ← Înapoi
                    </a>
                </div>
                <h1 class="policies__title">Politici și condiții de utilizare</h1>

                {/* Navigație */}
                <nav class="policies__nav">
                    <ul>
                        <li><a href="#terms">Termeni și Condiții</a></li>
                        <li><a href="#privacy">Politica de confidențialitate</a></li>
                        <li><a href="#refund">Politica de retur</a></li>
                        <li><a href="#delivery">Livrare / prestare servicii</a></li>
                        <li><a href="#contacts">Date de contact</a></li>
                    </ul>
                </nav>

                {/* TERMS */}
                <article id="terms" class="policies__section">
                    <h2>1. Termeni și Condiții</h2>

                    <p>
                        Prezenții Termeni și Condiții se aplică tuturor comenzilor efectuate
                        pe site-ul <strong>www.11book.online</strong> (denumit în continuare
                        „Site”), deținut de <strong>[[Denumirea juridică a companiei]]</strong>
                        (denumit în continuare „Vânzătorul”).
                    </p>

                    <p>
                        Prin plasarea unei comenzi pe Site, Cumpărătorul confirmă că a citit,
                        a înțeles și acceptă integral acești Termeni și Condiții.
                    </p>

                    <p>
                        Vânzătorul își rezervă dreptul de a modifica oricând prezentele
                        prevederi, fără notificare prealabilă. Versiunea actualizată este
                        disponibilă permanent pe Site.
                    </p>
                </article>

                {/* PRIVACY */}
                <article id="privacy" class="policies__section">
                    <h2>2. Politica de confidențialitate și protecția datelor cu caracter personal</h2>

                    <p>
                        Prin utilizarea Site-ului, Utilizatorul își exprimă acordul privind
                        colectarea și prelucrarea datelor cu caracter personal necesare
                        procesării, confirmării și executării comenzilor.
                    </p>

                    <p>Datele prelucrate pot include:</p>
                    <ul>
                        <li>nume și prenume;</li>
                        <li>adresa de e-mail;</li>
                        <li>număr de telefon.</li>
                    </ul>

                    <p>
                        Vânzătorul <strong>nu colectează și nu stochează</strong> datele
                        cardurilor bancare (număr card, data expirării, cod CVV).
                        Procesarea plăților se realizează prin sistemul securizat al băncii
                        <strong> maib</strong>.
                    </p>

                    <p>
                        Datele cu caracter personal sunt prelucrate în conformitate cu
                        legislația în vigoare a Republicii Moldova și utilizate exclusiv
                        în scopuri legitime.
                    </p>
                </article>

                {/* PAYMENT */}
                <article class="policies__section">
                    <h2>3. Înregistrarea și achitarea comenzii</h2>

                    <p>
                        Achitarea comenzilor se efectuează online, utilizând carduri
                        bancare, prin intermediul sistemului securizat <strong>maib</strong>.
                    </p>

                    <p>
                        După finalizarea cu succes a plății, Cumpărătorul va primi o
                        confirmare a achitării la adresa de e-mail indicată.
                    </p>

                    <p>
                        Plățile online sunt protejate prin standarde moderne de securitate,
                        inclusiv tehnologia <strong>3D Secure</strong>.
                    </p>
                </article>

                {/* DELIVERY */}
                <article id="delivery" class="policies__section">
                    <h2>4. Livrarea produselor / prestarea serviciilor</h2>

                    <h3>Carte electronică</h3>
                    <p>
                        După confirmarea plății, versiunea electronică a cărții este
                        livrată <strong>imediat</strong>, prin:
                    </p>
                    <ul>
                        <li>link de descărcare;</li>
                        <li>sau prin e-mail.</li>
                    </ul>

                    <h3>Carte tipărită</h3>
                    <p>
                        Cartea tipărită <strong>nu este comercializată direct</strong> prin
                        acest Site. Utilizatorul este redirecționat către magazine
                        partenere oficiale.
                    </p>

                    <p>
                        Condițiile de livrare, plată și retur pentru cartea tipărită sunt
                        stabilite de magazinele respective.
                    </p>
                </article>

                {/* REFUND */}
                <article id="refund" class="policies__section">
                    <h2>5. Politica de retur</h2>

                    <p>
                        Rambursarea mijloacelor bănești se efectuează exclusiv pe cardul
                        bancar utilizat la achitare.
                    </p>

                    <p>
                        Având în vedere natura digitală a produsului, returul este
                        posibil doar în cazul imposibilității tehnice de livrare a
                        produsului din vina Vânzătorului.
                    </p>

                    <p>
                        Cererea de retur este analizată în termen de
                        <strong> [[X]] zile lucrătoare</strong> de la primirea solicitării.
                    </p>
                </article>

                {/* CONTACTS */}
                <article id="contacts" class="policies__section">
                    <h2>6. Date de contact</h2>

                    <ul>
                        <li><strong>Denumirea juridică:</strong> [[Denumirea companiei]]</li>
                        <li><strong>IDNO:</strong> [[IDNO]]</li>
                        <li><strong>Adresa juridică:</strong> [[Adresa juridică]]</li>
                        <li><strong>Telefon:</strong> [[Telefon]]</li>
                        <li><strong>Email:</strong> [[Email]]</li>
                    </ul>
                </article>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: 'Politici și condiții de utilizare — 11book.online',
    meta: [
        {
            name: 'description',
            content:
                'Termeni și condiții, politica de confidențialitate, retur și livrare pentru produsele digitale oferite pe 11book.online.',
        },
    ],
};