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
    <section className="toggle videoGallery" data-video-gallery="">
        <h4 className="toggle-title">
            {$lang($string('products.videos.header'))}
            <a href="#videoGallery-content" className="toggleLink is-open" data-collapsible="">
                <span className="toggleLink-text toggleLink-text--on">
                    {$lang($string('products.videos.hide'))}
                </span>
                <span className="toggleLink-text toggleLink-text--off">
                    {$lang($string('products.videos.show'))}
                </span>
            </a>
        </h4>

        <div className="toggle-content is-open" id="videoGallery-content">
            <div className="videoGallery-main widescreen">
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
            <ul className="videoGallery-list">
                <$Each
                    list={list}
                    $then={(video, loop) => (
                        <li className="videoGallery-item">
                            <a href="#" className={`video ${$if(loop['@first']).then(() => $$raw('is-active'))}`} data-video-item="" data-video-id={video.id}>
                                <div className="video-figure">
                                    <img className="lazyload" data-sizes="auto" src={$cdn($string('img/loading.svg'))} data-src={`//i.ytimg.com/vi/${video.id}/default.jpg`}/>
                                </div>
                                <div className="video-body">
                                    <h5 className="video-title">{video.title_long}</h5>
                                    <p className="video-description">{video.description_short}</p>
                                </div>
                            </a>
                        </li>
                    )}
                />
            </ul>
        </div>
    </section>
));
