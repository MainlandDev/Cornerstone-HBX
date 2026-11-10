/**
 * Source: templates/components/common/channel-selector.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{theme_settings: Hint['theme_settings']}>(({theme_settings}) => (
    /* html L1: {{#if theme_settings.channels.length '>' 1}} */
    <$If
        query={[theme_settings.channels.length, '>', $number(1)]}
        $then={() => (
            /* html L2: <ul class="navUser-section"> */
            <ul className="navUser-section">
                {/* html L3: <li class="navUser-item"> */}
                <li className="navUser-item">
                    {/* html L4-9:
                       <a href="#"
                          class="navUser-action navUser-action--channelSelector has-dropdown"
                          data-dropdown="channelSelection"
                          aria-controls="channelSelection"
                          aria-expanded="false"
                       >
                    */}
                    <a
                        href="#"
                        className="navUser-action navUser-action--channelSelector has-dropdown"
                        data-dropdown="channelSelection"
                        aria-controls="channelSelection"
                        aria-expanded="false"
                    >
                        {/* html L10: {{#each theme_settings.channels}} */}
                        <$Each
                            list={theme_settings.channels}
                            $then={(channel) => (
                                /* html L11: {{#if is_active}} */
                                <$If
                                    query={[channel.is_active]}
                                    $then={() => /* html L12: {{lang 'common.channel' code=code}} */ <$Lang translationKey={$string('common.channel')} params={{code: channel.code}}/>}
                                />
                            )}
                        />
                        {/* html L15: <i class="icon" aria-hidden="true"> */}
                        <i className="icon" aria-hidden="true">
                            {/* html L16: <svg> */}
                            <svg>
                                {/* html L17: <use href="#icon-chevron-down"/> */}
                                <use href="#icon-chevron-down"/>
                            </svg>
                        </i>
                    </a>
                    {/* html L21: <ul class="dropdown-menu" id="channelSelection" data-dropdown-content aria-hidden="true" tabindex="-1"> */}
                    <ul className="dropdown-menu" id="channelSelection" data-dropdown-content="" aria-hidden="true" tabIndex={-1}>
                        {/* html L22: {{#each theme_settings.channels}} */}
                        <$Each
                            list={theme_settings.channels}
                            $then={(channel) => (
                                /* html L23: <li class="dropdown-menu-item"> */
                                <li className="dropdown-menu-item">
                                    {/* html L24: <a href="{{{switch_url}}}" data-channel-code="{{{code}}}" data-warning="{{lang 'common.channel_switch_warning'}}"> */}
                                    <a
                                        href={$unescaped(channel.switch_url)}
                                        data-channel-code={$unescaped(channel.code)}
                                        data-warning={$lang($string('common.channel_switch_warning'))}
                                    >
                                        {/* html L25: {{#if is_active}} */}
                                        <$If
                                            query={[channel.is_active]}
                                            $then={() => /* html L26: <strong>{{name}}</strong> */ <strong>{/* html L26: {{name}} */}{channel.name}</strong>}
                                            $else={() => <>{/* html L27: {{else}}
                                                                                                                            html L28: {{name}}
                                                           */}{channel.name}</>}
                                        />
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </li>
            </ul>
        )}
    />
));
