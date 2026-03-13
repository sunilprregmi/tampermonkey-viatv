// ==UserScript==
// @name         ViaTV Reseller WebLogin
// @namespace    https://github.com/sunilprregmi/tampermonkey-viatv/
// @version      0.1
// @description  Redirects reseller_list API calls on ViaTV login page
// @author       Sunil Prasad Regmi
// @match        https://www.viatv.com.np/login*
// @match        https://viatv.com.np/login*
// @icon         https://www.viatv.com.np/img/logo-viatv.20d70e11.svg
// @downloadURL  https://github.com/sunilprregmi/tampermonkey-viatv/raw/main/via_tam.user.js
// @updateURL    https://github.com/sunilprregmi/tampermonkey-viatv/raw/main/via_tam.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    const OLD = "https://ott1.viatv.com.np/api/customer/reseller_list";
    const NEW = "https://github.com/sunilprregmi/tampermonkey-viatv/raw/main/reseller_list.json";

    const _f = window.fetch;
    window.fetch = (...a) => {
        if (a[0] === OLD) a[0] = NEW;
        return _f(...a);
    };

    const _o = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(m, u) {
        if (u === OLD) u = NEW;
        return _o.apply(this, [m, u, ...Array.from(arguments).slice(2)]);
    };
})();