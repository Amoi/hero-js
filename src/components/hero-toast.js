import HeroElement from './hero-element';

export default class HeroToast extends HeroElement {
  init() {
    this.$ = {
      div: this.shadowDom.querySelector('#hero-toast-wrap'),
  };
}

template() {
    return `
    <style type="text/css">
    * {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    @keyframes bounceInLeft {
        from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
        0% {opacity: 0;transform: translate3d(-3000px, 0, 0);}
        60% {opacity: 1;transform: translate3d(25px, 0, 0);}
        75% {transform: translate3d(-10px, 0, 0);}
        90% {transform: translate3d(5px, 0, 0);}
        100% {opacity: 1;transform: none;}
    }
    @keyframes bounceInRight {
        from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
        0% {opacity: 0;transform: translate3d(3000px, 0, 0);}
        60% {opacity: 1;transform: translate3d(-25px, 0, 0);}
        75% {transform: translate3d(10px, 0, 0);}
        90% {transform: translate3d(-5px, 0, 0);}
        100% {opacity: 1;transform: none;}
    }

    #hero-toast-wrap {
        position: absolute;
        width: 330px;
        height:auto;
    }

    .hero-toast-box {
        display: flex;
        width: 330px;
        padding: 14px 26px 14px 13px;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid #ebeef5;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
        margin-top: 10px;
        opacity: 0;
        overflow: hidden;
    }

    .fit-left-top {
        left: 10px;
        top: 10px;
        animation: bounceInLeft 0.5s 0.5s linear forwards;
    }

    .fit-left-bottom {
        left: 10px;
        bottom: 10px;
        animation: bounceInLeft 0.5s 0.5s linear forwards;
    }

    .fit-right-top {
        right: 10px;
        top: 10px;
        animation: bounceInRight 0.5s 0.5s linear forwards;
    }

    .fit-right-bottom {
        right: 10px;
        bottom: 10px;
        animation: bounceInRight 0.5s 0.5s linear forwards;
    }

    .hidden {
        display: none;
        opacity: 0;
    }
    </style>
    <div id="hero-toast-wrap"></div>
    `;
}

on(json) {
    // json.position : leftTop (default) || rightTop || leftBottom || rightBottom
    var position = json.position ? json.position : "leftTop";
    if (json.text && json.text.length > 0) {
        let heroToastItem = document.createElement("div");
        this.$.div.appendChild(heroToastItem);
        var style = {};
        var toastPos = "";
        switch (position) {
            case "leftTop":
            toastPos = "fit-left-top";
            style = {
                left: "10px",
                top: 0
            };
            break;
            case "rightTop":
            toastPos = "fit-right-top";
            style = {
                right: "10px",
                top: 0
            };
            break;
            case "leftBottom":
            toastPos = "fit-left-bottom";
            style = {
                left: "10px",
                bottom: "10px"
            };
            break;
            case "rightBottom":
            toastPos = "fit-right-bottom";
            style = {
                right: "10px",
                bottom: "10px"
            };
            break;
        }
        // add className
        heroToastItem.className += `hero-toast-box ${toastPos} hidden`;
        // change style
        for( var i in style) {
            this.$.div.style[i] = style[i];
        };
        // get childNodes Array
        this.$.p = this.$.div.childNodes;
        let len = this.$.p.length;
        // show and hidden item 
        for (let i = len-1; i >= 0; i--) {
            this.updateContent(this.$.p[len-1], json.text);
            this.$.p[len-1].classList.remove('hidden');
            var that = this;
            setTimeout(function () {
                that.$.p[len-i-1].classList.add('hidden'); 
            }, 3000);
        }
        }
    }
}
