import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import RevealMermaid from 'reveal.js-mermaid-plugin';

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
  margin: 0,
  slideNumber: 'c/t',
  mermaid: {
    theme: 'base',
    themeVariables: {
      primaryColor: '#ee0000',
      primaryTextColor: '#151515',
      primaryBorderColor: '#ee0000',
      lineColor: '#a3a3a3',
      secondaryColor: '#f0f0f0',
      tertiaryColor: '#ffffff',
      fontFamily: '"Red Hat Text", system-ui, sans-serif',
    },
    flowchart: { curve: 'basis' },
    timeline: { useMaxWidth: true },
  },
  plugins: [RevealNotes, RevealMarkdown, RevealHighlight, RevealMermaid],
});

deck.initialize();
