import type { RequestHandler } from '@builder.io/qwik-city';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const { email, language = 'ru' } = await request.json();

    if (!email) {
      json(400, { error: 'Email is required' });
      return;
    }

    const subject =
      language === 'ro'
        ? 'Acces la cartea „Sună-mă, nu mi-am schimbat numărul”'
        : 'Доступ к книге «Позвони мне, я свой номер не менял»';

    const html =
      language === 'ro'
        ? `
          <h2>Mulțumim pentru achiziție!</h2>
          <p>Accesul la carte este disponibil la linkul de mai jos:</p>
          <p><a href="https://11book.online/read">Citește cartea</a></p>
          <p>Dacă ai întrebări, scrie-ne la support@11book.online</p>
        `
        : `
          <h2>Спасибо за покупку!</h2>
          <p>Доступ к книге доступен по ссылке ниже:</p>
          <p><a href="https://11book.online/read">Читать книгу</a></p>
          <p>Если возникнут вопросы — support@11book.online</p>
        `;

    const { error } = await resend.emails.send({
      from: '11book <support@11book.online>',
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      json(500, { error: 'Email send failed' });
      return;
    }

    json(200, { ok: true });
  } catch (e) {
    console.error(e);
    json(500, { error: 'Server error' });
  }
};
