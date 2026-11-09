import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContextHint} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemeContext, ExtendedThemePageCart} from '@/context';

/** Global-context hint for partials that read ambient keys (the same shape as the page context). */
export type Hint = ThemeContextHint<ExtendedThemeContext>;

/** Cart page hint, for partials that read cart line items (`cart-preview`, `responsive-img` callers). */
export type CartHint = ThemeContextHint<ExtendedThemePageCart>;

type Str = HandlebarsInlineValueToken<string>;

/**
 * Stencil image object (`{{getImage image ...}}`). The library's `StencilImageHint` requires `width`/`height` (`Required<CommonImage>`),
 * so this is the sized shape; `ThemeImage` (cart items) lacks them: a library typing gap logged in DEVIATIONS.
 */
export type ImageHint = {
    data: Str;
    alt: Str;
    width: HandlebarsInlineValueToken<number>;
    height: HandlebarsInlineValueToken<number>;
};

/** Ambient `page` key (`{{../page.title}}` in navigation-menu). Not declared by the library's `ThemeContext`. */
export type PageHint = {
    page: {title: Str};
};

/** `forms` as search-box reads it: the library types `forms` as `ThemeEmptyList | ThemeForms`, so `forms.search` is not reachable. */
export type SearchFormHint = {
    search: {query: Str};
};

/**
 * One category node as the navigation partials read it (`this` inside `categories` / `children` loops). The library's
 * ThemeCategoryNode marks `children` and `is_active` optional; the partials are only rendered inside `{{#if children}}` or
 * `{{#each}}`, so the local type declares them required and the partials are called by name with `context={$this()}`.
 */
export type CategoryNodeHint = {
    id: Str;
    name: Str;
    url: Str;
    is_active: HandlebarsInlineValueToken<boolean>;
    children: Array<CategoryNodeHint>;
};

/** One pagination link (`links` entries in paginator). */
export type PaginationLinkHint = {
    number: HandlebarsInlineValueToken<number>;
    url: Str;
};

/** One promotion banner (`banners.<top|bottom>_metadata`). Not declared by the library's `ThemeBanners`. */
export type BannerMetaHint = {
    id: HandlebarsInlineValueToken<number>;
    'banner-name': Str;
    location: Str;
    content: Str;
};

/** Ambient `banners`: the library declares only `top` / `bottom`; the `*_metadata` lists are used by header and footer. */
export type BannersHint = {
    top: Array<Str>;
    bottom: Array<Str>;
    top_metadata: Array<BannerMetaHint>;
    bottom_metadata: Array<BannerMetaHint>;
};

/** Ambient `product` key (share, wishlist-dropdown). Not declared by the library's `ThemeContext`. */
export type ProductHint = {
    id: HandlebarsInlineValueToken<number>;
    add_to_wishlist_url: Str;
    main_image: ImageHint;
};
