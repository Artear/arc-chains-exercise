# Dependency Management

With so many packages and components, how does one keep their dependencies in check?

One way is via a tool called [GreenKeeper](https://greenkeeper.io/#how-it-works). This is a bot that watches your repo and automatically files a PR if it detects than an updated version of a package has been created. It will not merge the PR for you, allowing you to do so at your leisure.

Greenkeeper is not something that is offered out of the box with Arc, as it requires a separate payment with that company; however, it is easy enough for you to enable it in your repo, should your company decide to pursue it.

### How do I enable Greenkeeper?

If you're enabling it for your own organization, follow the instructions on GreenKeeper's website. If you're on Arc doing this on behalf of a client, reach out to your Arc Teammates and we'll get you in.

> Note: To enable GreenKeeper, you must get all your dependencies up to date. This can often be a bit painful in the beginning, if many of them are out of date. It is advised that, if you are enabling GreenKeeper for the first time, you should allot a ticket with at least 3 story points to give you enough time to sort things out.

For repositories in which Arc manages the code, we do have a suggested workflow.

### What do I do when Greenkeeper files a PR?

1. **Create a ticket.** Either the Product Owner, TDM or a developer can create one. These tickets should generally be estimated at least as 1 story point. Sometimes, it will be as simple as installing the latest package to upgrade, but sometimes it may require more effort.
   - If there is a lot of uncertainty, file a spike ticket for a developer to investigate the upgrade. Your project won't break in the meantime, and this way the work can proceed without breaking your Agile flow.
1. **Test GreenKeeper's PR.** Once the ticket has been created and the developer is ready to rock, pull down the PR and run `npm install` to get GreenKeeper's good stuff. You can generally test by doing the following:
   - `npm install`
   - `npm run build`
   - `npm test`
   - `npm run lint` (or whatever your teams linting command is)
1. Once you have verified that all those commands are returning what you expect, fire up the project with `npx fusion start` and do some basic regression testing. If the package affected something very specific, you can start with that one.
1. Once all that looks good, merge in the PR and deploy a bundle to your `dev` or `sandbox` environment.

### What if I have a HUGE amount of dependencies to upgrade, and I don't know where to start?

Check the Skeleton Repo list of closed PRs -- if you copied from Skeleton Repo, chances are, we got the same PR you got from Greenkeeper. (Here's an example.)[https://github.com/wapopartners/Skeleton-PageBuilder-Fusion-Features/pull/67]
