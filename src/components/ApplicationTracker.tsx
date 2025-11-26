import { trackerCards, trackerColumns, type ApplicationStatus } from '@/data/tracker';
import { Calendar, ExternalLink, MoreHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactElement } from 'react';

type TrackerColumn = (typeof trackerColumns)[number];

export function ApplicationTracker(): ReactElement {
  const [columns, setColumns] = useState<TrackerColumn[]>(trackerColumns);
  const [cards, setCards] = useState(trackerCards);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTracker = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/tracker', { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to load tracker');
        const data = await response.json();
        setColumns(data.columns);
        setCards(data.cards);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setError('Unable to load the latest tracker data. Showing last saved state.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchTracker();

    return () => controller.abort();
  }, []);

  const statusOrder = useMemo<ApplicationStatus[]>(() => columns.map((column) => column.id), [columns]);

  const grouped = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        cards: cards.filter((card) => card.status === column.id),
      })),
    [cards, columns],
  );

  const moveCard = (cardId: string, step: number): void => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;
        const currentIndex = statusOrder.indexOf(card.status);
        const nextIndex = Math.min(Math.max(currentIndex + step, 0), statusOrder.length - 1);
        return { ...card, status: statusOrder[nextIndex] };
      }),
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Tracker</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Application pipeline</h1>
          <p className="text-sm text-slate-500">Stay on top of every opportunity from saved to offer.</p>
        </div>
        {isLoading ? <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Syncing…</span> : null}
        <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50" type="button">
          Export progress
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {grouped.map((column) => (
          <section key={column.id} className="min-w-[240px] flex-1 space-y-3">
            <header className={`flex items-center justify-between rounded-2xl border border-transparent ${column.color} px-3 py-2`}>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-600">{column.title}</p>
              <span className="rounded-lg bg-white/60 px-2 py-0.5 text-xs font-bold text-slate-500">{column.cards.length}</span>
            </header>

            <div className="space-y-3">
              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">{error}</div>
              ) : null}

              {column.cards.map((card) => {
                const currentIndex = statusOrder.indexOf(card.status);
                const canMoveBack = currentIndex > 0;
                const canMoveForward = currentIndex < statusOrder.length - 1;

                return (
                  <article key={card.id} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-teal-600">{card.title}</h3>
                        <p className="text-sm text-slate-500">{card.company}</p>
                        <p className="text-xs text-slate-400">{card.location}</p>
                      </div>
                      <button aria-label="More actions" className="rounded-full p-1 text-slate-300 transition hover:bg-slate-50 hover:text-slate-500" type="button">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {card.tags ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-4 space-y-2 text-xs text-slate-500">
                      {card.deadline ? (
                        <p className="inline-flex items-center gap-1 font-semibold text-rose-500">
                          <Calendar className="h-3 w-3" />
                          {card.deadline}
                        </p>
                      ) : null}
                      {card.submittedOn ? (
                        <p className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Submitted {card.submittedOn}
                        </p>
                      ) : null}
                      {card.interviewSlot ? (
                        <p className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {card.interviewSlot}
                        </p>
                      ) : null}
                      {card.notes ? <p className="text-slate-400">{card.notes}</p> : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="flex gap-2">
                        {canMoveBack ? (
                          <button
                            className="rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                            type="button"
                            onClick={() => moveCard(card.id, -1)}
                          >
                            ← Back
                          </button>
                        ) : null}
                        {canMoveForward ? (
                          <button
                            className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600 hover:bg-teal-100"
                            type="button"
                            onClick={() => moveCard(card.id, 1)}
                          >
                            Move forward →
                          </button>
                        ) : null}
                      </div>
                      {column.id === 'applied' ? <ExternalLink className="h-3.5 w-3.5 text-slate-300" /> : null}
                    </div>
                  </article>
                );
              })}

              <button
                className="w-full rounded-2xl border border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-slate-400 transition hover:border-slate-400 hover:text-slate-600"
                type="button"
              >
                + Add opportunity
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

