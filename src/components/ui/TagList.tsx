type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  if (!tags.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag} className="content-tag text-xs">
          {tag}
        </li>
      ))}
    </ul>
  );
}
