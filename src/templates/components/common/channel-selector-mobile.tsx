import {$Each, $If, $each, $if, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{theme_settings: Hint['theme_settings']}>(({theme_settings}) => (
    <$If
        query={[theme_settings.channels.length, '>', $number(1)]}
        $then={() => (
            <>
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
                    <$Each
                        list={theme_settings.channels}
                        $then={(channel) => (
                            <$If
                                query={[channel.is_active]}
                                $then={() => <$Lang translationKey={$string('common.channel')} params={{code: channel.code}}/>}
                            />
                        )}
                    />
                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                        <svg>
                            <use href="#icon-chevron-down"></use>
                        </svg>
                    </i>
                </a>
                <div className="navPage-subMenu" id="navPages-channel" aria-hidden="true" tabIndex={-1}>
                    <ul className="navPage-subMenu-list">
                        <$Each
                            list={theme_settings.channels}
                            $then={(channel) => (
                                <li className="navPage-subMenu-item">
                                    <a
                                        href={$unescaped(channel.switch_url)}
                                        className="navPage-subMenu-action navPages-action"
                                        aria-label={channel.name}
                                        data-channel-code={$unescaped(channel.code)}
                                        data-warning={$lang($string('common.channel_switch_warning'))}
                                    >
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
