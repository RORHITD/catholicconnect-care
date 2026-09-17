import Script from "next/script";

/**
 * Measurement parity with the WordPress site, which fired GTM-K3QKPB5 plus a
 * gtag config for G-CGZSZBGYRN (GA4, property 266375387) and AW-618373056
 * (Google Ads conversions). It also carried UA-170089612-1 — Universal
 * Analytics has been dead since 2023, so that one is deliberately not here.
 *
 * Every number in the migration dossier came from these IDs; a cutover
 * without them would silently zero GA4 and every Ads conversion.
 */
export const GTM_ID = "GTM-K3QKPB5";
export const GA4_ID = "G-CGZSZBGYRN";
export const ADS_ID = "AW-618373056";

export default function Analytics() {
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');gtag('config','${ADS_ID}');`}
      </Script>
    </>
  );
}

export function AnalyticsNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
