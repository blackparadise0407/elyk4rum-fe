// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    tenant: 'dev-2qy1yb53',
    audience: 'http://localhost:8080/api',
    domain: 'dev-2qy1yb53.us.auth0.com',
    clientId: 'NxAuHySqCpe309f8PF3seQv1kE39tEKL',
  },
  apiUrl: 'http://localhost:8080',
  supabase: {
    url: 'https://uilucokcacwkdwwozvuf.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbHVjb2tjYWN3a2R3d296dnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAxMDQ3NzgsImV4cCI6MTk3NTY4MDc3OH0.-k783Cty6PIwROH70KQDH79kZWOlpWS5gIfQwjC23EE',
    bucket: 'elyk4rum.dev',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
