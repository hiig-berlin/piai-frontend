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
Next.js can't inline SVGs directly into css background `background-image: url('data:image/svg+xml,<svg ...')`. One has to create component to do that. 

To help you creating the component we've written a little helper script that takes all svgs in the folder `/assets/svg/original`, 
optimizes them (saving a copy in `/assets/svg/optimized`) and then also writes importable components into the `/components/svgs/` folder.

To execute the script just run 

```bash
./scripts/convertsvgs.sh
```

You can then make use of the generated SVGs in other component. `/components/uk/SVGBackround.tsx` does give you an example. 

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
