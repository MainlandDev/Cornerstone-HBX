import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $asPartial(() => (
    <>
        <$Inject keyName={$string('carouselPlayPauseButtonPlay')} value={$lang($string('carousel.play_pause_button_play'))}/>
        <$Inject keyName={$string('carouselPlayPauseButtonPause')} value={$lang($string('carousel.play_pause_button_pause'))}/>
        <$Inject keyName={$string('carouselPlayPauseButtonAriaPlay')} value={$lang($string('carousel.play_pause_button_aria_play'))}/>
        <$Inject keyName={$string('carouselPlayPauseButtonAriaPause')} value={$lang($string('carousel.play_pause_button_aria_pause'))}/>

        <button
            data-play-pause-button=""
            type="button"
            className="carousel-play-pause-button"
            aria-label={$lang($string('carousel.play_pause_button_aria_pause'))}
        >
            <$Lang translationKey={$string('carousel.play_pause_button_pause')}/>
        </button>
    </>
));
