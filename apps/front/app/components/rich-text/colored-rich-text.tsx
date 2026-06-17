import type { CSSProperties } from 'react'
import { defaultColors } from '@payloadcms/richtext-lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'


const colorMap: Record<string, { css?: Record<string, string> }> = {
  ...defaultColors.text,
  ...defaultColors.background,
}

const toReactStyle = (css: Record<string, string>): CSSProperties => {
  const style: Record<string, string> = {}
  for (const [key, value] of Object.entries(css)) {
    style[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value
  }
  return style as CSSProperties
}


export const ColoredRichText = ({
  data,
  className,
}: {
  data: any
  className?: string
}) => {
  return (
    <RichText
      data={data}
      className={className}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        text: (args: any) => {
          const rendered = (defaultConverters.text as any)(args)
          const state = args.node?.$
          if (!state) return rendered

          const styles: CSSProperties = {}
          for (const value of Object.values(state)) {
            const css =
              typeof value === 'string' ? colorMap[value]?.css : undefined
            if (css) Object.assign(styles, toReactStyle(css))
          }

          if (Object.keys(styles).length === 0) return rendered
          return <span style={styles}>{rendered}</span>
        },
      })}
    />
  )
}
