# Adding Site Properties

Site properties are the way you pass in different variables to different sites. This can be often useful if you are using a similar tool across your sites, but one that requires slightly different configuration (such as an ID) per property.

For an in-depth discussion of site properties, check out this page within your organization's [Arc Learning Center](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/feature-pack/properties.md).

> Note: If a site property is not specified for a specific site, it will fallback to the default set within `/properties/index.json`.

### Adding site properties across all sites

You can add default site properties within `/properties/index.json`. This can be useful in cases where your organization seeks to use a single configuration setup across sites.

### Adding site properties to specific sites

If you're just getting started, you'll see two files within `/sites`: `the-gazette.json` and `the-prophet.json`. Each of these contain an object in which an org name is specified.

### Add a DFP Id to your Site Properties

One of the first things developers often want to configure is a DFP ID, so they can begin development on ads. To do that, navigate to `/properties/index.json`, and add it to the _dfp_id_ site property.

Next: [Adding another site](./adding-another-site.md)
