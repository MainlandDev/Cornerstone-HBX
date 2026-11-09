import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContextHint, ThemePageBlogPost, ThemePageBrands, ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';

/**
 * Extension types for the last 20 templates (the ones that needed the raw-Handlebars escape hatch).
 * Each addition is a library gap logged in DEVIATIONS.md.
 */
type Str = HandlebarsInlineValueToken<string>;
type Bool = HandlebarsInlineValueToken<boolean>;

type BlogHint = ThemeContextHint<ThemePageBlogPost>;

/** `components/blog/post`: the listing and the post page both pass `post`; `summary` / `show_read_more` exist on listing posts only. */
export type BlogPostHint = BlogHint['blog']['post'] & {summary: Str; show_read_more: Bool};
export type BlogThemeSettingsHint = BlogHint['theme_settings'];

/** `components/carousel-content`: one hero slide, read ambiently (the partial is called with no arguments inside `carousel`'s `each`). */
export type SlideHint = {
    alt_text: Str;
    button_text: Str;
    heading: Str;
    text: Str;
    url: Str;
};

/** `pages/brands` reads `alternate` (a per-brand flag) that the library's brand item type lacks. */
export type ExtendedThemePageBrands = Omit<ThemePageBrands, 'brands'> & {
    brands: Array<ThemePageBrands['brands'][number] & {alternate: Bool}>;
};

/** `pages/search`: the lib types `forms` / `pagination` as `ThemeEmptyList | <object>`; narrowed to the object branch (assignable to the lib type). */
export type ExtendedThemePageSearch = Omit<ThemePageSearch, 'forms' | 'pagination'> & {
    forms: Extract<ThemePageSearch['forms'], {search?: unknown}>;
    pagination: Extract<ThemePageSearch['pagination'], {product_results?: unknown}>;
};
