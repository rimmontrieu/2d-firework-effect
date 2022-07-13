
/**
 * @author  raizensoft.com
 */

import { BLEND_MODES, Sprite, Texture } from "pixi.js";
import Firework from "./Firework";

const GRAVITY = 0.15;
const RANGE_VX = 8;
const RANGE_VY = 4;

/**
 * Particle
 * @class Particle
 */
export default class Particle extends Sprite {

  fw:Firework;
  vx:number;
  vy:number;

  constructor(fw:Firework, tex:Texture) {

    super(tex);
    this.fw = fw;
    this.anchor.set(0.5);
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  init() {

    this.blendMode = BLEND_MODES.ADD;
    this.reset();
  }

  /**
   * Update particle position and opacity
   */
  update(delta:number) {

    this.vy += GRAVITY;
    this.y += this.vy;
    this.x += this.vx;
    this.scale.x -= 0.003;
    this.scale.y -= 0.003;
  }

  /**
   * Reset particle state
   */
  reset() {

    this.vx = Math.random() * RANGE_VX - RANGE_VX * 0.5;
    this.vy = Math.random() * RANGE_VY - RANGE_VY * 2;
  }

}
