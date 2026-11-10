/**
 * Source: templates/components/common/social-links.html (36 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_capitalize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{social_media: Hint['social_media']}>(({social_media}) => (
    /* html L1: {{#if social_media}} */
    <$If
        query={[social_media]}
        $then={() => (
            /* html L2: <ul class="socialLinks socialLinks--alt"> */
            <ul className="socialLinks socialLinks--alt">
                {/* html L3: {{#each social_media}} */}
                <$Each
                    list={social_media}
                    $then={(item) => (
                        /* html L4: {{#if display_name '===' 'twitter'}} */
                        <$If
                            query={[item.display_name, '===', $string('twitter')]}
                            $then={() => (
                                /* html L5: <li class="socialLinks-item"> */
                                <li className="socialLinks-item">
                                    {/* html L6-11:
                                       <a class="icon icon--x"
                                       href="{{url}}"
                                       target="_blank"
                                       rel="noopener"
                                       title="X"
                                       >
                                    */}
                                    <a className="icon icon--x" href={item.url} target="_blank" rel="noopener" title="X">
                                        {/* html L12: <span class="aria-description--hidden">X</span> */}
                                        <span className="aria-description--hidden">X</span>
                                        {/* html L13: <svg> */}
                                        <svg>
                                            {/* html L14: <use href="#icon-x"/> */}
                                            <use href="#icon-x"/>
                                        </svg>
                                    </a>
                                </li>
                            )}
                            $else={() => (
                                /* html L18: {{else}}
                                                                      html L19: <li class="socialLinks-item">
                                */
                                <li className="socialLinks-item">
                                    {/* html L20-25:
                                       <a class="icon icon--{{display_name}}"
                                       href="{{url}}"
                                       target="_blank"
                                       rel="noopener"
                                       title="{{{capitalize display_name}}}"
                                       >
                                    */}
                                    <a
                                        className={`icon icon--${item.display_name}`}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener"
                                        title={$_capitalize(item.display_name)}
                                    >
                                        {/* html L26: <span class="aria-description--hidden">{{{capitalize display_name}}}</span> */}
                                        <span className="aria-description--hidden">{/* html L26: {{{capitalize display_name}}} */}{$_capitalize(item.display_name)}</span>
                                        {/* html L27: <svg> */}
                                        <svg>
                                            {/* html L28: <use href="#icon-{{display_name}}"/> */}
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
