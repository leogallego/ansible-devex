import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';

import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import '../css/redhat-theme.css';

const deck = new Reveal({
  hash: true,
  controls: true,
  progress: true,
  center: false,
  transition: 'slide',
  backgroundTransition: 'fade',
  width: 1280,
  height: 720,
  margin: 0.04,
  slideNumber: 'c/t',
  plugins: [RevealNotes],
});

deck.initialize();
