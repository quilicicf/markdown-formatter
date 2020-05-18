import { PartialRemarkStringifyOptions } from 'remark-stringify/types/index';

export function formatFromString(sourceMarkdownString: string, stringifyOptions?: PartialRemarkStringifyOptions): string;

export function formatFromFile(sourceMarkdownFilePath: string, stringifyOptions?: PartialRemarkStringifyOptions): string;
