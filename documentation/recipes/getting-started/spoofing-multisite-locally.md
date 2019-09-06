# Spoofing Multisite locally

You might have one site. You might have multiple sites. You might have one site but you have grand aspirations of having multiple sites.

PageBuilder Fusion can handle all those scenarios.

Your Sandbox and Production environments will generally come with multisite all set up (or you'll configure those sites in that environment's Site Service).

But how, as a developer, do you mock up this same structure locally?

> Note: The Skeleton Repo comes with two organizations baked in -- "the-gazette" and "Your Org". You can skip this step if you want to get into setting up fonts and styles for specific sites; however, if you want to really understand how to set up mock sites locally, this is the place to be.

### The secret is in the `mocks` folder

If you look at the root of your fusion directory, you will see a folder called `mocks`, with a file structure as follows:

```
mocks/
   /siteservice
     /api
       /v3
         website
```

> Note: This `mocks` folder is different than the `__mocks__` folder, where handy configurations for your tests can come into play)\*\*

Within the `website` file (also, please note that it does not have a file extension), you'll see something that looks like this:

```
    [
        {
            "_id": "the-gazette",
            "display_name": "the-gazette",
            "is_default_website": true
        },
        {
            "_id": "the-prophet",
            "display_name": "Your Org",
            "is_default_website": false
        }
    ]
```

> Note: this document is just an explanation for how to spoof multisite locally so PageBuilder recognizes it. If you want to see how to add a site so that your styles are built accordingly, and the name of your site appears in the tab at the top of the page, [see this recipe here](./adding-another-site.md).

Each of these objects can represent your site, as it exists in Site Service. By having a different object for each site, you set yourself up to mock up every site locally on PageBuilder on your machine.

Next: [Add some site properties](./adding-site-properties.md)
