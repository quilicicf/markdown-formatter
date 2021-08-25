import { VFile } from 'vfile';
import { Options as RemarkStringifyOptions } from 'remark-stringify';

type WatermarkType = 'none' // No watermark
  | 'top' // Watermark inserted at the top of the document
  | 'toc'; // Watermark added to the ToC's end tag

interface MarkdownFormatterOptions {
  watermark?: WatermarkType; // Add a watermark with a link to this repository's home page
}

export {
  WatermarkType,
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
