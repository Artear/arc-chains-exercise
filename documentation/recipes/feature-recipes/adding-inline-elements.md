# Adding inline elements

## What is an inline element?

An inline element might be:

- An ad, DFP or some other provider
- Related content: a list of stories related to the article a user is reading
- A "Call to Action": Something like a button encouraging users to subcribe or follow.

This recipe will show you how to insert anything you'd like, wherever you need it, within the Article Body using the Article Body Core Component.

## How do I do it?

In your Feature implementation, you pass content to the ArticleBody Core Component like this:

```jsx
<ArticleBody data={contentElements} />
```

The `contentElements` are an array coming from `this.props.globalContent.content_elements` (we've camelCased them, per linter request). They represent the items in your article body -- all your paragraphs, images, videos and galleries.

Each of these content elements is an object that looks something like this (here's a text element, for example:)

```json
   {
     "type": "text",
     "content": I would be a string of text to be rendered in a paragraph."
   }
```

The Article Body Core Component will render any elements that have a type of `inline_element`. So if you have a content element that looks like this:

```jsx
   {
     "type": "inline_element",
     "element": <div>Hello, I am an inline element!</div>
   }
```

If the Core Component detects an element with type `inline_element`, it will render the corresponding `element` directly.

> Note: You must pass in the entire rendered component, as the Core Component will render it directly. Do all your manipulations outside of the Core Component, them massage it into the proper place in the array.

## I kind of get it, but I'm not sure.

[Take a look at our example implementation, which slots in some related content and inline ads.](../../../components/features/article/body/default.jsx)

## FAQs:

### Is the Article Body prescriptive in where it slots in elements?

Absolutely not. Your job as the developer is to manipulate the array of `content_elements` to include your inline elements. The Core Component will render any item that has a `type` of `inline_element`.

This way is much better than the Core Component trying to anticipate your needs. It gives you full control over the placement, allowing you to respond to business logic without relying on CC for code updates.
