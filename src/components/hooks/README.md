# Custom Hooks

## useScrollAnimation

Hook untuk menambahkan scroll-triggered animations pada komponen.

### Usage

```tsx
import { useScrollAnimation } from './hooks/useScrollAnimation';

const MyComponent = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref as React.RefObject<HTMLElement>}>
      <div className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        Content here
      </div>
    </section>
  );
};
```

### Options

- `threshold`: Percentage of element visibility to trigger animation (default: 0.2)
- `rootMargin`: Margin around the root element (default: '0px')
- `triggerOnce`: Whether animation should trigger only once (default: true)

### Features

- Fade-in effect (opacity 0 to 1)
- Slide-up effect (translateY 40px to 0)
- Stagger delays for multiple items
- Smooth transitions with ease-out timing
