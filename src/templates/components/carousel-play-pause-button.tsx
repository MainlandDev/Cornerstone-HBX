/**
 * Source: templates/components/carousel-play-pause-button.html (14 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $asPartial(() => (
    <>
        {/* html L1: {{inject 'carouselPlayPauseButtonPlay' (lang 'carousel.play_pause_button_play')}} */}
        <$Inject keyName={$string('carouselPlayPauseButtonPlay')} value={$lang($string('carousel.play_pause_button_play'))}/>
        {/* html L2: {{inject 'carouselPlayPauseButtonPause' (lang 'carousel.play_pause_button_pause')}} */}
        <$Inject keyName={$string('carouselPlayPauseButtonPause')} value={$lang($string('carousel.play_pause_button_pause'))}/>
        {/* html L3: {{inject 'carouselPlayPauseButtonAriaPlay' (lang 'carousel.play_pause_button_aria_play')}} */}
        <$Inject keyName={$string('carouselPlayPauseButtonAriaPlay')} value={$lang($string('carousel.play_pause_button_aria_play'))}/>
        {/* html L4: {{inject 'carouselPlayPauseButtonAriaPause' (lang 'carousel.play_pause_button_aria_pause')}} */}
        <$Inject keyName={$string('carouselPlayPauseButtonAriaPause')} value={$lang($string('carousel.play_pause_button_aria_pause'))}/>

        {/* html L6-11:
           <button
               data-play-pause-button
               type="button"
               class="carousel-play-pause-button"
               aria-label="{{lang 'carousel.play_pause_button_aria_pause'}}"
           >
        */}
        <button
            data-play-pause-button=""
            type="button"
            className="carousel-play-pause-button"
            aria-label={$lang($string('carousel.play_pause_button_aria_pause'))}
        >
            {/* html L12: {{lang 'carousel.play_pause_button_pause'}} */}
            <$Lang translationKey={$string('carousel.play_pause_button_pause')}/>
        </button>
    </>
));
