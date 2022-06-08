/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { AspectRatio } from "./AspectRatio";
import { LoadingIcon } from "./LoadingIcon";

export type ApiImageSizes = {
  landscape: string;
  portrait: string;
};

export type ApiImageType = {
  alt: string;
  imgSizes?: string | ApiImageSizes;
  mode?: "constrain" | "fill";
  loading?: "eager" | "lazy";
  types?: string[];
  sizes: any;
  ratio?: string;
  captionIndex?: number;
  aspectRatioDirection?: "width" | "height";
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  bgColor?: string;
};

const ImgContainer = styled.div<{
  mode: "constrain" | "fill";
  aspectRatioDirection: "width" | "height";
}>`
  width: ${({ mode, aspectRatioDirection }) =>
    mode == "fill" || aspectRatioDirection === "width" ? "100%" : "auto"};
  height: ${({ mode, aspectRatioDirection }) =>
    mode == "fill" || aspectRatioDirection === "height" ? "100%" : "auto"};
  position: relative;

  img {
    opacity: 0;
    transition: opacity 0.5s;
  }

  &.loaded {
    img {
      opacity: 1;
    }
  }
`;

const CaptionIndex = styled.div`
  position: absolute;

  color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 0.08em;

  text-shadow: 0px 0px 1px #000;

  ${(props: any) => props.theme.textStyle("caption")};
  
  left: calc(var(--size-1) * 0.5);
  bottom: calc(var(--size-1) * 0.5);
  width: var(--size-1);
  height: var(--size-1);
  
`;

export const ApiImage = ({
  alt,
  types = ["webp", "jpg"],
  imgSizes = {
    landscape: "100vw",
    portrait: "100vw",
  },
  sizes,
  mode = "constrain",
  objectFit = "cover",
  objectPosition,
  ratio,
  aspectRatioDirection = "width",
  bgColor = "#000",
  captionIndex,
  loading = "lazy",
}: ApiImageType) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const onImgLoaded = () => {
      if (mounted) setIsLoading(false);
    };

    if (imgRef?.current?.complete && imgRef?.current?.naturalWidth) {
      onImgLoaded.call(null);
    } else {
      if (imgRef?.current) {
        imgRef.current.onload = onImgLoaded;
        imgRef.current.onerror = () => {
          if (mounted) setIsError(true);
          onImgLoaded();
        };
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  let sortedFiles: any[] = [];
  if (typeof sizes === "object") {
    sortedFiles = Object.keys(sizes).reduce((carry: any[], key: string) => {
      if (key.indexOf("-") === -1 && key.indexOf("level") === 0) {
        carry.push({
          url: sizes?.[key as any],
          width: sizes?.[`${key}-width` as any],
          height: sizes?.[`${key}-height` as any],
        });
      }
      return carry;
    }, []);
  } else if (Array.isArray(sizes)) {
    sortedFiles = [...sizes];
  }

  sortedFiles.sort((f1: any, f2: any) => {
    if (f1.width > f2.width) return -1;
    if (f1.width < f2.width) return 1;
    return 0;
  });

  const width = sortedFiles?.[0]?.width ?? 300;
  const height = sortedFiles?.[0]?.height ?? 200;

  let parsedObjectPosition = objectPosition;
  if (
    typeof parsedObjectPosition === "string" &&
    parsedObjectPosition.indexOf(" ") === -1
  ) {
    switch (parsedObjectPosition) {
      case "top":
        parsedObjectPosition = "center top";
        break;

      case "right":
        parsedObjectPosition = "right center";
        break;

      case "center":
        parsedObjectPosition = "center center";
        break;

      case "bottom":
        parsedObjectPosition = "center bottom";
        break;
      case "left":
        parsedObjectPosition = "left center";
        break;
    }
  }
  return (
    <ImgContainer
      className={`${
        isLoading ? "loading" : isError ? "error" : "loaded"
      } apiimage`}
      mode={mode}
      aspectRatioDirection={aspectRatioDirection}
    >
      <AspectRatio
        ratio={ratio ?? `${width} / ${height}`}
        bgColor={bgColor}
        mode={mode}
        direction={aspectRatioDirection}
        objectFit={objectFit}
        objectPosition={parsedObjectPosition}
      >
        {sortedFiles?.length > 0 && (
          <picture>
            {types.includes("webp") && (
              <source
                srcSet={sortedFiles
                  .map((file) => {
                    return `${file.url}.webp ${file.width}w`;
                  })
                  .join(",")}
                sizes={
                  imgSizes
                    ? typeof imgSizes === "string"
                      ? imgSizes
                      : imgSizes[width >= height ? "landscape" : "portrait"]
                    : undefined
                }
                type="image/webp"
              />
            )}
            {types.includes("jpg") && (
              <source
                srcSet={sortedFiles
                  .map((file) => {
                    return `${file.url} ${file.width}w`;
                  })
                  .join(",")}
                sizes={
                  imgSizes
                    ? typeof imgSizes === "string"
                      ? imgSizes
                      : imgSizes[width >= height ? "landscape" : "portrait"]
                    : undefined
                }
                type="image/jpeg"
              />
            )}
            <img
              ref={imgRef}
              src={`${sortedFiles?.[0]?.url ?? ""}`}
              alt={alt}
              width={width}
              height={height}
              loading={loading}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </picture>
        )}

        {sortedFiles?.length > 0 && (
          <LoadingIcon loading={isLoading} color="#fff" />
        )}
      </AspectRatio>
      {captionIndex && (
        <CaptionIndex>
          <span>{captionIndex}.</span>
        </CaptionIndex>
      )}
    </ImgContainer>
  );
};
