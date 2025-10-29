import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  CSSProperties,
  ImgHTMLAttributes,
  KeyboardEvent,
  PointerEvent,
  TransitionEvent,
} from 'react';
import './ImageStack.css';

export interface ImageStackItem {
  src: string;
  alt?: string;
  id?: string;
  style?: CSSProperties;
  tabIndex?: number;
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
}

export interface ImageStackProps {
  images: ImageStackItem[];
  className?: string;
}

const LAYER_FALLBACKS: CSSProperties[] = [
  {
    transform: 'scale(0.6) rotate(0deg)',
  },
  {
    transform: 'scale(0.6) rotate(-7deg)',
  },
  {
    transform: 'scale(0.6) rotate(7deg)',
  },
];

const HIDDEN_LAYER_STYLE: CSSProperties = {
  transform: 'scale(0.6) rotate(0deg)',
  opacity: 0,
};

const DRAG_THRESHOLD = 70;
const DRAG_LIMIT = 140;
const EXIT_OFFSET_X = 120;
const EXIT_OFFSET_Y = -18;
const EXIT_ROTATION = 8;
const DRAG_FADE_DISTANCE = 120;

type NormalizedStackItem = ImageStackItem & { id: string };

function getFallbackStyle(index: number): CSSProperties {
  if (index < LAYER_FALLBACKS.length) {
    return LAYER_FALLBACKS[index];
  }
  return HIDDEN_LAYER_STYLE;
}

type DragState = {
  activeId: string | null;
  startX: number;
  deltaX: number;
  isDragging: boolean;
};

