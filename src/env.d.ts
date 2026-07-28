/// <reference path="../worker-configuration.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    tenant: import('./lib/tenant').Tenant;
    locale: 'es' | 'en';
  }
}
