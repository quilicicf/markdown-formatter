import { PartialRemarkStringifyOptions } from 'remark-stringify';

interface MarkdownFormatterOptions {
  watermark: // Add a watermark with a link to this repository's home page
    'none' // No watermark
    | 'top' // Watermark inserted at the top of the document
    | 'toc' // Watermark added to the ToC's end tag
}

type PartialMarkdownFormatterOptions = Partial<MarkdownFormatterOptions>

export function formatFromString(
  sourceMarkdownString: string,
  markdownFormatterOptions?: PartialMarkdownFormatterOptions,
  stringifyOptions?: PartialRemarkStringifyOptions,
): string;
export function formatFromFile(
  sourceMarkdownFilePath: string,
  markdownFormatterOptions?: PartialMarkdownFormatterOptions,
  stringifyOptions?: PartialRemarkStringifyOptions,
): string;
