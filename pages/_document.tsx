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
          {/* SEO */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="NOODP" />
          <meta charSet="UTF-8" />
          <meta name="application-name" content="Stoqey" />
          <meta name="theme-color" content="#ffffff" />

          <meta
            name="keywords"
            content="
            gme stock, amc stock, stock, btc to usd, silver price, dogecoin,
            silver, cryptocurrency, stocks to buy now, btc, amc, stock screener,
            sndl, gold, aphria stock, stock market, ethereum price, sndl stock,
            scr stock, scr stock, zom stock, gme stock price, penny stocks,  investing services, invest service, trading services, trade service, trading account services, trade account, invest account, business account, stocks, stocks investing, crypto, crypto investing, bitcoin, ico, contracts, ethereum, dogecoin, stoqey, STQ"
          />
          <meta
            name="description"
            content="Investing sucks, let bots do it for you? then share profits"
          />

          <link rel="canonical" href="https://app.stoqey.com" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@stoqey_" />
          <meta property="og:url" content="https://app.stoqey.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Stupid simple investing | Online Investment Services | Stoqey"
          />
          <meta property="og:image" content={appleTouchIcon180} />
          <meta
            property="og:description"
            content="Investing sucks, let bots do it for you? then share profits"
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
          {/* <link rel="manifest" href={manifestFile} /> */}
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content={msapplicationTileImage} />



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
          <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_ID}`} />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
            }}
          ></script>
          
        </Head>
        <body dir="ltr">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
