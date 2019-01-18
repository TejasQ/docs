import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import formatDate from 'date-fns/format'

import Head from '~/components/layout/head'
import Layout from '~/components/layout/layout'
import Wrapper from '~/components/layout/wrapper'
import Heading from '~/components/text/linked-heading'
import components from '~/lib/mdx-components'
import H1 from '~/components/text/h1'
import H2 from '~/components/text/h2'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import H5 from '~/components/text/h5'
import { P } from '~/components/text/paragraph'
import { GenericLink } from '~/components/text/link'
import { Avatar, AvatarGroup } from '~/components/avatar'
import HR from '~/components/text/hr'
import Stars from '~/components/stars'
import FeedbackInput from '~/components/feedback-input'

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
  render() {
    const {
      meta = {
        title: 'Now Documentation',
        description:
          'The knowledge base and documentation for how to use ZEIT Now and how it works.'
      }
    } = this.props

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
              <div className="guide-meta">
                <GenericLink href="#authors">
                  <AvatarGroup
                    size={24}
                    members={meta.authors.map(author => {
                      return { username: author }
                    })}
                  />
                </GenericLink>
                <span className="published">
                  {formatDate(meta.published, 'MMMM Do YYYY')}
                </span>
              </div>
            </Wrapper>
          </div>

          <Wrapper>
            <div className="guide">
              {this.props.children}
              <HR />
              <div className="rate-guide">
                <H5>How Was This Guide?</H5>
                <Stars />
                <FeedbackInput />
              </div>
              <HR />
              <div className="guide-author" id="authors">
                <H5>Written By</H5>
                <div className="authors-list">
                  {meta.authors.map(author => (
                    <div className="author-info" key={author}>
                      <Avatar size={32} username={author} />
                      <span className="username">{author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Wrapper>

          <style jsx>{`
            .guide {
              width: 100%;
              padding-bottom: 96px;
              padding-top: 32px;
            }

            .guide-heading {
              border-bottom: 1px solid #eaeaea;
              padding-top: 144px;
              padding-bottom: 16px;
            }

            .guide-meta {
              margin-top: 40px;
              display: flex;
              align-items: center;
            }

            .guide-meta :global(.avatar-group) {
              width: auto;
              margin-right: 16px;
            }

            .authors-list {
              display: flex;
            }

            .author-info {
              display: flex;
              align-items: center;
              margin-right: 24px;
              font-size: 14px;
            }

            .author-info :global(.avatar) {
              margin-right: 8px;
            }

            .published {
              color: #666;
              font-size: 14px;
            }

            .guide-heading :global(h1) {
              margin-bottom: 8px;
            }

            .guide-heading :global(p) {
              font-size: 16px;
              margin-top: 8px;
              color: #444444;
            }

            .rate-guide :global(h5) {
              margin-bottom: 24px;
            }
          `}</style>
        </Layout>
      </MDXProvider>
    )
  }
}

export default Guide
