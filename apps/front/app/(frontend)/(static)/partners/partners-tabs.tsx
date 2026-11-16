import Link from 'next/link'

export const PARTNER_SCOPES = ['regional', 'national'] as const
export type PartnerScope = (typeof PARTNER_SCOPES)[number]

export const isPartnerScope = (v: unknown): v is PartnerScope =>
  typeof v === 'string' && (PARTNER_SCOPES as readonly string[]).includes(v)

const LABELS: Record<PartnerScope, string> = {
  regional: 'Régionaux',
  national: 'Nationaux',
}

export default function PartnersTabs({ current }: { current: PartnerScope }) {
  return (
    <nav aria-label="Type de partenaires" className="flex justify-center">
      <div className="flex w-full max-w-md rounded-full bg-[#244B3A]/10 px-1 py-0">
        {PARTNER_SCOPES.map((scope) => {
          const active = scope === current
          return (
            <Link
              key={scope}
              href={{ pathname: '/partners', query: { type: scope } }}
              scroll={false}
              aria-current={active ? 'page' : undefined}
              className={`flex-1 rounded-full px-6 py-2 text-center text-sm font-semibold transition-colors ${
                active
                  ? 'bg-[#244B3A] text-white shadow'
                  : 'text-[#244B3A] hover:bg-[#244B3A]/10'
              }`}
            >
              {LABELS[scope]}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}