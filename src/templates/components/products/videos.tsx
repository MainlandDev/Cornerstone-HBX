"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$cdn, $Each, $If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Video {
    id: string;
    title_long: string;
    description_short: string;
}

export default (_props: PartialProps) => (
    <section className="toggle videoGallery" data-video-gallery={""}>
        <h4 className="toggle-title">
            <$Lang keyName={$string("products.videos.header")} />
            <a href="#videoGallery-content" className="toggleLink is-open" data-collapsible={""}>
                <span className="toggleLink-text toggleLink-text--on">
                    <$Lang keyName={$string("products.videos.hide")} />
                </span>
                <span className="toggleLink-text toggleLink-text--off">
                    <$Lang keyName={$string("products.videos.show")} />
                </span>
            </a>
        </h4>

        <div className="toggle-content is-open" id="videoGallery-content">
            <div className="videoGallery-main widescreen">
                <iframe
                    id="player"
                    className="lazyload"
                    type="text/html"
                    width="640"
                    height="390"
                    frameBorder="0"
                    dangerouslyInlineAttributes={{attributes: "webkitAllowFullScreen mozallowfullscreen allowFullScreen"}}
                    data-src={`//www.youtube.com/embed/${$pointer("this.featured.id")}?rel=0`}
                    data-video-player={""}
                ></iframe>
            </div>
            <ul className="videoGallery-list">
                <$Each
                    list={$pointer<Video[]>("this.list")}
                    $then={(video, loop) => (
                        <li className="videoGallery-item">
                            <a href="#" className={`video ${$If({test: loop["@first"], $then: () => "is-active"})}`} data-video-item={""} data-video-id={video.id}>
                                <div className="video-figure">
                                    <img
                                        className="lazyload"
                                        data-sizes="auto"
                                        src={$cdn($string("img/loading.svg"))}
                                        data-src={`//i.ytimg.com/vi/${video.id}/default.jpg`}
                                    />
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
);
