
/**
 * @author  raizensoft.com
 */

import { Application, Container} from "pixi.js";
import Firework from "./Firework";

const APP_WIDTH = 1000;
const APP_HEIGHT = 600;

/**
 * Firework 
 * @class Firework
 */
export default class FireworkApp {

  root:HTMLDivElement;
  pa:Application;
  flist:Firework[];


  constructor(root:HTMLDivElement) {

    this.root = root;
    this.flist = [];
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  init() {

    const pa = this.pa = new Application({width:APP_WIDTH, height:APP_HEIGHT, antialias:true, backgroundColor:0x111111});
    this.root.appendChild(pa.view);

    // App container
    const c = new Container();
    pa.stage.addChild(c);

    // Start update routine
    pa.ticker.add(this.update.bind(this));

    // Place firework on click event
    this.root.addEventListener('pointerdown', (e) => {

      const f = new Firework(this, e.offsetX, e.offsetY);
      f.playSound();
      c.addChild(f);
      this.flist.push(f);
    });
  }

  update(delta:number) {

    this.flist.forEach((it) => {
      it.update(delta);
    });
  }

}
