/** Used to map HTML entities to characters. */
const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)


export function unescape(string: string) {
  return (string && reHasEscapedHtml.test(string))
  // @ts-ignore
    ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'") )
    : (string || '')
}
