type BlockToolData<T extends object = any> = T;

type BlockTuneData = any;

export enum EBlockType {
  paragraph = 'paragraph',
  image = 'image',
  header = 'header',
  list = 'list',
  quote = 'quote',
}

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
  EBlockType.paragraph,
  {
    text: string;
  }
>;

export type ImageBlock = OutputBlockData<
  EBlockType.image,
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
  EBlockType.header,
  {
    level: number;
    text: string;
  }
>;

export type ListBlock = OutputBlockData<
  EBlockType.list,
  {
    items: string[];
    style: 'ordered' | 'unordered';
  }
>;

export type QuoteBlock = OutputBlockData<
  EBlockType.quote,
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
