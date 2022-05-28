import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";

const A = styled.a`
  text-transform: uppercase;
  display: inline-block;
`;

export const MenuJumpToAnchor = ({
  anchor,
  title,
  onClick,
}: {
  anchor: string;
  title: string;
  onClick?: Function;
}) => {
  return (
    <span>
      <A
        href={anchor}
        onClick={(event: any) => {
          event.preventDefault();
          const hash = event?.target?.getAttribute("href");

          if (hash) {
            const target = document.querySelector(hash);
            if (target) {
              const header: HTMLDivElement | null = document.querySelector(".header.with-hero");
              const subMenu: HTMLDivElement | null =  document.querySelector(".header.with-hero .subMenu");
              let adjust = -30;
              if (header) {
                if (window.scrollY < target.offsetTop && subMenu) {
                  adjust -= subMenu.offsetHeight;
                } else {
                  adjust -= header.offsetHeight;
                }
              }
              window.scrollTo({
                top: target.offsetTop + adjust,
                behavior: "smooth",
              });
            }
          }
          if (typeof onClick === "function") onClick.call(null);
        }}
        dangerouslySetInnerHTML={{
          __html: safeHtml(title),
        }}
      />
    </span>
  );
};
