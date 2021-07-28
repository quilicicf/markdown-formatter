import { VFile } from 'vfile';
import { RemarkStringifyOptions } from 'remark-stringify';

export interface MarkdownFormatterOptions {
  watermark?: // Add a watermark with a link to this repository's home page
    'none' // No watermark
    | 'top' // Watermark inserted at the top of the document
    | 'toc' // Watermark added to the ToC's end tag
}

export type formatFromString = (
  sourceMarkdownString: string,
  markdownFormatterOptions?: MarkdownFormatterOptions,
  stringifyOptions?: RemarkStringifyOptions,
) => VFile

export type formatFromFile = (
  sourceMarkdownFilePath: string,
  markdownFormatterOptions?: MarkdownFormatterOptions,
  stringifyOptions?: RemarkStringifyOptions,
) => VFile
