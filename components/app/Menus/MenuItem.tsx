import React from "react";
import styled from "styled-components";
import Link from "next/link";
import safeHtml from "~/utils/sanitize";

const A = styled.a`
  text-transform: uppercase;
  display: inline-block;
`;

export const MenuItem = ({
  item,
  target,
  rel,
  onClick,
}: {
  item: any;
  target?: string;
  rel?: string;
  onClick?: (event: any) => void;
}) => {
  return (
    <span>
      <Link href={item?.url ?? ""} passHref>
        <A
          title={
            item?.attr_title !== item?.title ? item?.attr_title : undefined
          }
          target={target ?? item?.target ?? undefined}
          rel={rel ?? item?.xfn ?? undefined}
          className={item?.active ? "menu-link-active" : undefined}
          onClick={onClick}
          dangerouslySetInnerHTML={{
            __html: safeHtml(item?.title),
          }}
        />
      </Link>
    </span>
  );
};
