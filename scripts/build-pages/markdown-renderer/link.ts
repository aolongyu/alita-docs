import { resolve } from 'url';

const hasTrailingSlash = /\/$/;
const isExternal = /^http.*/;
const isV3 = /^\/v3\//;

export default function(href: string, title: string, text: string) {
  const { baseUrl } = this.options;

  if (baseUrl) {
    href = resolve(hasTrailingSlash.test(baseUrl) ? baseUrl : `${baseUrl}/`, href);
  }

  if (!isExternal.test(href) && !isV3.test(href)) {
    return `<stencil-route-link url=${href} ${title ? `anchorTitle=${title}` : ''}>${text}</stencil-route-link>`;
  }

  return `<a href=${href} ${title ? `title=${title}` : ''}>${text}</a>`;
}
