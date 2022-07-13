
/**
 * @author  raizensoft.com
 */

import { Howl } from "howler";

import { Container, Texture } from "pixi.js";
import FireworkApp from "./FireworkApp";
import Particle from "./Particle";

const COUNT = 100;

/**
 * Firework 
 * @class Firework
 */
export default class Firework extends Container {

  tx:number;
  ty:number;
  app:FireworkApp;
  appHeight:number;
  plist:Particle[]; // Reference to particle list
  isDone:boolean;
  isLaunching:boolean;

  // Sound references
  soundWhistle:Howl;
  soundBang:Howl;

  constructor(app:FireworkApp, tx:number, ty:number) {

    super();
    this.app = app;
    this.tx = this.x = tx;
    this.ty = ty;
    this.appHeight = app.pa.screen.height;
    this.plist = [];
    this.isDone = false;
    this.isLaunching = true;
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  init() {

    // Init sounds
    this.soundWhistle = new Howl({
      src:['./assets/FireworkWhistle.mp3']
    });
    this.soundBang = new Howl({
      src:['./assets/FireworkBang.mp3']
    });

    // Generate particles
    const texlist = [
      Texture.from('assets/Particle1.png'), 
      Texture.from('assets/Particle2.png'), 
      Texture.from('assets/Particle3.png')];

    const pickTex = texlist[Math.floor(Math.random() * texlist.length)];
    for (let i = 0; i < COUNT; i++) {

      const p = new Particle(this, pickTex);
      this.addChild(p);
      this.plist.push(p);
    }

    // Initial position
    this.y = this.appHeight;
  }

  playSound() {

    this.soundWhistle.play();
    setTimeout(() => {
      this.soundBang.play();
    }, 400);
  }

  /**
   * Update this firework state
   */
  update(delta:number) {

    // Launch firework up to exploded point with easing
    if (this.isLaunching) {
      this.y += (this.ty - this.y) * 0.15;
      if (this.y - this.ty < 30) this.isLaunching = false;
      return;
    }

    if (this.isDone) return ;

    console.log('update');

    let fallCount = 0;

    //this.rotation += 0.01;
    this.plist.forEach((it) => {

      it.update(delta);
      if (it.y > this.appHeight) fallCount++;
    });
    if (fallCount == this.plist.length) {
      this.isDone = true;
    }
  }

}
