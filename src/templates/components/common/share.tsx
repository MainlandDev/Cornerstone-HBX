/**
 * Source: templates/components/common/share.html (100 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$AssignVar} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_capitalize, $cdn, $encodeURI, $getImageSrcset, $getVar} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {Hint, ProductHint} from '@/context-common';

export default $asPartial<{
    url: HandlebarsInlineValueToken<string>;
    head: Hint['head'];
    settings: Hint['settings'];
    theme_settings: Hint['theme_settings'];
    product: ProductHint;
}>(({url, head, settings, theme_settings, product}) => (
    <>
    {/* html L1: {{#if settings.add_this.buttons}} */}
    <$If
        query={[settings.add_this.buttons]}
        $then={() => (
            <>
                {/* html L2: {{assignVar 'encodedUrl' (encodeURI url)}} */}
                <$AssignVar keyName={$string('encodedUrl')} value={$encodeURI(url)}/>
                {/* html L3: {{assignVar 'encodedTitle' (encodeURI head.title)}} */}
                <$AssignVar keyName={$string('encodedTitle')} value={$encodeURI(head.title)}/>
                {/* html L4: <div> */}
                <div>
                    {/* html L5: <ul class="socialLinks"> */}
                    <ul className="socialLinks">
                        {/* html L6: {{#each settings.add_this.buttons}} */}
                        <$Each
                            list={settings.add_this.buttons}
                            $then={(button) => (
                                /* html L7: <li class="socialLinks-item socialLinks-item--{{service}}"> */
                                <li className={`socialLinks-item socialLinks-item--${button.service}`}>
                                    {/* html L8: {{#if service '===' 'facebook'}} */}
                                    <$If
                                        query={[button.service, '===', $string('facebook')]}
                                        $then={() => (
                                            /* html L9-15:
                                               <a class="socialLinks__link icon icon--{{service}}"
                                                  title="{{{capitalize service}}}"
                                                  href="https://facebook.com/sharer/sharer.php?u={{getVar 'encodedUrl'}}"
                                                  target="_blank"
                                                  rel="noopener"
                                                  {{{annotation}}}
                                               >
                                            */
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                title={$_capitalize(button.service)}
                                                href={`https://facebook.com/sharer/sharer.php?u=${$getVar($string('encodedUrl'))}`}
                                                target="_blank"
                                                rel="noopener"
                                                $$={$unescaped(button.annotation)}
                                            >
                                                {/* html L16: <span class="aria-description--hidden">{{{capitalize service}}}</span> */}
                                                <span className="aria-description--hidden">{/* html L16: {{{capitalize service}}} */}{$_capitalize(button.service)}</span>
                                                {/* html L17: <svg> */}
                                                <svg>
                                                    {/* html L18: <use href="#icon-facebook"/> */}
                                                    <use href="#icon-facebook"/>
                                                </svg>
                                            </a>
                                        )}
                                        $elseThen={[
                                            {
                                                query: [button.service, '===', $string('email')],
                                                $then: () => (
                                                    /* html L21: {{else if service '===' 'email'}}
                                                                                                              html L22-28:
                                                       <a class="socialLinks__link icon icon--{{service}}"
                                                          title="{{{capitalize service}}}"
                                                          href="mailto:?subject={{getVar 'encodedTitle'}}&amp;body={{getVar 'encodedUrl'}}"
                                                          target="_self"
                                                          rel="noopener"
                                                          {{{annotation}}}
                                                       >
                                                    */
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        href={`mailto:?subject=${$getVar($string('encodedTitle'))}&body=${$getVar($string('encodedUrl'))}`}
                                                        target="_self"
                                                        rel="noopener"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        {/* html L29: <span class="aria-description--hidden">{{{capitalize service}}}</span> */}
                                                        <span className="aria-description--hidden">{/* html L29: {{{capitalize service}}} */}{$_capitalize(button.service)}</span>
                                                        {/* html L30: <svg> */}
                                                        <svg>
                                                            {/* html L31: <use href="#icon-envelope"/> */}
                                                            <use href="#icon-envelope"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('print')],
                                                $then: () => (
                                                    /* html L34: {{else if service '===' 'print'}}
                                                                                                              html L35-39:
                                                       <a class="socialLinks__link icon icon--{{service}}"
                                                          title="{{{capitalize service}}}"
                                                          onclick="window.print();return false;"
                                                          {{{annotation}}}
                                                       >
                                                    */
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        $$={[$$raw('onclick="window.print();return false;" '), $unescaped(button.annotation)]}
                                                    >
                                                        {/* html L40: <span class="aria-description--hidden">{{{capitalize service}}}</span> */}
                                                        <span className="aria-description--hidden">{/* html L40: {{{capitalize service}}} */}{$_capitalize(button.service)}</span>
                                                        {/* html L41: <svg> */}
                                                        <svg>
                                                            {/* html L42: <use href="#icon-print"/> */}
                                                            <use href="#icon-print"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('twitter')],
                                                $then: () => (
                                                    /* html L45: {{else if service '===' 'twitter'}}
                                                                                                              html L46-52:
                                                       <a class="socialLinks__link icon icon--x"
                                                          href="https://x.com/intent/tweet/?text={{getVar 'encodedTitle'}}&amp;url={{getVar 'encodedUrl'}}"
                                                          target="_blank"
                                                          rel="noopener"
                                                          title="X"
                                                          {{{annotation}}}
                                                       >
                                                    */
                                                    <a
                                                        className="socialLinks__link icon icon--x"
                                                        href={`https://x.com/intent/tweet/?text=${$getVar($string('encodedTitle'))}&url=${$getVar($string('encodedUrl'))}`}
                                                        target="_blank"
                                                        rel="noopener"
                                                        title="X"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        {/* html L53: <span class="aria-description--hidden">X</span> */}
                                                        <span className="aria-description--hidden">X</span>
                                                        {/* html L54: <svg> */}
                                                        <svg>
                                                            {/* html L55: <use href="#icon-x"/> */}
                                                            <use href="#icon-x"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('linkedin')],
                                                $then: () => (
                                                    /* html L58: {{else if service '===' 'linkedin'}}
                                                                                                              html L59-65:
                                                       <a class="socialLinks__link icon icon--{{service}}"
                                                          title="{{{capitalize service}}}"
                                                          href="https://www.linkedin.com/shareArticle?mini=true&amp;url={{getVar 'encodedUrl'}}&amp;title={{getVar 'encodedTitle'}}&amp;summary={{getVar 'encodedTitle'}}&amp;source={{getVar 'encodedUrl'}}"
                                                          target="_blank"
                                                          rel="noopener"
                                                          {{{annotation}}}
                                                       >
                                                    */
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${$getVar($string('encodedUrl'))}&title=${$getVar($string('encodedTitle'))}&summary=${$getVar($string('encodedTitle'))}&source=${$getVar($string('encodedUrl'))}`}
                                                        target="_blank"
                                                        rel="noopener"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        {/* html L66: <span class="aria-description--hidden">{{{capitalize service}}}</span> */}
                                                        <span className="aria-description--hidden">{/* html L66: {{{capitalize service}}} */}{$_capitalize(button.service)}</span>
                                                        {/* html L67: <svg> */}
                                                        <svg>
                                                            {/* html L68: <use href="#icon-linkedin"/> */}
                                                            <use href="#icon-linkedin"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('pinterest')],
                                                $then: () => (
                                                    /* html L71: {{else if service '===' 'pinterest'}}
                                                                                                              html L72-78:
                                                       <a class="socialLinks__link icon icon--{{service}}"
                                                          title="{{{capitalize service}}}"
                                                          href="https://pinterest.com/pin/create/button/?url={{getVar 'encodedUrl'}}&amp;media={{getImageSrcset ../product.main_image (cdn ../theme_settings.default_image_product) 1x=../theme_settings.zoom_size}}&amp;description={{getVar 'encodedTitle'}}"
                                                          target="_blank"
                                                          rel="noopener"
                                                          {{{annotation}}}
                                                       >
                                                    */
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        href={`https://pinterest.com/pin/create/button/?url=${$getVar($string('encodedUrl'))}&media=${$getImageSrcset(product.main_image, {'1x': theme_settings.zoom_size}, $cdn(theme_settings.default_image_product))}&description=${$getVar($string('encodedTitle'))}`}
                                                        target="_blank"
                                                        rel="noopener"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        {/* html L79: <span class="aria-description--hidden">{{{capitalize service}}}</span> */}
                                                        <span className="aria-description--hidden">{/* html L79: {{{capitalize service}}} */}{$_capitalize(button.service)}</span>
                                                        {/* html L80: <svg> */}
                                                        <svg>
                                                            {/* html L81: <use href="#icon-pinterest"/> */}
                                                            <use href="#icon-pinterest"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                        ]}
                                    />
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </>
        )}
    />
    {/* html L90: {{#if settings.facebook_like_button.enabled}} */}
    <$If
        query={[settings.facebook_like_button.enabled]}
        $then={() => (
            /* html L91-97:
               <iframe
                   class="facebook{{#if settings.facebook_like_button.verb '===' 'recommend'}}Recommend{{else}}Like{{/if}}Btn"
                   style="border:none; overflow:hidden; margin: 0; padding: 0; position:absolute"
                   src="https://www.facebook.com/plugins/like.php?href={{settings.facebook_like_button.href}}&amp;layout=button_count{{#if settings.facebook_like_button.verb '===' 'recommend'}}&amp;action=recommend{{/if}}&amp;colorscheme=light&amp;height=20"
                   scrolling="no"
                   frameborder="0"
                   allowTransparency="true">
            */
            <iframe
                className={`facebook${$if(settings.facebook_like_button.verb, '===', $string('recommend')).then(() => $$raw('Recommend')).else(() => $$raw('Like'))}Btn`}
                style={{border: 'none', overflow: 'hidden', margin: '0', padding: '0', position: 'absolute'}}
                src={`https://www.facebook.com/plugins/like.php?href=${settings.facebook_like_button.href}&layout=button_count${$if(settings.facebook_like_button.verb, '===', $string('recommend')).then(() => $$raw('&action=recommend'))}&colorscheme=light&height=20`}
                scrolling="no"
                frameBorder="0"
                $$={$$raw('allowtransparency="true"')}
            ></iframe>
        )}
    />
    </>
));
