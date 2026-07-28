interface PlaceholderPageProps {
  title: string;
  note: string;
}

export function PlaceholderPage({ title, note }: PlaceholderPageProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{note}</p>
    </div>
  );
}
