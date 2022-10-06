import { SupabaseService } from '$shared/services/supabase.service';

declare const Header: any;
declare const Link: any;
declare const LoginState: any;
declare const Embed: any;
declare const Quote: any;
declare const List: any;
declare const ImageTool: any;

export const editorConfig = (supabaseService: SupabaseService): any => ({
  holder: 'editorjs',
  placeholder: 'Bắt đầu viết một thứ gì đó',
  tools: {
    header: {
      class: Header,
      inlineToolbar: ['link', 'bold', 'italic'],
    },
    list: {
      class: List,
      inlineToolbar: ['link', 'bold'],
    },
    embed: {
      class: Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: "Quote's author",
      },
    },
    image: {
      class: ImageTool,
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
