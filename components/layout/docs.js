import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/tag'

import * as bodyLocker from '~/lib/utils/body-locker'
import Head from '~/components/layout/head'
import Layout from '~/components/layout/layout'
import Main from '~/components/layout/main'
import Heading from '~/components/text/linked-heading'
import Sidebar from '~/components/layout/sidebar'
import Content from '~/components/layout/content'
import DocsNavbarDesktop from '~/components/layout/navbar/desktop'
import ToggleGroup, { ToggleItem } from '~/components/toggle-group'
import { GenericLink } from '~/components/text/link'
import components from '~/lib/mdx-components'
import H1 from '~/components/text/h1'
import H2 from '~/components/text/h2'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import { P } from '~/components/text/paragraph'
import dataV1 from '~/lib/data/v1/docs'
import dataV2 from '~/lib/data/v2/docs'
import lastEdited from '~/lib/data/last-edited.json'
import Select from '~/components/select'
import Note from '~/components/text/note'

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

class withDoc extends React.Component {
  state = {
    navigationActive: false,
    version: this.props.router.asPath.split(/(v[0-9])/)[1] || 'v2'
  }

  handleVersionChange = event => {
    const href = `/docs/${event.target.value}`
    this.props.router.push(href)
    this.handleIndexClick()
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
      router,
      meta = {
        title: 'Now Documentation',
        description:
          'The knowledge base and documentation for how to use ZEIT Now and how it works.'
      }
    } = this.props
    const { navigationActive, version } = this.state
    const versionData = version === 'v2' ? dataV2 : dataV1

    const date = lastEdited[meta.editUrl]
      ? new Date(lastEdited[meta.editUrl])
      : new Date()

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
            titleSuffix=" - ZEIT Documentation"
            title={`${meta.title}`}
            description={meta.description}
            image={meta.image}
            lastEdited={date}
          >
            {version !== 'v2' && <meta name="robots" content="noindex" />}
          </Head>

          <Main>
            <Sidebar active={navigationActive}>
              <div className="toggle-group-wrapper">
                <ToggleGroup>
                  <ToggleItem
                    active={
                      router.pathname.startsWith('/docs') &&
                      !router.pathname.startsWith('/docs/api')
                    }
                  >
                    <Link prefetch href="/docs">
                      <a onClick={this.handleIndexClick}>Docs</a>
                    </Link>
                  </ToggleItem>
                  <ToggleItem active={router.pathname.startsWith('/docs/api')}>
                    <Link prefetch href="/docs/api">
                      <a onClick={this.handleIndexClick}>API Reference</a>
                    </Link>
                  </ToggleItem>
                  <ToggleItem active={router.pathname.startsWith('/examples')}>
                    <Link prefetch href="/examples">
                      <a onClick={this.handleIndexClick}>Examples</a>
                    </Link>
                  </ToggleItem>
                </ToggleGroup>
              </div>
              <h5 className="platform-select-title">Now Platform Version</h5>
              <Select
                width="100%"
                defaultValue={version}
                onChange={this.handleVersionChange}
              >
                <option value="v1">v1</option>
                <option value="v2">v2 (Latest)</option>
              </Select>
              <div className="navigation">
                <DocsNavbarDesktop
                  data={versionData}
                  url={router}
                  scrollSelectedIntoView={true}
                />
              </div>
            </Sidebar>
            <Content>
              <div className="heading">
                {version === 'v1' && (
                  <Note>
                    This documentation is for <P.B>version 1</P.B> of the Now
                    platform. For the latest features, please see{' '}
                    <GenericLink href="/docs/v2">
                      the version 2 documentation
                    </GenericLink>
                    . If you have yet to upgrade, see the{' '}
                    <GenericLink href="/docs/v2/platform/upgrade-to-2-0">
                      upgrade guide
                    </GenericLink>
                    .
                  </Note>
                )}
                <H1 itemProp="headline">{meta.title}</H1>
              </div>
              {this.props.children}
            </Content>
          </Main>

          <style jsx>{`
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }

            .category-wrapper {
              padding: 40px 0;
            }

            .category-wrapper:not(:last-child) {
              border-bottom: 1px solid #eaeaea;
            }

            .platform-select-title {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 16px;
              margin-top: 0;
            }

            .navigation {
              margin-top: 48px;
            }

            .toggle-group-wrapper {
              display: none;
            }

            @media screen and (max-width: 950px) {
              .toggle-group-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 40px;
              }
            }

            .heading {
              margin-top: 40px;
            }
          `}</style>
        </Layout>
      </MDXProvider>
    )
  }
}

export default withRouter(withDoc)
