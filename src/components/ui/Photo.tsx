import { photoInfo, photoSize, type PhotoKey } from '../../data/photos'
import { asset } from '../../lib/asset'

interface Props {
  name: PhotoKey
  sizes: string
  className?: string
  imgClassName?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
  /** Hide the label ("Kuvituskuva" for stock / credit for the company's own photos). */
  plain?: boolean
  wipe?: boolean
  /** Image fills the figure absolutely – for figures sized by their grid/flex parent. */
  fill?: boolean
}

/**
 * Responsive <picture> (WebP + JPEG) with intrinsic size to prevent layout shift.
 * Stock photos always carry a visible "Kuvituskuva" label; the company's own photos a credit.
 */
export function Photo({ name, sizes, className = '', imgClassName = '', priority = false, plain = false, wipe = false, fill = false }: Props) {
  const { widths, width, height } = photoSize(name)
  const info = photoInfo[name]
  const set = (ext: string) => widths.map((w) => `${asset(`images/${name}-${w}.${ext}`)} ${w}w`).join(', ')
  return (
    <figure className={`overflow-hidden bg-concrete ${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`} data-wipe={wipe || undefined}>
      <picture>
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img
          src={asset(`images/${name}-${widths[Math.min(1, widths.length - 1)]}.jpg`)}
          srcSet={set('jpg')}
          sizes={sizes}
          width={width}
          height={height}
          alt={info.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`${fill ? 'absolute inset-0' : ''} h-full w-full object-cover ${imgClassName}`}
          style={info.focus ? { objectPosition: info.focus } : undefined}
        />
      </picture>
      {!plain &&
        (info.authentic ? (
          <figcaption className="photo-credit">{info.credit}</figcaption>
        ) : (
          <figcaption className="photo-badge" aria-hidden="true">
            Kuvituskuva
          </figcaption>
        ))}
    </figure>
  )
}
