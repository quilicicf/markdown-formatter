import { PartialRemarkStringifyOptions } from 'remark-stringify';

interface MarkdownFormatterOptions {
  watermark: 'none' | 'top' | 'toc'
}

type PartialMarkdownFormatterOptions = Partial<MarkdownFormatterOptions>

export function formatFromString(
  sourceMarkdownString: string,
  markdownFormatterOptions: PartialMarkdownFormatterOptions,
  stringifyOptions?: PartialRemarkStringifyOptions,
): string;
export function formatFromFile(
  sourceMarkdownFilePath: string,
  markdownFormatterOptions: PartialMarkdownFormatterOptions,
  stringifyOptions?: PartialRemarkStringifyOptions,
): string;
