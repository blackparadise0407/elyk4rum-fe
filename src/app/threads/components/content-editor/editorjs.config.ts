import { EditorConfig } from '@editorjs/editorjs';

import { SupabaseService } from '$shared/services/supabase.service';

export const editorConfig = (
  supabaseService: SupabaseService
): EditorConfig => ({
  holder: 'editorjs',
  tools: {
    Marker: {
      class: require('@editorjs/Marker'),
    },
    header: {
      class: require('@editorjs/header'),
      inlineToolbar: ['link', 'bold', 'italic'],
    },
    list: {
      class: require('@editorjs/list'),
      inlineToolbar: ['link', 'bold'],
    },
    embed: {
      class: require('@editorjs/embed'),
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
    quote: {
      class: require('@editorjs/quote'),
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: "Quote's author",
      },
    },
    image: {
      class: require('@editorjs/image'),
      config: {
        uploader: {
          uploadByFile(file: File) {
            return supabaseService
              .upload(file)
              .then((publicUrl) => {
                if (!publicUrl) {
                  return {
                    success: 0,
                  };
                }
                return {
                  success: 1,
                  file: {
                    url: publicUrl,
                  },
                };
              })
              .catch(() => ({
                success: 0,
              }));
          },
        },
      },
    },
  },
});