function createDragState(): DragState {
  return {
    activeId: null,
    startX: 0,
    deltaX: 0,
    isDragging: false,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ImageStack({ images, className = '' }: ImageStackProps) {
  const normalizedImages = useMemo<NormalizedStackItem[]>(() => {
    return images.map((image, index) => ({
      ...image,
      id: image.id ?? `${image.src}-${index}`,
    }));
  }, [images]);

  const [stack, setStack] = useState<NormalizedStackItem[]>(normalizedImages);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [dragState, setDragState] = useState<DragState>(() => createDragState());

  useEffect(() => {
    setStack(normalizedImages);
    setExitingId(null);
    setExitDirection(null);
    setDragState(createDragState());
  }, [normalizedImages]);

  const triggerExit = useCallback(
    (direction: 'left' | 'right') => {
      if (stack.length <= 1 || exitingId) return;
      const [top] = stack;
      if (!top) return;
      setExitDirection(direction);
      setExitingId(top.id);
      setDragState(createDragState());
    },
    [stack, exitingId],
  );

  const handleExitComplete = useCallback(
    (id: string) => {
      setStack((prev) => {
        const currentIndex = prev.findIndex((item) => item.id === id);
        if (currentIndex === -1) {
          return prev;
        }

        const reordered = [...prev];
        const [removed] = reordered.splice(currentIndex, 1);
        reordered.push(removed);
        return reordered;
      });

      setExitingId(null);
      setExitDirection(null);
    },
    [],
  );

  if (!stack.length) return null;

  const listClassName = ['image-stack', className].filter(Boolean).join(' ');

  return (
    <ul className={listClassName}>
      {stack.map(({ src, alt = '', style, tabIndex, imageProps = {}, id }, index) => {
        const isTop = index === 0;
        const isVisible = index < 3;
        const isExiting = exitingId === id;
        const isDraggingThis = dragState.activeId === id;
        const fallbackStyle = getFallbackStyle(index);
        const { transform: customTransform, opacity: customOpacity, ...restStyle } = style ?? {};

        const transformParts: string[] = [];
        if (fallbackStyle.transform) transformParts.push(fallbackStyle.transform);
        if (customTransform) transformParts.push(customTransform);

        let opacity: CSSProperties['opacity'] = 1;
        if (customOpacity != null) {
          opacity = customOpacity;
        } else if (fallbackStyle.opacity != null) {
          opacity = fallbackStyle.opacity;
        }

        const baseStyle: CSSProperties = {
          width: '100%',
          height: '100%',
          zIndex: stack.length - index,
          pointerEvents: isTop && !exitingId ? 'auto' : 'none',
          touchAction: isTop && !exitingId ? 'pan-y' : 'none',
          boxShadow:
            index === 0
              ? '0 18px 40px -18px rgba(17, 24, 39, 0.45)'
              : index === 1
                ? '0 12px 28px -20px rgba(17, 24, 39, 0.35)'
                : 'none',
          ...restStyle,
        };

        let finalOpacity: CSSProperties['opacity'] = opacity;

        if (isTop && isDraggingThis && dragState.deltaX !== 0) {
          const { deltaX } = dragState;
          const dragProgress = Math.min(Math.abs(deltaX) / DRAG_FADE_DISTANCE, 1);
          transformParts.push(`translateX(${deltaX}px) rotate(${(deltaX / DRAG_LIMIT) * 6}deg)`);
          finalOpacity = Math.max(1 - dragProgress * 0.85, 0.1);
        }

        if (isExiting) {
          const direction = exitDirection ?? 'right';
          const directionMultiplier = direction === 'left' ? -1 : 1;
          transformParts.push(
            `translate(${directionMultiplier * EXIT_OFFSET_X}px, ${EXIT_OFFSET_Y}px) rotate(${
              directionMultiplier * EXIT_ROTATION
            }deg)`,
          );
          finalOpacity = 0;
        }

        if (transformParts.length > 0) {
          baseStyle.transform = transformParts.join(' ');
        }
        baseStyle.opacity = finalOpacity;

        const computedTabIndex =
          tabIndex ?? (isTop && !exitingId ? 0 : isVisible ? -1 : undefined);

        const mergedImageProps: ImgHTMLAttributes<HTMLImageElement> = {
          loading: 'lazy',
          decoding: 'async',
          draggable: false,
          sizes: '100vw',
          ...imageProps,
        };

        const handleClick =
          isTop && !exitingId
            ? () => {
                if (dragState.isDragging || dragState.activeId) return;
                triggerExit('right');
              }
            : undefined;
        const handleKeyDown =
          isTop && !exitingId
            ? (event: KeyboardEvent<HTMLLIElement>) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  triggerExit('right');
                }
              }
            : undefined;

        const handlePointerDown =
          isTop && !exitingId
            ? (event: PointerEvent<HTMLLIElement>) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setDragState({
                  activeId: id,
                  startX: event.clientX,
                  deltaX: 0,
                  isDragging: true,
                });
              }
            : undefined;

        const handlePointerMove =
          isTop
            ? (event: PointerEvent<HTMLLIElement>) => {
                setDragState((prev) => {
                  if (!prev.isDragging || prev.activeId !== id) return prev;
                  const delta = event.clientX - prev.startX;
                  const clamped = clamp(delta, -DRAG_LIMIT, DRAG_LIMIT);
                  if (clamped === prev.deltaX) return prev;
                  return {
                    ...prev,
                    deltaX: clamped,
                  };
                });
              }
            : undefined;

        const handlePointerEnd =
          isTop
            ? (event: PointerEvent<HTMLLIElement>) => {
                if (dragState.activeId !== id) return;
                try {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                } catch {
                  // ignore if already released
                }
                const finalDelta = dragState.deltaX;
                const absDelta = Math.abs(finalDelta);
                if (absDelta > DRAG_THRESHOLD) {
                  triggerExit(finalDelta < 0 ? 'left' : 'right');
                  return;
                }
                setDragState(createDragState());
              }
            : undefined;

        const handlePointerCancel =
          isTop
            ? (event: PointerEvent<HTMLLIElement>) => {
                if (dragState.activeId !== id) return;
                try {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                } catch {
                  // ignore if already released
                }
                setDragState(createDragState());
              }
            : undefined;

        const handleTransitionEnd =
          isTop || isExiting
            ? (event: TransitionEvent<HTMLLIElement>) => {
                if (event.propertyName !== 'transform') return;
                if (isExiting) {
                  handleExitComplete(id);
                }
              }
            : undefined;

        return (
          <li
            key={id}
            className={[
              'image-stack__item',
              isTop && !exitingId ? 'image-stack__item--active' : '',
              isExiting ? 'image-stack__item--exiting' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={baseStyle}
            tabIndex={computedTabIndex}
            role={isTop ? 'button' : undefined}
            aria-label={isTop ? 'Show next photo' : undefined}
            aria-hidden={!isVisible}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerCancel}
            onTransitionEnd={handleTransitionEnd}
          >
            <img className="image-stack__image" src={src} alt={alt} {...mergedImageProps} />
          </li>
        );
      })}
    </ul>
  );
}
