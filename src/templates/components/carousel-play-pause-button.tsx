import {$Inject, $lang, $Lang, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <$Inject keyName={$string("carouselPlayPauseButtonPlay")} value={$lang($string("carousel.play_pause_button_play"))} />{" "}
        <$Inject keyName={$string("carouselPlayPauseButtonPause")} value={$lang($string("carousel.play_pause_button_pause"))} />{" "}
        <$Inject keyName={$string("carouselPlayPauseButtonAriaPlay")} value={$lang($string("carousel.play_pause_button_aria_play"))} />{" "}
        <$Inject keyName={$string("carouselPlayPauseButtonAriaPause")} value={$lang($string("carousel.play_pause_button_aria_pause"))} />
        <button data-play-pause-button={""} type="button" className="carousel-play-pause-button" aria-label={$lang($string("carousel.play_pause_button_aria_pause"))}>
            <$Lang keyName={$string("carousel.play_pause_button_pause")} />
        </button>
    </>
);
