import { $, component$, Slot, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { BookChapter } from '~/lib/book/normalize';

type Lang = 'ru' | 'ro';
type TocItem = { id: string; title: string };

const META = {
    ru: { title: 'Позвони мне, я свой номер не менял', author: 'Максим Лянка', menu: 'Настройки чтения' },
    ro: { title: 'Sună-mă, numărul meu nu s-a schimbat', author: 'Maxim Leanca', menu: 'Setări de citire' },
} as const;

/**
 * Оболочка читалки (шапка, оглавление, шрифт, тема, прогресс).
 * Сам текст приходит через <Slot/> из страницы — так он рендерится один раз на сервере
 * и не сериализуется повторно в состояние для браузера.
 */
export const BookReader = component$<{ lang: Lang; toc: TocItem[] }>(({ lang, toc }) => {
    const meta = META[lang];
    const STORAGE_KEY = `maxim-book-progress-${lang}`;

    const theme = useSignal<'dark' | 'light'>('dark');
    const fontScale = useSignal(1); // 1 = базовый размер
    const currentChapterIndex = useSignal(0);
    const progress = useSignal(0);
    const isMenuOpen = useSignal(false);

    const save$ = $((scrollY?: number) => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    chapterIndex: currentChapterIndex.value,
                    scrollY,
                    theme: theme.value,
                    fontScale: fontScale.value,
                }),
            );
        } catch {
            /* localStorage недоступен */
        }
    });

    // ================== ВОССТАНОВЛЕНИЕ ПОЗИЦИИ И СОХРАНЕНИЕ ПРОГРЕССА ==================
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        const container = document.querySelector<HTMLElement>('.reader-frame__inner');
        if (!container) return;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as {
                    chapterIndex?: number;
                    scrollY?: number;
                    theme?: 'dark' | 'light';
                    fontScale?: number;
                };

                if (
                    typeof parsed.chapterIndex === 'number' &&
                    parsed.chapterIndex >= 0 &&
                    parsed.chapterIndex < toc.length
                ) {
                    currentChapterIndex.value = parsed.chapterIndex;
                }
                if (parsed.theme === 'dark' || parsed.theme === 'light') {
                    theme.value = parsed.theme;
                }
                if (typeof parsed.fontScale === 'number') {
                    fontScale.value = parsed.fontScale;
                }

                requestAnimationFrame(() => {
                    container.scrollTo({ top: typeof parsed.scrollY === 'number' ? parsed.scrollY : 0 });
                });
            }
        } catch {
            // ignore
        }

        const onScroll = () => {
            const max = container.scrollHeight - container.clientHeight;
            const y = container.scrollTop;
            progress.value = max > 0 ? (y / max) * 100 : 0;
            save$(y);
        };

        // лёгкая защита от копирования / печати
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'c' || e.key === 's' || e.key === 'p')) {
                e.preventDefault();
            }
        };

        container.addEventListener('scroll', onScroll);
        document.addEventListener('keydown', onKeyDown);

        cleanup(() => {
            container.removeEventListener('scroll', onScroll);
            document.removeEventListener('keydown', onKeyDown);
        });
    });

    // ================== РЕНДЕР ==================
    return (
        <div class={['reader-root', `reader-root--${theme.value}`].join(' ')}>
            {/* Прогресс-бар */}
            <div class="reader-progress">
                <div class="reader-progress__bar" style={{ width: `${progress.value}%` }} />
            </div>

            {/* Хэдер */}
            <header class="reader-header">
                <div class="reader-header__left">
                    <div class="reader-book-meta">
                        <div class="reader-book-title">{meta.title}</div>
                        <div class="reader-book-author">{meta.author}</div>
                    </div>
                </div>

                {/* Центр: выбор главы */}
                <div class="reader-header__center">
                    <select
                        value={toc[currentChapterIndex.value]?.id}
                        onChange$={(e) => {
                            const select = e.target as HTMLSelectElement;
                            const idx = toc.findIndex((ch) => ch.id === select.value);
                            if (idx === -1) return;

                            currentChapterIndex.value = idx;

                            const anchor = document.getElementById(`chapter-${select.value}`);
                            if (anchor) {
                                anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            } else {
                                window.scrollTo({ top: 0 });
                            }
                            save$();
                        }}
                    >
                        {toc.map((ch) => (
                            <option value={ch.id} key={ch.id}>
                                {ch.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Правая часть: шрифт */}
                <div class="reader-header__right">
                    <button
                        type="button"
                        class="reader-icon-btn"
                        onClick$={() => {
                            fontScale.value = Math.max(0.9, fontScale.value - 0.1);
                        }}
                    >
                        A–
                    </button>
                    <button
                        type="button"
                        class="reader-icon-btn"
                        onClick$={() => {
                            fontScale.value = Math.min(1.4, fontScale.value + 0.1);
                        }}
                    >
                        A+
                    </button>
                </div>

                {/* Кнопка “три точки” — только стили решают, где она видна */}
                <button
                    type="button"
                    class="reader-menu-trigger"
                    onClick$={() => (isMenuOpen.value = !isMenuOpen.value)}
                    aria-label={meta.menu}
                >
                    <span />
                    <span />
                    <span />
                </button>

                {isMenuOpen.value && (
                    <div class="reader-menu">
                        <div class="reader-menu__row">
                            <button
                                type="button"
                                class="reader-menu__btn"
                                onClick$={() => {
                                    fontScale.value = Math.max(0.9, fontScale.value - 0.1);
                                }}
                            >
                                A–
                            </button>
                            <button
                                type="button"
                                class="reader-menu__btn"
                                onClick$={() => {
                                    fontScale.value = Math.min(1.4, fontScale.value + 0.1);
                                }}
                            >
                                A+
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Рамка и контент */}
            <main class="reader-frame">
                <div class="reader-frame__inner">
                    <article class="reader-page" style={{ fontSize: `${fontScale.value}rem` }}>
                        <Slot />
                    </article>
                </div>
            </main>
        </div>
    );
});

/** Текст книги. Обычная функция (не component$) — рендерится на сервере внутри страницы. */
export const BookText = ({ chapters }: { chapters: BookChapter[] }) => (
    <>
        {chapters.map((ch) => (
            <section class="reader-chapter" id={`chapter-${ch.id}`} key={ch.id}>
                <h2 class="reader-chapter-title">{ch.title}</h2>
                {ch.paragraphs.map((para, idx) => {
                    const paraId = `p-${ch.id}-${idx}`;
                    return (
                        <p class="reader-paragraph" data-id={paraId} key={paraId}>
                            {para}
                        </p>
                    );
                })}
            </section>
        ))}
    </>
);
