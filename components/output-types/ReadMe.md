# Output Types

[ALC Documentation](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/creating-using-output-types.md)

## Your CSS must be 50KB or less!

This is one of the biggest things to remember when it comes to AMP. [We've implemented a size limiter that will cause your build to fail at 45KB, to help keep things in line.](https://github.com/wapopartners/Skeleton-PageBuilder-Fusion-Features/blob/dev/config/plugins.js#L35-L43)

## Default Output Type

TODO Add some docs.

## AMP Output Type

TODO Add some docs.

### What am I responsible for when it comes to AMP?

1. You need to determine what AMP script tags need to be on the page.

   - This will depend on your organization's needs; there are many AMP components available, including both **built-in** and **extended** components.

   - **built-in** components come with the AMP markup -- an example of this might be [**amp-img**](https://www.ampproject.org/docs/reference/components/amp-img). This means you do not need to include any extra `script` tags within your `amp.jsx` output type to use these components.

   - **extended** components might be something like the [**amp-instagram**](https://www.ampproject.org/docs/reference/components/amp-instagram) oembed. These do not come by default, and will need to be added by you.


2. Determine what kind of `fallback` you will set on your AMP output type.

   - It is **highly** recommended to set the `fallback` to false, [as seen here](https://github.com/wapopartners/Skeleton-PageBuilder-Fusion-Features/blob/dev/components/output-types/amp.jsx#L65).

     - **Why?** The `.fallback = false` bit tells PageBuilder: "Hey, if an `amp.jsx` file is not defined, do **not** fallback to the `default.jsx` file when rendering the feature.

     - This prevents you from having to set an `amp.jsx` file for every feature, and takes care of a nightmare scenario: An editor adding a feature to the page that does not have an `amp.jsx` file, and causing all the AMP pages to invalidate.

       - Here is how that might happen:

         - The editor inserts a component not having an AMP version when the AMP output type doesn't have a fallback.

         - This results in the rendering of the component falling back to the `default` version, which is not (and shouldn't be) AMP optimized.

         - The rendering for that component invalidates the AMP page.

   - Take a look at the docs for more ideas on how to use the fallback parameter.

3. Import your styles into AMP.

   - If you are using PageBuilder for a single site, you can simply import your base stylesheet like this:

     - `import "~/resources/dist/base/css/style.css";`

   - These styles are then output [like this](https://github.com/wapopartners/Skeleton-PageBuilder-Fusion-Features/blob/dev/components/output-types/amp.jsx#L46-L57).

   - If you are _multi-site_ -- PageBuilder Fusion does not quite yet support pulling in site-specific files for AMP pages, but this planned to be done by a special PageBuilder `<Resources>` component. For now, pull in the base style sheet.

4. Keep your CSS under 50KB.

   - There are many ways to do this:

     - Use as close to the same CSS on your desktop site as you do on your AMP site. This keeps your desktop site running blazing fast, and mean that your CSS is easier to maintain. (It's also why you are encouraged to use a framework).

    - Take advantage of the Size Limiter, described earlier. We've set it to fail at 5KB. You do have control over what you want this buffer to be!
