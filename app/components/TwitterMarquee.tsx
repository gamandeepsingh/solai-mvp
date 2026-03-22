"use client";

import { TweetCard } from "./TweetCard";

const TWEETS: string[] = [
  "https://x.com/solaiwallet/status/2035343160654885014?s=20",
  "https://x.com/solaiwallet/status/2035091508333052212?s=20",
  "https://x.com/solaiwallet/status/2035068857573154833?s=20",
  "https://x.com/solaiwallet/status/2035622366408274220?s=20",
  "https://x.com/solaiwallet/status/2034697809031831959?s=20",
];

const getTweetId = (value: string) => {
  const match = value.match(/status\/(\d+)/);
  return match?.[1] ?? value;
};

export default function TwitterMarquee() {
  const ids = TWEETS.map(getTweetId).filter(Boolean);
  const loopIds = ids.length > 0 ? [...ids, ...ids] : [];

  return (
    <section className="relative bg-black border-t border-white/6 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">Community</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white/85 tracking-tight">
            Check out the post from our Twitter community and share your experience with us!
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-black to-transparent z-10" />

        {loopIds.length > 0 ? (
          <div className="marquee-track animate-marquee px-6">
            <div className="flex w-max gap-6">
              {ids.map((id, idx) => (
                <TweetCard
                  key={`${id}-${idx}`}
                  id={id}
                  className="min-w-80 bg-[#0e0e0e] border-white/8 text-white/80 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.8)]"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center justify-center rounded-2xl border border-white/8 bg-white/3 py-10 text-sm text-white/40">
              Add tweet URLs or IDs to display cards.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
