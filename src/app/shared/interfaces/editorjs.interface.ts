type BlockToolData<T extends object = any> = T;

type BlockTuneData = any;

export interface OutputBlockData<
  Type extends string = string,
  Data extends object = any
> {
  id?: string;

  type: Type;

  data: BlockToolData<Data>;

  tunes?: { [name: string]: BlockTuneData };
}

export type ParagraphBlock = OutputBlockData<
  'paragraph',
  {
    text: string;
  }
>;

export type ImageBlock = OutputBlockData<
  'image',
  {
    caption: string;
    file: {
      url: string;
    };
    stretched: boolean;
    withBackground: boolean;
    withBorder: boolean;
  }
>;

export type HeaderBlock = OutputBlockData<
  'header',
  {
    level: number;
    text: string;
  }
>;

export type ListBlock = OutputBlockData<
  'list',
  {
    items: string[];
    style: 'ordered' | 'unordered';
  }
>;

export type QuoteBlock = OutputBlockData<
  'quote',
  {
    caption: string;
    text: string;
    alignment: 'left' | 'center';
  }
>;

export interface OutputData {
  version?: string;

  time?: number;

  blocks: OutputBlockData[];
}
