import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_capitalize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{social_media: Hint['social_media']}>(({social_media}) => (
    <$If
        query={[social_media]}
        $then={() => (
            <ul className="socialLinks socialLinks--alt">
                <$Each
                    list={social_media}
                    $then={(item) => (
                        <$If
                            query={[item.display_name, '===', $string('twitter')]}
                            $then={() => (
                                <li className="socialLinks-item">
                                    <a className="icon icon--x" href={item.url} target="_blank" rel="noopener" title="X">
                                        <span className="aria-description--hidden">X</span>
                                        <svg>
                                            <use href="#icon-x"/>
                                        </svg>
                                    </a>
                                </li>
                            )}
                            $else={() => (
                                <li className="socialLinks-item">
                                    <a
                                        className={`icon icon--${item.display_name}`}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener"
                                        title={$_capitalize(item.display_name)}
                                    >
                                        <span className="aria-description--hidden">{$_capitalize(item.display_name)}</span>
                                        <svg>
                                            <use href={`#icon-${item.display_name}`}/>
                                        </svg>
                                    </a>
                                </li>
                            )}
                        />
                    )}
                />
            </ul>
        )}
    />
));
