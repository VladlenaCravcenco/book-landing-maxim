import type { RequestHandler } from "@builder.io/qwik-city";
import { Resend } from "resend";

function mustEnv(name: string) {
  const v = process.env?.[name];
  if (!v) throw new Error(`${name} is missing`);
  return v;
}

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const resend = new Resend(mustEnv("RESEND_API_KEY"));

    const { email, language = "ru" } = await request.json().catch(() => ({}));

    if (!email) {
      json(400, { error: "Email is required" });
      return;
    }

    const subject =
      language === "ro"
        ? "Acces la cartea „Sună-mă, nu mi-am schimbat numărul”"
        : "Доступ к книге «Позвони мне, я свой номер не менял»";

    const html =
      language === "ro"
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

    const from = process.env.MAIL_FROM || "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      json(500, { error: "Email send failed" });
      return;
    }

    json(200, { ok: true });
  } catch (e: any) {
    console.error(e);
    json(500, { error: e?.message || "Server error" });
  }
};
