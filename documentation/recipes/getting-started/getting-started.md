# Getting Started with the Skeleton Repo

### What is this section?

These are steps to follow when you want to set up the Skeleton Repo to get a feel for how to work with a PageBuilder Fusion repository.

In these recipes, we will be starting up a bare-bones Skeleton Repo hooked up to a Mock ANS content source. If you'd like to hook up your organization's content, please follow the Fusion recipes. Following these instructions will skip past much of the initial setup found in the Fusion recipes documentation.

#### At this, point, you should:

1. Cloned down the Skeleton Repo.
1. Run `npm install` to get all your dependencies.
1. In one tab, run `npm run dev` to get your styles built.
1. In another tab, `npx fusion start` to get Fusion up and running.
1. Drag the example database from `/documentation/artifacts` into `/data/restore` (described at the bottom of the main [README.md](./../../../README.md#starting-from-a-database) section). It will disappear as it is gobbled up by the system.

At this point, if you go to `localhost/pf/admin`, you should see your PageBuilder environment set up, with a single page called `sample-page`.

> **Facts about this page:**
>
> This page has been configured to work across all your organization's sites, for simplicity's sake.

You can view this page by clicking through the admin, or by going to:

[`localhost/pf/sample-page/?_website=the-gazette`](localhost/pf/sample-page/?_website=the-gazette) or!
[`localhost/pf/sample-page/?_website=the-prophet`](localhost/pf/sample-page/?_website=the-prophet)

# Stuck? Lost? You can either:

1. Please file an issue on the Repo, explaining at what part of the stage you got stuck or confused. We are actively working to make these docs as easy to use, and we want to know what tripped you up.

1. If you have an active engagement, reach out to a Support Engineers and they'll help get you going.

Next: [Spoofing multiple sites locally](./spoofing-multisite-locally.md)
