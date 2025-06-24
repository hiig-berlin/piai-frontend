import { Tags, Tag } from "../shared/Styled";
import { Icon } from "../shared/ui/Icon";
import { MemberFilterWrapper } from "./Styled";

export default function MemberFilter({
  tags,
  currentTag,
  onTagClick,
  toolSlug,
}: {
  tags: string[];
  currentTag: string;
  onTagClick: (tag: string) => void;
  toolSlug: string;
}) {
  return (
    <MemberFilterWrapper>
      <h2>Members of the network</h2>
      <Tags className="filter">
        {tags.map((tag, i) => {
          const isActive = currentTag === tag;
          return (
            <Tag
              key={i}
              tool={toolSlug}
              isActive={isActive}
              onClick={() => onTagClick(isActive ? "" : tag)}
            >
              {tag}
              {isActive && <Icon type="close" stc inline />}
            </Tag>
          );
        })}
      </Tags>
    </MemberFilterWrapper>
  );
}
