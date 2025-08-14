interface Props {
  params: { id: string };
}

export default function CategoryPage({ params }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Category {params.id}</h1>
      <p>Details for category {params.id} go here.</p>
    </div>
  );
}
