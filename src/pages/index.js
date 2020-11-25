import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../utils/scss/common.scss"
import Image from "gatsby-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} >
      <SEO title="All posts" />
      <Bio className={"bio"} />
      <div className={"post-content"}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const thumbnail_image= node.frontmatter.thumbnail ? node.frontmatter.thumbnail.childImageSharp.fluid : data.def_image.childImageSharp.fixed ;
        return (
          <article key={node.fields.slug} className={"post-article"}>
            <header className="posts">
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    <div className="posts__image_container" >
                        <Image
                            className="posts_image"
                            fluid={thumbnail_image}
                            style={{position: "relative",
                            height:"200px"}}
                        />
                    </div>
                <div className="post-info">
                    <h3
                        style={{
                            marginBottom: rhythm(1 / 4),
                        }}
                    >
                            {title}
                    </h3>
                    <small>{node.frontmatter.date}</small>
                </div>
                </Link>
            </header>

          </article>
        )
      })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    def_image: file(absolutePath: { regex: "/defalt.png/" }) {
        childImageSharp {
          fixed(width: 400, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1280) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
