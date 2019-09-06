# Fonts, fonts, fonts!

Fonts are critically important to any brand. PageBuilder gives you the ability to add fonts across all your properties, or specify fonts for individual brands.

Before working through this file, ensure that [your styles are properly wired up.](./adding-styles)

## Preserving brand awareness, with defaults for consistency

Let's say you have ten sites, nine of which should have the same font, but one of which has a distinctive flair and style critical to brand awareness.

This recipe will walk you through specifying a base font for 9 of your sites, and then weaving in your brand-specific font.

## What comes out of the box?

The Skeleton repo comes equipped with four open source fonts, often used together on the web. The repo also uses `arc-frame`, a CSS Framework as an NPM module that incorporates documented CSS helper classes, using the BEM naming convention.

For fonts specifically, the framework includes three classes:

1. `font--primary`
2. `font--secondary`
3. `font--tertiary`

#### Including all font files (WOFF format)

If you have specific font files, place them inside your `/resources/fonts` folder.

If you'd like to see an example, open up that folder -- there are currently four open source fonts in there: `merriweather`, `montserrat`, `source-sans-pro` and `playfair display`.

Plop your font files inside, run `npm run build` or `npm run dev`, and you should see them compiled out to `resources/dist/fonts`.

#### Setting a base font from your font files

Within `src/base/framework/_fonts.scss`:

1. Specify your font faces, in accordance with the files you just dropped inside `resources/fonts`. Example:
   ```
   @font-face {
     font-family: 'Montserrat';
     font-weight: 400;
     src: url('./../../fonts/montserrat/Montserrat-Regular.woff') format('woff');
   }
   ```
1. Within `src/base/_framework-overrides`, add your font family names to the proper spots here:
   ```
     $font: (
       primary: 'Merriweather',
       secondary: 'Montserrat',
       tertiary: 'Helvetica'
     ) !default;
   ```
1. See if it worked by starting up PageBuilder Fusion and going to `http://localhost/pf/simple-page`. You should see your fonts reflected on your article headline and your body copy.

**At this point, by default, all of your sites will inherit your chosen fonts.**

#### Giving a single site a specific font

Take a peek within `src/websites`. You'll see two folders, each with the following structure:

```
websites
  /the-gazette
    /extend
      _index.scss
      _*.scss (any other SCSS files used for overriding elements at a website level)
    _framework-overrides.scss
    the-gazette.scss
    index.js
```

1. Create a file within `/extend` called `_fonts.scss` (this file may already exist).
1. Within that file, add your site specific font-face declarations, just as you did when you set up a base font above.
1. Within `_framework-overrides.scss`, add a SASS map, or edit one if it's already there, to have your proper font-family names, exactly as you did when you specified the base font above.
1. Run `npm run build` or `npm run dev` and pull up your site. You should see your site-specific font on the site of your choice, while the rest of your sites use the base font.

#### Adding more than three fonts to a site

We recommend using a `primary`, `secondary` and `tertiary` font for most of your use cases -- but of course, you might need something more specific.

If you need to use more fonts, declare more font-faces where you declared the other ones. You can then use `font-family: [your-font];` within your CSS.

Next: [Testing your features](./../testing/testing-your-features.md)
