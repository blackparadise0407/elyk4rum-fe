import {
  ImageBlock,
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
  return `<p class="text-sm md:text-lg leading-normal tracking-wide"   style="word-spacing: 0.1rem">${text}</p>`;
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
