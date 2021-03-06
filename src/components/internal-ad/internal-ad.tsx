import { Component, Listen, State, h } from '@stencil/core';
// import PrismicDOM from 'prismic-dom';

// import { trackClick, trackView } from './tracking-service';
import { trackView } from './tracking-service';
import { getAd } from './ad-service';

@Component({
  tag: 'internal-ad',
  styleUrl: 'internal-ad.css'
})
export class InternalAd {
  @State() ad: any;

  timeout: ReturnType<typeof setTimeout>;

  constructor() {
    this.update();
  }

  // force an update on page change in case the component is reused
  @Listen('pageChanged', { target: 'body' })
  async update() {
    this.ad = await getAd();
    // give the page a chance to reflow
    this.timeout = setTimeout(() => {
      trackView(this.ad.ad_id);
    }, 50);
  }

  disconnectedCallback() {
    // if the reflowed page doesn't have an ad, don't fire view events
    clearTimeout(this.timeout);
  }

  render() {
    return (<div>
      <a href="https://umijs.org"
        target="_blank"
      >
        <picture>
          <source media="(min-width: 37.5em)" src="/assets/ad/umi3banner.jpeg" />
          {/* <source src={this.ad.ad_image['1x'].url}/> */}
          <img src="/assets/ad/umi3banner.jpeg"
            alt='发布UMI3,插件化的企业级前端应用框架'
            //  height={1042}
            width={240} />
          <p style={{ textAlign: "center" }}>发布UMI3,插件化的企业级前端应用框架</p>
        </picture>
      </a>
      <br />
      <a href="https://d.umijs.org/"
        target="_blank"
      >
        <picture>
          <source media="(min-width: 37.5em)" src="/assets/ad/dumi.jpeg" />
          {/* <source src={this.ad.ad_image['1x'].url}/> */}
          <img src="/assets/ad/dumi.jpeg"
            alt='dumi，你崭新的 React 组件开发和文档编写利器'
            //  height={1042}
            width={240} />
          <p style={{ textAlign: "center" }}>dumi，你崭新的 React 组件开发和文档编写利器</p>
        </picture>
      </a>
      <br />
      <a href="https://www.docschina.org/"
        target="_blank"
      >
        <picture>
          <source media="(min-width: 37.5em)" src="/assets/ad/docschina.jpeg" />
          {/* <source src={this.ad.ad_image['1x'].url}/> */}
          <img src="/assets/ad/docschina.jpeg"
            alt='印记中文官方公众号'
            //  height={1042}
            width={240} />
          <p style={{ textAlign: "center" }}>印记中文官方公众号</p>
        </picture>
      </a>
    </div>
    );
    // if (!this.ad || Object.keys(this.ad).length === 0) return;

    // return (
    //   <a href={this.ad.ad_url.url}
    //      target={this.ad.ad_url.target}
    //      onClick={e => trackClick(this.ad.ad_id, e)}>
    //     {/* Reponsive image since Prismic supports it out of the box */}
    //     <picture>
    //       <source media="(min-width: 37.5em)" src={this.ad.ad_image.url}/>
    //       <source src={this.ad.ad_image['1x'].url}/>
    //       <img src={this.ad.ad_image.url}
    //            alt={this.ad.ad_image.alt}
    //            height={this.ad.ad_image['1x'].dimensions.height}
    //            width={this.ad.ad_image['1x'].dimensions.width} />
    //       <p>{this.ad.ad_image.alt}</p>
    //     </picture>
    //     <div innerHTML={PrismicDOM.RichText.asHtml(this.ad.ad_copy)}></div>
    //   </a>
    // );
  }
}
