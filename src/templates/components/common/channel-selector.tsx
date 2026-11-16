"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Channel {
    code: string;
    name: string;
    is_active: boolean;
    switch_url: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("theme_settings.channels.length")}
        operator={$string(">")}
        rvalue={$number(1)}
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
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => <$If test={channel.is_active} $then={() => <$Lang keyName={$string("common.channel")} code={channel.code} />} />}
                        />
                        <i className="icon" aria-hidden="true">
                            <svg>
                                <use href="#icon-chevron-down" />
                            </svg>
                        </i>
                    </a>
                    <ul className="dropdown-menu" id="channelSelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                        <$Each
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => (
                                <li className="dropdown-menu-item">
                                    <a
                                        dangerouslyInlineAttributes={{
                                            attributes: `href="${$raw("{{{switch_url}}}")}" data-channel-code="${$raw("{{{code}}}")}" data-warning="${$lang($string("common.channel_switch_warning"))}"`,
                                        }}
                                    >
                                        <$If
                                            test={channel.is_active}
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
);
