import {
  HeaderBlock,
  ImageBlock,
  ListBlock,
  OutputData,
  ParagraphBlock,
} from '$shared/interfaces/editorjs.interface';

export const buildMarkup = (jsonData: OutputData) => {
  const { blocks } = jsonData;
  return blocks.reduce((template, currBlock) => {
    let temp = '';
    switch (currBlock.type) {
      case 'paragraph':
        temp += buildParagraph(currBlock as ParagraphBlock);
        break;
      case 'image':
        temp += buildImage(currBlock as ImageBlock);
        break;
      case 'list':
        temp += buildList(currBlock as ListBlock);
        break;
      case 'header':
        temp += buildHeader(currBlock as HeaderBlock);
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
  } overflow-hidden'>
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
