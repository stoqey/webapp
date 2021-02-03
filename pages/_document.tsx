import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { styletron, isServer } from 'styletron';
import favicon from 'assets/images/favicon.png';
export default class CustomDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage((App) => (props) => (
        <App {...props} />
    ))

    const stylesheets = !isServer ? styletron && (styletron as any).getStylesheets() : [];
    return { ...page, stylesheets };
  }

  render() {
    const { stylesheets = [] } = this.props;

    return (
      <Html lang="en-US">
        <Head>
          <meta name="theme-color" content="#000000" />
          <meta
            name="Description"
            content="Inst is a GraphQL based server side dashboard template"
          />
          <link rel="icon" href={favicon} type="image/png" sizes="16x16" />
          {stylesheets.length && stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body dir="ltr">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
