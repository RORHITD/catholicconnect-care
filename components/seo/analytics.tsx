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

// First-party collector (CC - CN). catholicconnect.care's DNS is on SiteGround,
// not our Cloudflare account, so it cannot have its own e.<domain> endpoint —
// it posts cross-origin to the catholicconnect.io collector instead. Data still
// lands; only the cookie is not first-party for this host.
export const COLLECTOR_URL = "https://e.catholicconnect.io";

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
      <Script id="cc-cn-collector" strategy="afterInteractive">
        {`(function(){function u(){return (crypto.randomUUID&&crypto.randomUUID())||(Date.now()+'-'+Math.random().toString(16).slice(2));}
function c(n){return (document.cookie.match('(^|;)\\s*'+n+'\\s*=\\s*([^;]+)')||[])[2];}
window.hcn=function(e,p,o){o=o||{};var id=o.event_id||u();
if(window.fbq&&o.meta_event){window.fbq('track',o.meta_event,p||{},{eventID:id});}
return fetch('${COLLECTOR_URL}',{method:'POST',credentials:'include',keepalive:true,
headers:{'content-type':'application/json'},
body:JSON.stringify({event:e,event_id:id,meta_event:o.meta_event,url:location.href,
referrer:document.referrer,fbp:c('_fbp'),fbc:c('_fbc'),email:o.email,user_id:o.user_id,params:p||{}})}).catch(function(){});};
window.hcn('page_view');})();`}
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
