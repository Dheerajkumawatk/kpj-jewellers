export function AnnouncementBar() {
  const items = [
    "Buy 3 or more, Save 20%",
    "Free Shipping across India",
    "7-Day Easy Returns",
    "100% Certified Pearls",
  ];
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-charcoal text-primary-foreground overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="mx-8 text-xs tracking-widest uppercase flex items-center gap-8">
            {t}
            <span className="text-rosegold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
