import { cloneElement, isValidElement, type ReactNode } from "react";

/**
 * Ensures Iconsax icons (and any React icon elements) render correctly in React 19.
 *
 * React 19 ignores `Component.defaultProps`, which `iconsax-react` relies on for
 * `color="currentColor"` and `size="24"`. Without explicit props, SVG icons in React 19
 * render with `stroke="none"` (invisible) and zero dimensions.
 *
 * `renderIcon` injects `color="currentColor"` and the designated fallback pixel size
 * whenever they are not explicitly specified on the icon element.
 */
export function renderIcon(
  icon: ReactNode,
  fallbackSizePx: number = 20,
  fallbackColor: string = "currentColor",
): ReactNode {
  if (!icon || !isValidElement(icon)) {
    return icon;
  }

  const iconProps = (icon.props || {}) as {
    color?: string;
    size?: number | string;
    className?: string;
  };

  return cloneElement(icon as React.ReactElement<Record<string, unknown>>, {
    color: iconProps.color ?? fallbackColor,
    size: iconProps.size ?? fallbackSizePx,
  });
}
