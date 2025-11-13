// components/tools/network/MemberList.tsx
import styled from "styled-components";
import { Box } from "../shared/ui/Box";
import { Tag, Tags } from "../shared/Styled";
import { Icon } from "../shared/ui/Icon";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";
import Link from "next/link";
import { Grid, Blurb, Entry, Label } from "./Styled";

export default function MemberGrid({
  list,
  currentTag,
  onTagClick,
  selectedEntry,
  setSelectedEntry,
}: {
  list: any[];
  currentTag: string;
  onTagClick: (tag: string) => void;
  selectedEntry: number | undefined;
  setSelectedEntry: (index: number | undefined) => void;
}) {

  // Remove https:// and trailing / from list entry "link" and create linkBeautified
  list.forEach((entry) => {
    entry.linkBeautified = entry.link.replace(/^https?:\/\//, "").replace(/\/$/, "");
  });

  return (
    <Grid>
      {list.map((entry, i) => {
        const isExpanded = selectedEntry === i;
        return (
          <Entry 
            key={i} 
            isExpanded={isExpanded}
            onClick={() => setSelectedEntry(isExpanded ? undefined : i)}
          >
            <h2>
              {entry.name}
            </h2>
            <Icon stc type="marker">
              {entry.location}
            </Icon>
            <Tags onClick={(e) => e.stopPropagation()}>
              {entry.tags.map((tag: string, j: number) => {
                const isActive = currentTag === tag;
                return (
                  <Tag
                    key={j}
                    isActive={isActive}
                    onClick={() => onTagClick(isActive ? "" : tag)}
                    tool="network"
                  >
                    {tag}
                    {isActive && <Icon type="close" stc inline />}
                  </Tag>
                );
              })}
            </Tags>

            {isExpanded && (
              <>
                <Label>Website</Label>
                <Blurb className="link">
                  <ToolSvgBackground type="globe" />
                  <Link
                    href={entry.link}
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    {entry.linkBeautified}
                  </Link>
                </Blurb>
                <Label>People</Label>
                {entry.people.map((person: any, j: number) => (
                  <Blurb key={j}>
                    <ToolSvgBackground type="user" />
                    <div>
                      {person.name}
                      {person.role && `, ${person.role}`}
                      {person.link && (
                        <>
                          <span>, </span>
                          <Link
                            href={person.link}
                            target="_blank"
                            rel="nofollow noreferrer"
                          >
                            Profile website
                          </Link>
                        </>
                      )}
                    </div>
                  </Blurb>
                ))}
              </>
            )}
          </Entry>
        );
      })}
    </Grid>
  );
}
