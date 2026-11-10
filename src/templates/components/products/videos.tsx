/**
 * Source: templates/components/products/videos.html (48 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$cdn, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';

type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    featured: {id: Str};
    list: Array<{id: Str; title_long: Str; description_short: Str}>;
}>(({featured, list}) => (
    /* html L1: <section class="toggle videoGallery" data-video-gallery> */
    <section className="toggle videoGallery" data-video-gallery="">
        {/* html L2: <h4 class="toggle-title"> */}
        <h4 className="toggle-title">
            {/* html L3: {{lang 'products.videos.header'}} */}
            {$lang($string('products.videos.header'))}
            {/* html L4: <a href="#videoGallery-content" class="toggleLink is-open" data-collapsible> */}
            <a href="#videoGallery-content" className="toggleLink is-open" data-collapsible="">
                {/* html L5: <span class="toggleLink-text toggleLink-text--on"> */}
                <span className="toggleLink-text toggleLink-text--on">
                    {/* html L6: {{lang 'products.videos.hide'}} */}
                    {$lang($string('products.videos.hide'))}
                </span>
                {/* html L8: <span class="toggleLink-text toggleLink-text--off"> */}
                <span className="toggleLink-text toggleLink-text--off">
                    {/* html L9: {{lang 'products.videos.show'}} */}
                    {$lang($string('products.videos.show'))}
                </span>
            </a>
        </h4>

        {/* html L14: <div class="toggle-content is-open" id="videoGallery-content"> */}
        <div className="toggle-content is-open" id="videoGallery-content">
            {/* html L15: <div class="videoGallery-main widescreen"> */}
            <div className="videoGallery-main widescreen">
                {/* html L16-27:
                   <iframe
                       id="player"
                       class="lazyload"
                       type="text/html"
                       width="640"
                       height="390"
                       frameborder="0"
                       webkitAllowFullScreen
                       mozallowfullscreen
                       allowFullScreen
                       data-src="//www.youtube.com/embed/{{this.featured.id}}?rel=0"
                       data-video-player>
                */}
                <iframe
                    id="player"
                    className="lazyload"
                    {...{type: 'text/html'}}
                    width="640"
                    height="390"
                    frameBorder="0"
                    $$={[$$raw('webkitallowfullscreen'), $$raw('mozallowfullscreen')]}
                    allowFullScreen
                    data-src={`//www.youtube.com/embed/${featured.id}?rel=0`}
                    data-video-player=""
                ></iframe>
            </div>
            {/* html L30: <ul class="videoGallery-list"> */}
            <ul className="videoGallery-list">
                {/* html L31: {{#each this.list}} */}
                <$Each
                    list={list}
                    $then={(video, loop) => (
                        /* html L32: <li class="videoGallery-item"> */
                        <li className="videoGallery-item">
                            {/* html L33: <a href="#" class="video {{#if @first}}is-active{{/if}}" data-video-item data-video-id="{{id}}"> */}
                            <a href="#" className={`video ${$if(loop['@first']).then(() => $$raw('is-active'))}`} data-video-item="" data-video-id={video.id}>
                                {/* html L34: <div class="video-figure"> */}
                                <div className="video-figure">
                                    {/* html L35: <img class="lazyload" data-sizes="auto" src="{{cdn 'img/loading.svg'}}" data-src="//i.ytimg.com/vi/{{id}}/default.jpg"/> */}
                                    <img className="lazyload" data-sizes="auto" src={$cdn($string('img/loading.svg'))} data-src={`//i.ytimg.com/vi/${video.id}/default.jpg`}/>
                                </div>
                                {/* html L37: <div class="video-body"> */}
                                <div className="video-body">
                                    {/* html L38: <h5 class="video-title">{{title_long}}</h5> */}
                                    <h5 className="video-title">{/* html L38: {{title_long}} */}{video.title_long}</h5>
                                    {/* html L39: <p class="video-description">{{description_short}}</p> */}
                                    <p className="video-description">{/* html L39: {{description_short}} */}{video.description_short}</p>
                                </div>
                            </a>
                        </li>
                    )}
                />
            </ul>
        </div>
    </section>
));
