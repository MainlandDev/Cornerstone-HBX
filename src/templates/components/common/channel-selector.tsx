import {$Each, $If, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{theme_settings: Hint['theme_settings']}>(({theme_settings}) => (
    <$If
        query={[theme_settings.channels.length, '>', $number(1)]}
        $then={() => (
            <ul className="navUser-section">
                <li className="navUser-item">
                    <a
                        href="#"
                        className="navUser-action navUser-action--channelSelector has-dropdown"
                        data-dropdown="channelSelection"
                        aria-controls="channelSelection"
                        aria-expanded="false"
                    >
                        <$Each
                            list={theme_settings.channels}
                            $then={(channel) => (
                                <$If
                                    query={[channel.is_active]}
                                    $then={() => <$Lang translationKey={$string('common.channel')} params={{code: channel.code}}/>}
                                />
                            )}
                        />
                        <i className="icon" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down"/>
                            </svg>
                        </i>
                    </a>
                    <ul className="dropdown-menu" id="channelSelection" data-dropdown-content="" aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={theme_settings.channels}
                            $then={(channel) => (
                                <li className="dropdown-menu-item">
                                    <a
                                        href={$unescaped(channel.switch_url)}
                                        data-channel-code={$unescaped(channel.code)}
                                        data-warning={$lang($string('common.channel_switch_warning'))}
                                    >
                                        <$If
                                            query={[channel.is_active]}
                                            $then={() => <strong>{channel.name}</strong>}
                                            $else={() => <>{channel.name}</>}
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
