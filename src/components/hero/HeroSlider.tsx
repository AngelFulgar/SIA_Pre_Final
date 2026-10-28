import { useState } from 'react'
import { Button } from '../ui'

const slides = [
  {
    eyebrow: 'THE EVERYDAY EDIT · NO. 04',
    headline: <>Make room for<br /><em>good things.</em></>,
    description: 'Thoughtful objects, made to be used and loved every day.',
    caption: 'A little more considered.',
    left: '☕',
    right: '🎧',
  },
  {
    eyebrow: 'MADE TO LAST · NO. 08',
    headline: <>Keep the things<br /><em>that matter.</em></>,
    description: 'Useful, lasting pieces for the spaces you call home.',
    caption: 'Everyday, made better.',
    left: '💡',
    right: '📓',
  },
  {
    eyebrow: 'A SLOWER MOMENT · NO. 12',
    headline: <>Find your own<br /><em>kind of calm.</em></>,
    description: 'Small rituals and simple objects that make a day.',
    caption: 'The good in the ordinary.',
    left: '🧴',
    right: '🎒',
  },
]

export function HeroSlider({ onExplore }: { onExplore: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  return (
    <section className="hero">
      <div className="hero__copy">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1>{slide.headline}</h1>
        <p className="hero__description">{slide.description}</p>
        <Button onClick={onExplore}>Explore the collection <span aria-hidden="true">↗</span></Button>
        <div className="hero__pagination" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
          {slides.map((item, index) => (
            <button key={item.eyebrow} className={index === activeSlide ? 'is-current' : ''}
              aria-label={`Show slide ${index + 1}`} aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => setActiveSlide(index)} />
          ))}
        </div>
      </div>
      <div className="hero__art" aria-hidden="true">
        <div className="hero__sun" />
        <div className="hero__shape hero__shape--left">{slide.left}</div>
        <div className="hero__shape hero__shape--right">{slide.right}</div>
        <span className="hero__caption">{slide.caption}</span>
        <span className="hero__art-number">{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
