import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../styletron';

import favicon from 'assets/images/icon/favicon-16x16.png';
import appleTouchIcon57 from "assets/images/icon/apple-icon-57x57.png";
import appleTouchIcon60 from "assets/images/icon/apple-icon-60x60.png";
import appleTouchIcon72 from "assets/images/icon/apple-icon-72x72.png";
import appleTouchIcon76 from "assets/images/icon/apple-icon-76x76.png";
import appleTouchIcon114 from "assets/images/icon/apple-icon-114x114.png";
import appleTouchIcon120 from "assets/images/icon/apple-icon-120x120.png";
import appleTouchIcon144 from "assets/images/icon/apple-icon-144x144.png";
import appleTouchIcon152 from "assets/images/icon/apple-icon-152x152.png";
import appleTouchIcon180 from "assets/images/icon/apple-icon-180x180.png";
import icon192 from "assets/images/icon/android-icon-192x192.png";
import icon32 from "assets/images/icon/favicon-32x32.png";
import icon96 from "assets/images/icon/favicon-96x96.png";
import icon16 from "assets/images/icon/favicon-16x16.png";
import manifestFile from "assets/images/icon/manifest.json";
import msapplicationTileImage from "assets/images/icon/ms-icon-144x144.png";

export default class CustomDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage((App) => (props) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron && (styletron as any).getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="theme-color" content="#000000" />
          <meta
            name="Description"
            content="Beat Wall Street from anywhere"
          />

          {/* Icon */}
          <link rel="icon" href={favicon} type="image/png" sizes="16x16" />
          <link rel="apple-touch-icon" sizes="57x57" href={appleTouchIcon57} />
          <link rel="apple-touch-icon" sizes="60x60" href={appleTouchIcon60} />
          <link rel="apple-touch-icon" sizes="72x72" href={appleTouchIcon72} />
          <link rel="apple-touch-icon" sizes="76x76" href={appleTouchIcon76} />
          <link rel="apple-touch-icon" sizes="114x114" href={appleTouchIcon114} />
          <link rel="apple-touch-icon" sizes="120x120" href={appleTouchIcon120} />
          <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon144} />
          <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIcon152} />
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon180} />
          <link rel="icon" type="image/png" sizes="192x192" href={icon192} />
          <link rel="icon" type="image/png" sizes="32x32" href={icon32} />
          <link rel="icon" type="image/png" sizes="96x96" href={icon96} />
          <link rel="icon" type="image/png" sizes="16x16" href={icon16} />
          {/* 
              // @ts-ignore */}
          <link rel="manifest" href={manifestFile} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content={msapplicationTileImage} />
          <meta name="theme-color" content="#ffffff" />

          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}

          {/* PayPal script */}
          <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_ENV_VARIABLE}`} />
        </Head>
        <body dir="ltr">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
