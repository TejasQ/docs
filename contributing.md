# Contributing to the ZEIT Documentation

Thank you for your interest in contributing to the ZEIT Docs!

The following describes how to contribute to the ZEIT documentation, API reference, examples list, or guides website with either code or content.

#### Table of Contents

- [Reporting an issue](#reporting-issues)
- [Contributing Content](#contributing-content)
  - [Platform and Usage Documentation](#platform-and-usage-documentation)
  - [Guides](#guides)
  - [API Reference](#api-reference)
  - [Examples](#examples)

## Reporting Issues

If you have found a bug, a spelling mistake, missing information, or anything related to the ZEIT documentation that you feel is an issue that should be reported, please [create a new issue](https://github.com/zeit/docs/issues/new) here on GitHub. For issues relating to examples, please [create an issue on the now-examples repository](https://github.com/zeit/now-examples/issues/new).

When submitting an issue, please thoroughly and concisely describe the problem you are experiencing so that we may easily understand and resolve the issue in a timely manner.

## Contributing Content

There are multiple sections of the ZEIT Docs, including: the main [ZEIT platform and usage documentation](https://zeit.co/docs), [ZEIT API reference](https://zeit.co/docs/api), [examples](https://zeit.co/examples), and [guides](https://zeit.co/guides).

When contributing content to any of the previously mentioned sections, please fork this repository and then edit the content for the section that you want to contribute to. Please avoid submitting large pull requests containing contributions for multiple sections if the content is not interrelated.

You can run the documentation site locally by cloning this repository, installing the dependencies with `yarn`, and finally running the development server with `yarn dev`.

### Platform and Usage Documentation

The content for this section can be found in the `pages/docs` directory under version tags. We are currently focused on developing our documentation for Now platform version 2 and so the content for this version can be found within the `pages/docs/v2` directory.

Each `.mdx` file within the docs directory, aside from the API files, are independent pages; as [enabled by Next.js](https://nextjs.org/docs/#configuring-extensions-looked-for-when-resolving-pages-in-pages). You can edit existing files or create a new file under the section that the content belongs to.

As suggested by the `.mdx` extension, the ZEIT documentation uses [MDX](https://mdxjs.com), a markdown parser mixed with JSX. This allows us to use React components within markdown to nicely render our content.

An example of a docs MDX file:

```jsx
import Doc from '~/components/layout/docs'

import { TerminalInput } from '~/components/text/terminal'

export const meta = {
  title: 'The Title for the New Doc',
  description: 'The description for the new documentation page.'
  date: '1 January 2019'
}

This is the content written in Markdown with MDX!.

<TerminalInput># this is how we show the terminal input</TerminalInput>

The following is to allow the content to be exported as a page with our layout.

export default ({ children }) => <Doc meta={meta}>{children}</Doc>
```

When adding a new page to the v2 docs, make sure to add it to the appropriate section with a URL to the object located in the `lib/data/v2/docs.js` file.

### Guides

The content for this section can be found in the `pages/guides` directory.
It uses the same method as the [Platform and Usage Docs](#platform-and-usage-documentation) for content, using MDX for files and those files being top-level pages.

An example of a guides MDX file:

```js
import Guide from '~/components/layout/guide'

import { TerminalInput } from '~/components/text/terminal'

export const meta = {
  title: 'The Title for the New Guide',
  description: 'The description for the new guide page.'
  published: '1 January 2019',
  authors: ['your-zeit-username'],
  url: '/guides/guide-url'
}

This is the content written in Markdown with MDX!.

<TerminalInput># this is how we show the terminal input</TerminalInput>

The following is to allow the content to be exported as a page with our layout.

export default ({ children }) => <Guide meta={meta}>{children}</Guide>
```

The meta object described above is not optional since the information is used to list the guide.

When adding a new guide, make sure to import and export the meta of the guide in the `lib/data/guides.js` file. This enables the guide to be listed on the guides front-page.

### API Reference

The content for this section can be found in the `pages/docs/api` directory.
It uses the same versioning structure as `pages/docs`.

We are currently focused on expanding the documentation for the Now platform 2.0 API reference which can be found in `pages/docs/api/v2`.

As with the [Platform and Usage Docs](#platform-and-usage-documentation), the API uses MDX, although each file is not an independent page but instead is compiled into a single page, listing the file in the `lib/data/v2/api.js` file.

An example API Reference MDX file: https://github.com/zeit/docs/blob/master/pages/docs/api/v2/api-docs-mdx/api-basics/rate-limits.mdx

### Examples

The content for the examples section is not contained within this repository. To contribute an example, please head over to the [now-examples](https://github.com/zeit/now-examples) repository.
