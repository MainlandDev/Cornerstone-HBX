/**
 * Source: templates/components/common/channel-selector-mobile.html (43 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $each, $if, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{theme_settings: Hint['theme_settings']}>(({theme_settings}) => (
    /* html L1: {{#if theme_settings.channels.length '>' 1}} */
    <$If
        query={[theme_settings.channels.length, '>', $number(1)]}
        $then={() => (
            <>
                {/* html L2-14:
                   <a href="#"
                      class="navPages-action has-subMenu"
                      data-collapsible="navPages-channel"
                      aria-controls="navPages-channel"
                      aria-expanded="false"
                      aria-label="
                       {{#each theme_settings.channels}}
                           {{#if is_active}}
                               {{lang 'common.channel' code=code}}
                           {{/if}}
                       {{/each}}
                      "
                   >
                */}
                <a
                    href="#"
                    className="navPages-action has-subMenu"
                    data-collapsible="navPages-channel"
                    aria-controls="navPages-channel"
                    aria-expanded="false"
                    $$={[
                        $$raw('aria-label="'),
                        $each(theme_settings.channels).then((channel) =>
                            $if(channel.is_active).then(() => $lang($string('common.channel'), {code: channel.code})),
                        ),
                        $$raw('"'),
                    ]}
                >
                    {/* html L15: {{#each theme_settings.channels}} */}
                    <$Each
                        list={theme_settings.channels}
                        $then={(channel) => (
                            /* html L16: {{#if is_active}} */
                            <$If
                                query={[channel.is_active]}
                                $then={() => /* html L17: {{lang 'common.channel' code=code}} */ <$Lang translationKey={$string('common.channel')} params={{code: channel.code}}/>}
                            />
                        )}
                    />
                    {/* html L20: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                        {/* html L21: <svg> */}
                        <svg>
                            {/* html L22: <use href="#icon-chevron-down"></use> */}
                            <use href="#icon-chevron-down"></use>
                        </svg>
                    </i>
                </a>
                {/* html L26: <div class="navPage-subMenu" id="navPages-channel" aria-hidden="true" tabindex="-1"> */}
                <div className="navPage-subMenu" id="navPages-channel" aria-hidden="true" tabIndex={-1}>
                    {/* html L27: <ul class="navPage-subMenu-list"> */}
                    <ul className="navPage-subMenu-list">
                        {/* html L28: {{#each theme_settings.channels}} */}
                        <$Each
                            list={theme_settings.channels}
                            $then={(channel) => (
                                /* html L29: <li class="navPage-subMenu-item"> */
                                <li className="navPage-subMenu-item">
                                    {/* html L30-35:
                                       <a href="{{{switch_url}}}"
                                          class="navPage-subMenu-action navPages-action"
                                          aria-label="{{name}}"
                                          data-channel-code="{{{code}}}"
                                          data-warning="{{lang 'common.channel_switch_warning'}}"
                                       >
                                    */}
                                    <a
                                        href={$unescaped(channel.switch_url)}
                                        className="navPage-subMenu-action navPages-action"
                                        aria-label={channel.name}
                                        data-channel-code={$unescaped(channel.code)}
                                        data-warning={$lang($string('common.channel_switch_warning'))}
                                    >
                                        {/* html L36: {{name}} */}
                                        {channel.name}
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </>
        )}
    />
));
