import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { styletron, isServer } from 'styletron';
import isEmpty from 'lodash/isEmpty';

const favicon = require('assets/images/favicon.png');
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
            content="Beat Wall Street from anywhere"
          />
          <link rel="icon" href={favicon} type="image/png" sizes="16x16" />

          <script src="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.js"></script>
          <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css" />
          <script src="https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js"></script>
          <script src="https://www.gstatic.com/firebasejs/7.13.1/firebase-analytics.js"></script>

          {!isEmpty(stylesheets) && stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
