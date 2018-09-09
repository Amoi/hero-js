import HeroElement from './hero-element';

export default class HeroImageView extends HeroElement {

  init() {
    this.$ = {
      img: this.shadowDom.querySelector('img')
    }
  }

  template(){
    return `
      <style type="text/css">
        img {margin: 0px;padding: 0px;width: 100%;height: 100%;border: 0px;}
      </style>    
      <img />
    `;
  }

  on(json) {
    if(json.base64image || json.image){
      this.$.img.src = json.base64image || json.image;
    }
  }
}