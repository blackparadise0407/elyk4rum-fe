import {
  EBlockType,
  HeaderBlock,
  ImageBlock,
  ListBlock,
  OutputBlockData,
  ParagraphBlock,
  QuoteBlock,
} from '$shared/interfaces/editorjs.interface';

export const buildMarkup = (blocks: OutputBlockData[]) => {
  return blocks.reduce((template, currBlock) => {
    let temp = '';
    switch (currBlock.type) {
      case EBlockType.paragraph:
        temp += buildParagraph(currBlock as ParagraphBlock);
        break;
      case EBlockType.image:
        temp += buildImage(currBlock as ImageBlock);
        break;
      case EBlockType.list:
        temp += buildList(currBlock as ListBlock);
        break;
      case EBlockType.header:
        temp += buildHeader(currBlock as HeaderBlock);
        break;
      case EBlockType.quote:
        temp += builderQuote(currBlock as QuoteBlock);
        break;
      default:
        break;
    }
    return (template += temp + '<br />');
  }, '');
};

const buildParagraph = (block: ParagraphBlock) => {
  const {
    data: { text },
  } = block;
  return `<p>${text}</p>`;
};

const buildImage = (block: ImageBlock) => {
  const {
    data: {
      withBorder,
      withBackground,
      caption,
      file: { url },
    },
  } = block;

  return `<div class='rounded ${withBackground ? 'p-2 bg-gray-100' : ''} ${
    withBorder ? 'border border-gray-200' : ''
  }overflow-hidden'>
            <img class='mx-auto' src='${url}' loading='lazy' />
            ${
              caption
                ? `<p class='mt-1 text-sm text-center text-gray-600'>${caption}</p>`
                : ''
            }
          </div>`;
};

const buildList = (block: ListBlock) => {
  const {
    data: { items, style },
  } = block;

  const tagName = style === 'ordered' ? 'ol' : 'ul';

  const listClass = ((style: typeof block.data.style) => {
    if (style === 'ordered') {
      return 'list-decimal';
    }
    return 'list-disc';
  })(style);

  return `<${tagName} class='${listClass} pl-8'>
  ${items.map((item) => `<li>${item}</li>`).join('')}
  </${tagName}>`;
};

const buildHeader = (block: HeaderBlock) => {
  const {
    data: { level, text },
  } = block;

  const tagName = 'h' + level;

  return `<${tagName} class='font-semibold'>${text}</${tagName}>`;
};

const builderQuote = (block: QuoteBlock) => {
  const {
    data: { caption, text },
  } = block;

  return `<figure class="relative p-3 bg-blue-50 rounded">
    <blockquote class="ml-10">${text}</blockquote>
    <i class="absolute top-2 left-2 fa-solid fa-quote-left text-3xl text-blue-500"></i>
    <figcaption class="text-right mt-1 italic">— ${caption}</figcaption>
  </figure>`;
};
