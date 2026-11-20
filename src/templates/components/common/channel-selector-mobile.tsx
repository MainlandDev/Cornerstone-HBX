"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $number, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

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
            <>
                <a
                    href="#"
                    className="navPages-action has-subMenu"
                    data-collapsible="navPages-channel"
                    aria-controls="navPages-channel"
                    aria-expanded="false"
                    dangerouslyInlineAttributes={{
                        attributes: `aria-label="\n    ${$raw("{{#each theme_settings.channels}}\n        {{#if is_active}}\n            {{lang 'common.channel' code=code}}\n        {{/if}}\n    {{/each}}")}\n   "`,
                    }}
                >
                    <$Each
                        list={$pointer<Channel[]>("theme_settings.channels")}
                        $then={(channel) => <$If test={channel.is_active} $then={() => <$Lang keyName={$string("common.channel")} code={channel.code} />} />}
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
                            list={$pointer<Channel[]>("theme_settings.channels")}
                            $then={(channel) => (
                                <li className="navPage-subMenu-item">
                                    <a
                                        className="navPage-subMenu-action navPages-action"
                                        href={$unescaped(channel.switch_url)}
                                        aria-label={channel.name}
                                        data-channel-code={$unescaped(channel.code)}
                                        data-warning={$lang($string("common.channel_switch_warning"))}
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
);
