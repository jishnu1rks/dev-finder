import { Badge } from "@/components/ui/badge";

interface TagListProps {
  tags: string[];
}

export function splitTags(tags: string) {
  return tags.split(",");
}

export default function TagsList({ tags }: TagListProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag: string) => (
        <Badge key={tag} variant="default" className="w-fit">
          {tag.trim()}
        </Badge>
      ))}
    </div>
  );
}
