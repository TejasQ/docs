# ZEIT Documentation

This is the public documentation for **ZEIT Now** all other related services.<br/>
You can access this documentation online at https://zeit.co/docs .

### Running Locally

To get started developing locally, clone this repository, `cd` into the directory, and then install the dependencies:

```sh
yarn
```

Next, you can run the app with:
(The app is written in [Next.js](https://github.com/zeit/next.js))

```sh
yarn dev
```

Now the documentation app will be running at http://localhost:3000/.

### Editing Docs Content

You can find the source of the documentation inside the `pages/docs` directory and the guides source in the `pages/guides` directory.. Documentation is written in markdown with the help of some React components via [MDX](https://mdxjs.com/).

Those components give us additional features which are not available in markdown.

### Adding New Docs

Any document can be modified with markdown or any imported React component with the power of [MDX](https://github.com/mdx-js/mdx).

The following is the format of a docs page, which is used when creating any new document when placing that document within the `pages/docs` directory. The page extension must be `.mdx`.

```js
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

Then you can add it to the sidebar by editing the file located at: `lib/data/[version]/docs.js` but please note that we are focused on content relating to the latest [Now platform version](https://zeit.co/docs/v2/platform/overview/), 2.0.

### Adding a New Guide

A guide uses the same underlying technology as documentation pages, however exists in the `pages/guides` directory.

A file must be added using the `.mdx` extension and uses the following format:

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

### Adding Images and Assets

You can add images and assets into the `static` directory. Always try to avoid using hosted images.
If you are creating a new docs page, keep you images inside a subdirectory under `static/docs`.

### New Components

Always try to use the existing components and features in markdown. Create a new component or use a component from npm, unless there is no other option.

### Submiting Changes / New Doc Pages

We are happy to recieve any pull requests with changes that could make our documentation better and easier to understand.
