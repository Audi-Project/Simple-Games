import ArrowBeat from './arrow-beat';

const arrows = ['ArrowLeft', 'ArrowRight'];

export default class Game {
  constructor() {}

  #generateRandomArrow() {
    return arrows[Math.floor(Math.random() * arrows.length)];
  }

  generateBeats = () => {
    const array = [];

    for (let i = 0; i < 300; i++) {
      const arrow = this.#generateRandomArrow();

      array.push(new ArrowBeat(arrow, i));
    }

    return array;
  };
}
