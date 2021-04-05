import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import { Grid, Cell } from 'baseui/layout-grid';
// import CustomLink from '../../components/CustomLink'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
import { Block } from 'baseui/block';
import Container from 'components/UiElements/Container/Container';
import PageTitle from 'components/UiElements/PageTitle/PageTitle';
import { ParagraphMedium, ParagraphLarge, H3, H6, LabelLarge } from 'baseui/typography'
import BlogSlider from 'containers/IG/BlogSlider';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  p: ParagraphLarge,
  strong: LabelLarge,
  // li: H6,
  // a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  Title: H3,
  Head,
}

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components })
  return (
    <>
      <Head>
        <title>{frontMatter.title} | Stoqey Blog</title>
        <meta name="description" content={frontMatter.description} />
        <meta name="og:description" content={frontMatter.description} />
        <meta property="image" content={frontMatter.image} />
        <meta property="og:image" content={frontMatter.image} />
        <meta property="twitter:image" content={frontMatter.image} />
      </Head>

      <PageTitle title={frontMatter.title} />

      <Container>
        <Block paddingBottom="20px">
          {frontMatter.ipo ? (
            // @ts-ignore
            <BlogSlider />
          ) :
            (<img
              src={frontMatter.image}
              width="100%"
              alt="Banner"
            />
            )
          }

        </Block>
        <Block paddingTop={['0', '0', '0', '40px']}>
          <Grid gridColumns={12} gridGutters={0} gridMargins={0}>
            <Cell span={[12, 12, 12]}>
              <main>{content}</main>
            </Cell>
          </Grid>
        </Block>
      </Container>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
