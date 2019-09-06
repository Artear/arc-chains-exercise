# Adding logos per site

If you're keeping with our out of the box webpack configuration, you should place any site images or icons inside the `/resources/images` folder.

PageBuilder knows that these images are available at these paths, so you can reference them within your features as `/pf/resources/images/path/to/image.svg`

Here, we'll walk you through adding logos per site.

## Where do the logos live?

Look within the `/resources/images` folder. You'll see two folders, one for `the-gazette` and one for `the-prophet`.

Within those folders, you'll see another folder called `logo`, and within that, a `logo.svg` that represents the logo for that particular organization.

> Note: You can certainly change up this folder structure depending on your opinions or needs. In this example, we've opted for a flatter approach to make predicting the paths of the images a little simpler.

You can access these within your feature code like so:

```
  const {arcSite, deployment} = this.props;
  const imageUrl = `/pf/resources/images/${arcSite}/logos/logo.svg?d=${deployment}`;
```

Take a look at the `Logo.jsx` component within the `/sample/masthead/_children` folder for a sense of how that works.

### Optional: Set your logo settings via Site Properties

Ideally, you'll have exactly the SVG you want to render, perfectly formatted, within your `/images/` folder. But, if you want more fine-grained control, you can set the size of each logo in your `siteProperties` section. Take a look at `/properties/sites/the-gazette.json` to see how to do that.

_What is that `${deployment}` business?_

Fusion needs to know what image to render. Adding that tells Fusion where to fetch that image from, successfully busting the cache on subsequent deployments
