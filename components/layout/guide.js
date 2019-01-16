import React from 'react'
import { MDXProvider } from '@mdx-js/tag'

import * as bodyLocker from '~/lib/utils/body-locker'
import Head from '~/components/layout/head'
import Layout from '~/components/layout/layout'
import Wrapper from '~/components/layout/wrapper'
import Main from '~/components/layout/main'
import Heading from '~/components/text/linked-heading'
import components from '~/lib/mdx-components'
import H1 from '~/components/text/h1'
import H2 from '~/components/text/h2'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import { P } from '~/components/text/paragraph'

const DocH2 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H2>{children}</H2>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

const DocH3 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

const DocH4 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H4>{children}</H4>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

class Guide extends React.Component {
  state = {
    navigationActive: false
  }

  handleIndexClick = () => {
    if (this.state.navigationActive) {
      bodyLocker.unlock()
      this.setState({
        navigationActive: false
      })
    }
  }

  render() {
    const {
      meta = {
        title: 'Now Documentation',
        description:
          'The knowledge base and documentation for how to use ZEIT Now and how it works.'
      }
    } = this.props
    const { navigationActive } = this.state

    return (
      <MDXProvider
        components={{
          ...components,
          h2: DocH2,
          h3: DocH3,
          h4: DocH4
        }}
      >
        <Layout>
          <Head
            titlePrefix=""
            titleSuffix=" - ZEIT Now Guides"
            title={`${meta.title}`}
            description={meta.description}
            image={meta.image}
          />

          <div className="guide-heading">
            <Wrapper>
              <H1>{meta.title}</H1>
              <P>{meta.description}</P>
            </Wrapper>
          </div>

          <Main>
            <div className="guide">{this.props.children}</div>
          </Main>

          <style jsx>{`
            .guide-heading {
              border-bottom: 1px solid #eaeaea;
              padding-top: 144px;
              padding-bottom: 16px;
            }

            .guide-heading :global(h1) {
              margin-bottom: 8px;
            }

            .guide-heading :global(p) {
              font-size: 16px;
              margin-top: 8px;
              color: #444444;
            }
          `}</style>
        </Layout>
      </MDXProvider>
    )
  }
}

export default Guide
