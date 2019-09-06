# Adding another site

If you want to see how to add another site to your PageBuilder Fusion repo, it's your lucky day, and you're on the right doc.

In this recipe, we'll add a site called "The Washington Post" to our default set up.

### Add your site's information to your `mocks` folder

Within `/mocks/siteservice/api/v3/website`, add this string to the end of the string already there, ensuring proper JSON syntax:

```
    {
      "_id": "washington-post",
      "display_name": "The Washington Post",
      "is_default_website": false
    }
```

`_id` - this corresponds to the ID of the site you set up in Site Service. Always lowercase, spaces separated by dashes. Ex: `washington-post`

`display_name` - this can be whatever you'd like it to be, as it only appears locally. Ex: `The Washington Post`

`is_default_website` - `true` or `false`. You can only have one site set to be the default. This is the site that PageBuilder attempts to render pages from by default. **It is highly useful to have a default site set -- you can change this at any time!**

> _A note on making changes to this file:_
>
> You can add/remove sites from this at any time, but you will need to clear your cookies in order for PageBuilder to see them and get them to appear in the drodpown.

If you clear your cookies and refresh PageBuilder locally, you should now see your site appear in the website's dropdown, and you should be able to view that page at a link like this:

`localhost/pf/sample-page?_website=washington-post`

However, it will likely look ugly, as we haven't configured any style sheets for this particular site! Let's do that now.

### Add your site name

If you look at the tab at the top of the screen, you'll just see `Org Name`. That's no good!

Within `/properties/sites`, create a file called `washington-post.json`. Inside that, put the following:

```
 {
   "defaultSiteTitle": "The Washington Post"
 }
```

At this point, since you've added a file, you'll need to turn Fusion off and on to get it to register, so you can see it appear in your tab.

(However, since you're about to add a few more folders and files, you can wait until the end of this exercise, and just do it once).

### Add your style folders

> **Note:** It might be helpful to look at the `the-gazette` or `the-prophet` directory to see how these files are structured, if you get stuck or confused.

1. Within `src/websites`, create a folder with the following files:
   ```
     /washington-post
       index.js
       washington-post.scss
   ```
1. Within `properties/index.json`, add the text `washington-post` to the `sites` array.
1. Let's put a single class within `washington-post.scss`, just to get us going. In that file, put:
   ```
     p {
       color: blue;
     }
   ```
1. From within `index.js`, import `washington-post.scss`, like so:
   ```
     import './washington-post.scss';
   ```
1. From the root of the repo, run `npm run dev`. If all goes according to plan, you should see a message that says:
   ```
     Building assets for: the-gazette,the-prophet,washington-post
   ```
   _and_ if you look in `resources/dist`, you should see your `washington-post` folder, with your compiled styles.

Now, if you go to `localhost/pf/sample-page?_website=washington-post`, you should see that all your paragraph tags are very blue.

You've effectively added another site locally that you can now develop on!

Keep in mind, that do this in your actual sandbox and production environments, this site would also need to be set up in Site Service, which you can find out how to do in the Arc Learning Center.

Next, let's go deeper into what exactly is happening in those styles folders.

Next: [Going deep into styles](../site-styles/adding-styles.md)
