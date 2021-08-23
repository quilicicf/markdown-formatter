import { VFile } from 'vfile';
import { Options as RemarkStringifyOptions } from 'remark-stringify';

interface MarkdownFormatterOptions {
  watermark?: // Add a watermark with a link to this repository's home page
    'none' // No watermark
    | 'top' // Watermark inserted at the top of the document
    | 'toc'; // Watermark added to the ToC's end tag
}

export {
  MarkdownFormatterOptions,
  RemarkStringifyOptions,
};

export function formatFromString (
  sourceMarkdownString: string,
  markdownFormatterOptions?: MarkdownFormatterOptions,
  stringifyOptions?: RemarkStringifyOptions,
): Promise<VFile>;

export function formatFromFile (
  sourceMarkdownFilePath: string,
  markdownFormatterOptions?: MarkdownFormatterOptions,
  stringifyOptions?: RemarkStringifyOptions,
): Promise<VFile>;
