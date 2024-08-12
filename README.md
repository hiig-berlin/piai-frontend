## Installation

Configure the environment variables (see below) in an `.env.local` file.
```
npm install
npm run dev
```

## Environment Variables

Variable | Example | Explanation
---|---|---
`NEXT_PUBLIC_CMS_BASE_URL` | https://example.com | The full URL of the Headless CMS
`NEXT_PUBLIC_URL` | https://example.com | The full URLto the frontend
`NEXT_PUBLIC_DEFAULT_API_CACHE_TIME` | 60 | How many minutes for a page to expire
`NEXT_PUBLIC_PREVIEW_LOCKED` | 0 | If *1* the login screen will be shown 
`NEXT_PUBLIC_PREVIEW_PWD` | SuperSecure | The password needed get past the login screen
`NEXT_PUBLIC_MATOMO_TRACKING_URL` | https://track.example.com | Set to matomo url if you want to use usage tracking
`NEXT_PUBLIC_MATOMO_TRACKING_ID` | 21 |  | Set matomo property id if you want to use usage tracking
`REVALIDATE_TOKEN` | mrUrX8LP9Ec3tQDYnoGH | Shared secret between CMS and frontend permitting content revalidation
`DEPLOY_HOOK_URL` | https://example.com | Needed only for development. Set to the secret webhook URL to trigger a build by running `npm run deploy:live` or `npm run deploy:staging`

## CSS
The frontend is using [styled components](https://styled-components.com/docs/basics#getting-started) and if you really need to `.scss` which you could import wherever it suits you. 

Right now only one `.scss` is used `/styles/global.scss` which should be as little as possible. It includes all the css that is not dependend on the styled component theme. Use is as little as possible. 

Please define all global css variables here. 

```css
:root {
  --color-bg: rgba(255, 255, 255, 1);
  --color-text: #000;
  --color-hl: #ff0;
  ...
}
```

In the folder `/theme` you find styled component related files. Here you have a `globalstyle.ts` which is used by styled component to add css to every page. In globalstyle.ts you have access to the theme with it's *parametric* styling abilities.

You can configure the theme in `/theme/index.ts` (primarily for font styling) and `/theme/breakpoints.ts` to define the breakpoints. Next to the more usual tablet and desktop breakpoints we make use of a narrow phone breakpoint *default* and a ~360px *mobile*

## Style Componentens
Please add reusable style component. Like a <Button> in the `/components/styled` folder. You can aways extend these using. 

```JSX
const PinkButton = styled(Button)`
  background-color: pink;
`
```

## Using SVGs
To help you with preparing the SVG we've written a little script that takes all svgs in the folder `/assets/svg/original`, 
optimizes them (saving a copy in `/assets/svg/optimized`) and then also converts them into BASE64 encoded strings that are saved as components into the `/components/svgs/` folder. These can later be used as source for background images. 

Please put all your svgs into `/assets/svg/original` and run the following script

```bash
./scripts/convertsvgs.sh
```

*Use as Components*
You can import any svg as a component and 

```JSX
import Logo from "~/assets/svg/optimized/logo.svg";

export const Icon = () => {
  return (
    <div>
      <Logo fill="#ff0" width="100%" height="100%">
    </div>
  )
}
```

*As backgrounds*
As Next.js can't inline SVGs directly into css background `background-image: url('data:image/svg+xml,<svg ...')` from a file. One has to create component to do that. 

```JSX
import SvgMenu from "~/components/svgs/SvgMenu";

export const SvgBackground = () => {
  return (
    <span
      className={className}
      style={{
        display: "block",
        ...
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundImage: `url('data:image/svg+xml,${SvgMenu}')`,
      }}
    ></span>
  );
};
```

*Use directly*
As last resort option you can place the `<svg/>` code straight into your components

```JSX
export const Icon = () => {
  return (
    <div>
      <svg> ... </svg>
    </div>
  )
}
```


You can then make use of the generated SVGs in other component. `/components/svgs/SVGBackround.tsx` does give you an example. 

## Data Sanitazation
Never trust any html coming from the CMS or any other sources. Never directly make use of 

```JSX
<div
  dangerouslySetInnerHTML={{
    __html: unsafeHtmlString,
  }}
/>
```

always use 

```JSX
<SafeHtmlDiv html={type} />
```

```JSX
<SafeHtmlSpan html={type} />
```

or at least use the `safeHtml` function before setting `dangerouslySetInnerHTML`

```JSX
<div
  dangerouslySetInnerHTML={{
    __html: safeHtml(unsafeHtmlString),
  }}
/>
```

Please note some components (the ones with an `html` attribute)do the sanitization for you. E.g. 

```JSX
<Heading
  heading={fontStyle === "bold" ? "h2" : "h3"}
  html={heading}
/>
```  

## Using Images
Most images will be served from the CMS. <ApiImage> is the helper to render them. It takes care of sizing, loading icon, and retrieving .webp images if needed. 

Next.js <Image> should not be used for images coming from the CMS (as the CMS does resize and optimizes the images and next.js would just add another overhead.)

If you've got `cwebp` installed (via `brew install webp`) you can use the following script
```bash
./scripts/convertimages.sh
```

To convert images to the webp format. 




