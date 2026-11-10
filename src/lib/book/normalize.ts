export type RawChapter = {
    id: string;
    title: string;
    content: string;
};

/** Глава, готовая к показу: текст уже разбит на абзацы на сервере. */
export type BookChapter = {
    id: string;
    title: string;
    paragraphs: string[];
};

export function prepareBook(chapters: RawChapter[]): BookChapter[] {
    return chapters.map((ch) => ({
        id: ch.id,
        title: ch.title,
        paragraphs: normalizeChapterText(ch.content)
            .split('\n\n')
            .map((p) => p.trim())
            .filter((p) => p.length > 0),
    }));
}

function normalizeChapterText(raw: string): string {
    let text = raw
        .replace(/\r\n/g, '\n')
        .replace(/---page---/g, '\n\n'); // страница = новый абзац

    // 1) убираем переносы слов: "сло-\nво" -> "слово"
    text = text.replace(
        /([A-Za-zА-Яа-яЁё])-\n(?=[A-Za-zА-Яа-яЁё])/g,
        '$1'
    );

    // 2) внутри одной строки разбиваем диалоги типа:
    // "— Привет. — Как дела?" -> "— Привет.\n— Как дела?"
    // Ищем: [.!?…] + пробелы + (длинное/среднее тире + пробел)
    text = text.replace(
        /([.!?…])\s+([–—]\s)/g,
        '$1\n$2'
    );

    const lines = text.split('\n');

    const paragraphs: string[] = [];
    let buf: string[] = [];

    const pushBuf = () => {
        if (!buf.length) return;
        const para = buf
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        if (para.length) paragraphs.push(para);
        buf = [];
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();

        // пустая строка = конец абзаца
        if (!line) {
            pushBuf();
            continue;
        }

        // если строка НАЧИНАЕТСЯ с тире — это отдельная реплика
        // поддерживаем и "— " и "– "
        if (/^[–—]\s/.test(line)) {
            // заканчиваем прошлый абзац (если был)
            pushBuf();
            // и добавляем эту строку как отдельный абзац-реплику
            paragraphs.push(line);
            continue;
        }

        // обычный текст — копим в текущем абзаце
        buf.push(line);
    }

    pushBuf();

    // абзацы разделяем двойным переносом
    return paragraphs.join('\n\n');
}