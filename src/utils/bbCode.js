export const REGEX_LOOKUP_BOLD = /(?<=\[b\])(.*)(?=\[\/b\])/gm;
export const REGEX_LOOKUP_ITALIC = /(?<=\[i\])(.*)(?=\[\/i\])/gm;
export const REGEX_LOOKUP_UNDERLINE = /(?<=\[u\])(.*)(?=\[\/u\])/gm;

export const convertBbCodeToJsx = (string) => (
  <div
    dangerouslySetInnerHTML={{
      __html: string
        .replaceAll("[b]", "<b>")
        .replaceAll("[/b]", "</b>")
        .replaceAll("[i]", "<i>")
        .replaceAll("[/i]", "</i>")
        .replaceAll("[u]", "<u>")
        .replaceAll("[/u]", "</u>"),
    }}
  />
);

export const wrapInBold = (string) => `[b]${string}[/b]`;
export const wrapInItalic = (string) => `[i]${string}[/i]`;
export const wrapInUnderline = (string) => `[u]${string}[/u]`;
