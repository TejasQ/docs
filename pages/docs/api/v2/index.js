import { Component } from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { withRouter } from 'next/router'
import Link from 'next/link'
import debounce from 'lodash.debounce'
import { HEADER_HEIGHT } from '~/lib/constants'

import * as bodyLocker from '~/lib/utils/body-locker'
import Layout from '~/components/layout/layout'
import changeHash from '~/lib/utils/change-hash'
import components from '~/lib/mdx-components'
import Content from '~/components/layout/content'
import Context from '~/lib/api/slugs-context'
import DocsBuilder from '~/lib/api/builder'
import DocsIndex from '~/components/layout/index'
import getFragment from '~/lib/api/get-fragment'
import getHref from '~/lib/api/get-href'
import Head from '~/components/layout/head'
import scrollToElement from '~/lib/utils/scroll-to-element'
import Select from '~/components/select'
import Sidebar from '~/components/layout/sidebar'
import ToggleGroup, { ToggleItem } from '~/components/toggle-group'
import withPermalink from '~/lib/api/with-permalink'

import ApiDocs from './api-docs-mdx/index.mdx'

const debouncedChangeHash = debounce(changeHash, 200)

class APIPage extends Component {
  state = {
    activeCategory: 'getting-started',
    activeSection: 'introduction',
    activeEntry: null,
    navigationActive: false,
    version: this.props.router.asPath.split(/(v[0-9])/)[1] || 'v2'
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeCategory !== prevState.activeCategory ||
      this.state.activeSection !== prevState.activeSection ||
      this.state.activeEntry !== prevState.activeEntry
    ) {
      debouncedChangeHash(
        getFragment({
          category: this.state.activeCategory,
          section: this.state.activeSection,
          entry: this.state.activeEntry
        })
      )
    }
  }

  updateActive = ({ category = null, section = null, entry = null }) => {
    if (
      this.state.activeCategory !== category ||
      this.state.activeSection !== section ||
      this.state.activeEntry !== entry
    ) {
      this.setState({
        activeCategory: category,
        activeSection: section,
        activeEntry: entry
      })
    }
  }

  setInitiallyActive = ({
    href,
    category = null,
    section = null,
    entry = null
  }) => {
    if (this.props.router.asPath.endsWith(href)) {
      this.updateActive({ category, section, entry })
    }
  }

  handleSidebarRef = node => {
    this.sidebarNode = node
  }

  handleEntryActive = entryNode => {
    scrollToElement(this.sidebarNode, entryNode)
  }

  handleSectionActive = sectionNode => {
    if (!this.state.activeEntry) {
      scrollToElement(this.sidebarNode, sectionNode)
    }
  }

  handleVersionChange = event => {
    const href = `/docs/api/${event.target.value}`
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
    const { router } = this.props
    const { navigationActive, version } = this.state
    const active = {
      category: this.state.activeCategory,
      section: this.state.activeSection,
      entry: this.state.activeEntry
    }

    return (
      <MDXProvider
        components={{
          ...components,
          h1: withPermalink(components.h1),
          h2: withPermalink(components.h2),
          h3: withPermalink(components.h3)
        }}
      >
        <Layout>
          <Head
            description="A comprehensive guide to using the Now API and gaining control over the Now platform"
            title={`Now API Documentation`}
            titlePrefix=""
            titleSuffix=" - ZEIT"
          />

          <DocsBuilder docs={<ApiDocs />}>
            {({ structure }) => (
              <>
                <Sidebar
                  active={navigationActive}
                  innerRef={this.handleSidebarRef}
                >
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
                      <ToggleItem
                        active={router.pathname.startsWith('/docs/api')}
                      >
                        <Link prefetch href="/docs/api">
                          <a onClick={this.handleIndexClick}>API Reference</a>
                        </Link>
                      </ToggleItem>
                      <ToggleItem
                        active={router.pathname.startsWith('/examples')}
                      >
                        <Link prefetch href="/examples">
                          <a onClick={this.handleIndexClick}>Examples</a>
                        </Link>
                      </ToggleItem>
                    </ToggleGroup>
                  </div>
                  <div className="select-wrapper">
                    <h5 className="platform-select-title">
                      Now Platform Version
                    </h5>
                    <Select
                      width="100%"
                      defaultValue={version}
                      onChange={this.handleVersionChange}
                    >
                      <option value="v1">v1</option>
                      <option value="v2">v2 (Latest)</option>
                    </Select>
                  </div>
                  <DocsIndex
                    activeItem={active}
                    getHref={getHref}
                    onEntryActive={this.handleEntryActive}
                    onSectionActive={this.handleSectionActive}
                    onClickLink={this.handleIndexClick}
                    structure={structure}
                    updateActive={this.updateActive}
                    setInitiallyActive={this.setInitiallyActive}
                  />
                </Sidebar>
                <Content>
                  {structure.map(category => {
                    const categorySlugs = { category: category.slug }
                    return (
                      <div
                        className="category-wrapper"
                        key={getFragment(categorySlugs)}
                      >
                        <span id={getFragment(categorySlugs)} />
                        <Context.Provider
                          value={{
                            slugs: categorySlugs,
                            updateActive: this.updateActive
                          }}
                        >
                          {category.content}
                        </Context.Provider>

                        {category.sections.map(section => {
                          const sectionSlugs = {
                            category: category.slug,
                            section: section.slug
                          }

                          return (
                            <div
                              className="section-wrapper"
                              key={getFragment(sectionSlugs)}
                            >
                              <span id={getFragment(sectionSlugs)} />
                              <Context.Provider
                                value={{
                                  slugs: sectionSlugs,
                                  updateActive: this.updateActive
                                }}
                              >
                                {section.content}
                              </Context.Provider>
                              <div>
                                {section.entries.map(entry => {
                                  const entrySlugs = {
                                    category: category.slug,
                                    section: section.slug,
                                    entry: entry.slug
                                  }

                                  return (
                                    <div
                                      className="entry-wrapper"
                                      key={getFragment(entrySlugs)}
                                    >
                                      <span id={getFragment(entrySlugs)} />
                                      <Context.Provider
                                        value={{
                                          slugs: entrySlugs,
                                          updateActive: this.updateActive
                                        }}
                                      >
                                        {entry.content}
                                      </Context.Provider>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </Content>
              </>
            )}
          </DocsBuilder>

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

            .category-wrapper,
            .section-wrapper,
            .entry-wrapper {
              position: relative;
            }

            span {
              position: absolute;
              top: -${HEADER_HEIGHT + 24}px;
            }

            .platform-select-title {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 16px;
              margin-top: 0;
            }

            .select-wrapper :global(.select) {
              width: 100%;
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
          `}</style>
        </Layout>
      </MDXProvider>
    )
  }
}

export default withRouter(APIPage)
