# Lazy rendering

The [lazy-child](https://www.npmjs.com/package/lazy-child) module can be used to
lazily render entire features or parts of features. This module simplifies
implementing lazy rendering into two steps:

- configuring a placeholder (via the `renderPlaceholder` prop).
- rendering a child element (or elements), which is deferred until the
  placeholder enters the viewport (including optional offsets).

A simple example implementation of a lazily rendered image can be found at
[`components/features/article/body/_children/lazyImage.js`](/components/features/article/body/_children/lazyImage.js).
