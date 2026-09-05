import type { CollectionConfig } from 'payload'

const isProduction = process.env.NODE_ENV == 'production'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      // The admin UI and API are hosted on sibling subdomains. A host-only
      // cookie set by mtym.mathmaroc.org would not be sent to api.mathmaroc.org.
      domain: isProduction
        ? process.env.PAYLOAD_COOKIE_DOMAIN || '.mathmaroc.org'
        : undefined,
      sameSite: 'Lax',
      secure: isProduction,
    },
  },
  fields: [
    {
      name: 'jury',
      label: 'Jury',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        className: 'jury-checkbox',
        description: 'Show only Applications, Teams, and Users in the admin panel.',
      },
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
}