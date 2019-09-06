/* eslint-disable */
/* React */
import React from "react";

const NavBar = () => {
  return (
    <header className="navbar | color_white width_full">
      <nav id="nav-bar" className="background_black display_inline_block width_full" role="navigation">
        <div className="main-navigation">
          <div className="button sections_button">Sections</div>
          <ul
            id="sections-menu-wide"
            className="menu inline-list homepage-nav hidden-xs nav-display-show"
          >
            <li id="menu-item-0">
              <a href="https://www.washingtonpost.com/politics/?nid=top_nav_politics">
                Politics
              </a>
            </li>
            <li id="menu-item-1">
              <a href="https://www.washingtonpost.com/opinions/?nid=top_nav_opinions">
                Opinions
              </a>
            </li>
            <li id="menu-item-2">
              <a href="https://www.washingtonpost.com/sports/?nid=top_nav_sports">
                Sports
              </a>
            </li>
            <li id="menu-item-3">
              <a href="https://www.washingtonpost.com/local/?nid=top_nav_d.c.,md.-amp;va.">
                D.C., Md. &amp; Va.
              </a>
            </li>
            <li id="menu-item-4">
              <a href="https://www.washingtonpost.com/national/?nid=top_nav_national">
                National
              </a>
            </li>
            <li id="menu-item-5">
              <a href="https://www.washingtonpost.com/world/?nid=top_nav_world">
                World
              </a>
            </li>
            <li id="menu-item-6">
              <a href="https://www.washingtonpost.com/business/?nid=top_nav_business">
                Business
              </a>
            </li>
            <li id="menu-item-7">
              <a href="https://www.washingtonpost.com/business/technology/?nid=top_nav_tech">
                Tech
              </a>
            </li>
          </ul>
          <div className="right_buttons">
            <span className="button sign_in">Sign In</span>
            <span className="button offer">Get this offer</span>
          </div>
        </div>
      </nav>
      <div className="logo_container">
        <img src="https://cdn-images-1.medium.com/max/980/1*8AM1rMv-tbAxvJzkgW2NLQ@2x.png" />
        <a
          href="https://subscribe.washingtonpost.com/acquisition/?promo=ddid_r&amp;hpid=hp_no-name_no-name%3Ahomepage%2Ftagline&amp;destination=http://www.washingtonpost.com/pb/homepage/"
          className="tagline"
          title="The Washington Post"
        >
          Democracy Dies in Darkness
        </a>
      </div>
      <div className="date_region">
        <span className="date">May 16, 2019</span>
        <span className="edition">Edition: U.S. & World | Regional</span>
      </div>
      <ul className="utility_links inline-list thin-style ad-none">
        <li data-pb-field="custom.label" className="label">
          In the News
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/politics/former-president-jimmy-carter-released-from-hospital-after-hip-replacement-surgery/2019/05/16/44c25338-77e2-11e9-b3f5-5673edf2d127_story.html"
            data-pb-field="feature_relatedLinks_1_text"
            data-pb-url-field="feature_relatedLinks_1_link"
            data-pb-placeholder="Link 1"
          >
            Jimmy Carter
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/sports/2019/05/16/stripped-womens-records-transgender-powerlifter-asks-where-do-we-draw-line/ "
            data-pb-field="feature_relatedLinks_2_text"
            data-pb-url-field="feature_relatedLinks_2_link"
            data-pb-placeholder="Link 2"
          >
            Transgender athlete
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/politics/top-house-republican-mccarthy-says-he-opposes-alabama-abortion-law/2019/05/16/22fae790-77f3-11e9-b3f5-5673edf2d127_story.html"
            data-pb-field="feature_relatedLinks_3_text"
            data-pb-url-field="feature_relatedLinks_3_link"
            data-pb-placeholder="Link 3"
          >
            Alabama
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/nation/2019/05/16/missouris-gop-led-senate-passes-strict-antiabortion-bill-amid-wave-similar-legislation/"
            data-pb-field="feature_relatedLinks_4_text"
            data-pb-url-field="feature_relatedLinks_4_link"
            data-pb-placeholder="Link 4"
          >
            Abortion
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/world/europe/in-what-may-be-britains-last-european-election-nigel-farages-new-brexit-party-is-expected-to-dominate/2019/05/15/610ecac0-70e5-11e9-9331-30bc5836f48e_story.html"
            data-pb-field="feature_relatedLinks_5_text"
            data-pb-url-field="feature_relatedLinks_5_link"
            data-pb-placeholder="Link 5"
          >
            Brexit Party
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/arts-entertainment/2019/05/16/bts-pays-homage-beatles-late-show-channeling-legendary-groups-us-debut/"
            data-pb-field="feature_relatedLinks_6_text"
            data-pb-url-field="feature_relatedLinks_6_link"
            data-pb-placeholder="Link 6"
          >
            BTS
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/lifestyle/style/how-a-community-of-obscure-language-inventors-made-it-big-with-game-of-thrones/2019/05/16/dfbd55da-71d0-11e9-8be0-ca575670e91c_story.html?utm_term=.c81654d75f43"
            data-pb-field="feature_relatedLinks_7_text"
            data-pb-url-field="feature_relatedLinks_7_link"
            data-pb-placeholder="Link 7"
          >
            'Thrones'
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/education/2019/05/16/she-served-an-school-lunch-teen-who-couldnt-pay-then-she-was-fired-theft/"
            data-pb-field="feature_relatedLinks_8_text"
            data-pb-url-field="feature_relatedLinks_8_link"
            data-pb-placeholder="Link 8"
          >
            School lunch
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/entertainment/tv/so-long-to-the-big-bang-theory-which-was-smart-about-being-dumb-about-being-smart/2019/05/15/75c3f49a-7685-11e9-b7ae-390de4259661_story.html"
            data-pb-field="feature_relatedLinks_9_text"
            data-pb-url-field="feature_relatedLinks_9_link"
            data-pb-placeholder="Link 9"
          >
            'Big Bang Theory'
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/entertainment/museums/a-bunny-sculpture-by-jeff-koons-just-sold-for-911-million--another-sign-that-the-art-world-is-untethered-from-reality/2019/05/16/589bdf68-77f2-11e9-b7ae-390de4259661_story.html"
            data-pb-field="feature_relatedLinks_10_text"
            data-pb-url-field="feature_relatedLinks_10_link"
            data-pb-placeholder="Link 10"
          >
            Jeff Koons
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/sports/2019/05/16/tiger-woods-pga-championship-tracker/"
            data-pb-field="feature_relatedLinks_11_text"
            data-pb-url-field="feature_relatedLinks_11_link"
            data-pb-placeholder="Link 11"
          >
            Tiger Woods
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/sports/2019/05/16/tiger-woods-pga-championship-tracker/"
            data-pb-field="feature_relatedLinks_11_text"
            data-pb-url-field="feature_relatedLinks_11_link"
            data-pb-placeholder="Link 12"
          >
            Russia
          </a>
        </li>
        <li>
          <a
            href="https://www.washingtonpost.com/sports/2019/05/16/tiger-woods-pga-championship-tracker/"
            data-pb-field="feature_relatedLinks_11_text"
            data-pb-url-field="feature_relatedLinks_11_link"
            data-pb-placeholder="Link 13"
          >
            Space
          </a>
        </li>
      </ul>
    </header>
  );
};

NavBar.static = true;

export default NavBar;
