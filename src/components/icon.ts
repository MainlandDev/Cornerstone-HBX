import {createElement, type ReactNode} from 'react';

type IconProps = {
    glyph: string;
    className?: string;
    children?: ReactNode;
};

/**
 * STUB for the legacy non-standard `<icon glyph="...">` tag (used in alert partials and products/add-to-cart).
 * Known unknown: believed to be part of the CDN system that serves SVG files, but its real purpose is unidentified.
 * Emits the tag exactly as the original markup does; identify usage later (see DEVIATIONS.md).
 */
export const Icon = ({glyph, className, children}: IconProps) =>
    createElement('icon', {glyph, className, 'aria-hidden': 'true'}, children);
