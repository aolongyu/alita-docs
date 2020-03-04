import { Component, Listen, Prop, State, h } from "@stencil/core";
import { Checkmark, ForwardArrow, Logo, Translation } from "../../icons";
import { l10n } from "../../l10n";

@Component({
  tag: "docs-header",
  styleUrl: "header.css"
})
export class DocsHeader {
  @State() hidden = false;
  private frameRequested = false;
  private prevScroll = 0;

  @Prop() onToggleClick: (e: Event) => void;

  @Listen("scroll", { target: "window" })
  handleScroll() {
    if (!this.frameRequested) {
      requestAnimationFrame(() => {
        const { scrollY } = window;
        this.hidden = scrollY > 60 && scrollY > this.prevScroll;
        this.prevScroll = scrollY;
        this.frameRequested = false;
      });
      this.frameRequested = true;
    }
  }

  hostData() {
    return {
      class: { hidden: this.hidden }
    };
  }

  // renderMenu(section: 'Framework' | 'Framework v4' | 'Appflow' | 'Studio') {
  renderMenu(section: "Framework") {
    return [
      <docs-dropdown label={section}>
        <section>
          <stencil-route-link url="/docs/">
            Alita 2 {section === "Framework" ? <Checkmark /> : null}
          </stencil-route-link>
          {/* <stencil-route-link url="/docs/appflow">Appflow {section === 'Appflow' ? <Checkmark/> : null}</stencil-route-link>
          <a href="https://capacitor.ionicframework.com">Capacitor</a>
          <stencil-route-link url="/docs/studio">Studio {section === 'Studio' ? <Checkmark/> : null}</stencil-route-link> */}
        </section>
        {section === "Framework" ? (
          <section>
            <a href="https://umijs.org">{l10n.getString("based-on-umi")}</a>
            <a href="https://ionicframework.com/docs">
              {l10n.getString("built-with-ionic-doc")}
            </a>
          </section>
        ) : null}
      </docs-dropdown>,
      section === "Framework" ? (
        <div class="SectionNav-tabs">
          <stencil-route-link
            url="/docs/"
            // urlMatch={[
            //   /^\/docs(?!\/(api|components|cli|native|enterprise|config)).*$/
            // ]}
            urlMatch={[
              /^\/docs(?!\/(api|components|cli|enterprise|config)).*$/
            ]}
          >
            {l10n.getString("header-guide")}
          </stencil-route-link>
          <stencil-route-link
            url="/docs/config/config"
            urlMatch={["/docs/config/config", "/docs/config/runtime"]}
          >
            {l10n.getString("header-config")}
          </stencil-route-link>
          <stencil-route-link
            url="/docs/components/alita-layout"
            urlMatch={["/docs/api", "/docs/components"]}
          >
            {l10n.getString("header-components")}
          </stencil-route-link>
          {/* <stencil-route-link url="/docs/cli">
            {l10n.getString("header-cli")}
          </stencil-route-link> */}
          {/* <stencil-route-link
            url="/docs/native"
            urlMatch={["/docs/native", "/docs/enterprise"]}
          >
            {l10n.getString("header-native")}
          </stencil-route-link> */}
        </div>
      ) : null
    ];
  }

  render() {
    const { getString, getLocale } = l10n;
    const isEn = getLocale() === "en";
    return (
      <header>
        <docs-menu-toggle onClick={this.onToggleClick} />

        <stencil-route-link url="/docs/">
          <Logo class="HeaderLogo" />
        </stencil-route-link>

        <header-mobile-collapse>
          <nav class="SectionNav">
            <stencil-route-switch>
              {/* <stencil-route url="/docs/appflow">
                {this.renderMenu('Appflow')}
              </stencil-route>
              <stencil-route url="/docs/studio">
                {this.renderMenu('Studio')}
              </stencil-route> */}
              <stencil-route>{this.renderMenu("Framework")}</stencil-route>
            </stencil-route-switch>
          </nav>

          <nav class="UtilNav">
            {/* <ionic-search></ionic-search> */}
            <docs-dropdown label={getString("header-community")} align="right">
              <section>
                <a href="https://github.com/alitajs" target="_blank">
                  {getString("alita-community")}
                </a>
              </section>
              <section
                style={{
                  padding: "10px"
                }}
              >
                {/* <a href="https://forum.ionicframework.com/" target="_blank">Forum</a>
                <a href="http://ionicworldwide.herokuapp.com/" target="_blank">Slack</a>
                <a href="https://spectrum.chat/ionic" target="_blank">Spectrum</a>
                <a href="https://www.meetup.com/topics/ionic-framework/" target="_blank">Meetups</a> */}
                {getString("dingtalk")}
                <img src="/docs/assets/qrcode/dingding.png" />
              </section>
              <section
                style={{
                  padding: "10px"
                }}
              >
                {/* <a href="https://blog.ionicframework.com/" target="_blank">Blog</a>
                <a href="https://twitter.com/ionicframework" target="_blank">Twitter</a> */}
                {getString("wechat")}
                <img src="/docs/assets/qrcode/wechat.png" />
              </section>
            </docs-dropdown>
            <docs-dropdown label={getString("header-support")} align="right">
              <section>
                <a
                  href="https://github.com/alitajs/alita/issues"
                  target="_blank"
                >
                  {getString("alita-relevant")}
                </a>
              </section>
              <section>
                <a href="https://github.com/umijs/umi/issues" target="_blank">
                  {getString("umi-relevant")}
                </a>
                <a
                  href="https://github.com/ant-design/ant-design/issues"
                  target="_blank"
                >
                  {getString("antd-relevant")}
                </a>
                <a
                  href="https://github.com/ant-design/ant-design-pro/issues"
                  target="_blank"
                >
                  {getString("antd-pro-relevant")}
                </a>
              </section>
            </docs-dropdown>
            <docs-dropdown
              icon={Translation}
              align="right"
              label="Translations"
              class="label-sm-only"
            >
              <section>
                <a
                  href="https://alitajs.com/docs/zh/"
                  class={!isEn ? "link-active" : ""}
                >
                  中文
                  {!isEn && (
                    <svg viewBox="0 0 512 512" width="14">
                      <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z" />
                    </svg>
                  )}
                </a>
                <a
                  href="https://alitajs.com/docs/"
                  target="_blank"
                  class={isEn ? "link-active" : ""}
                >
                  英文
                  {isEn && (
                    <svg viewBox="0 0 512 512" width="14">
                      <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z" />
                    </svg>
                  )}
                </a>
              </section>
              {/* <section>
                <a href="https://ionicframework.com/translate" target="_blank">Translate</a>
              </section> */}
              {/* WIP Languages - included for pre-rendering, but hidden */}
              <div style={{ display: "none" }}>
                <a href="/docs/zh">Chinese</a>
                <a href="/docs/fr">French</a>
                <a href="/docs/pt">Portuguese</a>
                <a href="/docs/es">Spanish</a>
              </div>
            </docs-dropdown>
            <a href="https://github.com/alitajs/alita" target="_blank">
              <ion-icon name="logo-github" class="lg-only" />
              <span class="sm-only">
                GitHub <ForwardArrow class="Dropdown-arrow" />
              </span>
            </a>
            {/* <a href="https://twitter.com/ionicframework" target="_blank">
              <ion-icon name="logo-twitter" class="lg-only"></ion-icon>
              <span class="sm-only">Twitter <ForwardArrow class="Dropdown-arrow"/></span>
            </a> */}
          </nav>
        </header-mobile-collapse>
      </header>
    );
  }
}
