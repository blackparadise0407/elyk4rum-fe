import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { extractFileName } from '$shared/utils/file.util';

declare const supabase: any;

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: any;

  constructor() {
    this.supabase = supabase.createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  public async upload(file: File) {
    const [name, ext] = extractFileName(file.name);
    const fName = [...name.split(' '), Date.now().toString()].join('-');

    const dest = `public/${fName}.${ext}`;
    const { error } = await this.supabase.storage
      .from(environment.supabase.bucket)
      .upload(dest, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return null;
    }
    return await this.getPublicUrl(dest);
  }

  public async getPublicUrl(path: string): Promise<string | null> {
    const { publicURL, error } = await this.supabase.storage
      .from(environment.supabase.bucket)
      .getPublicUrl(path);

    if (error) {
      return null;
    }
    return publicURL;
  }
}
