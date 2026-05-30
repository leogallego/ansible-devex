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
      fontSize: '16px',
      cScale0: '#ee0000',
      cScale1: '#cc0000',
      cScale2: '#aa0000',
      cScale3: '#880000',
      cScale4: '#660000',
      cScale5: '#ee0000',
      cScale6: '#cc0000',
      cScale7: '#aa0000',
      cScale8: '#880000',
      cScale9: '#660000',
      cScale10: '#ee0000',
      cScale11: '#cc0000',
      cScaleLabel0: '#ffffff',
      cScaleLabel1: '#ffffff',
      cScaleLabel2: '#ffffff',
      cScaleLabel3: '#ffffff',
      cScaleLabel4: '#ffffff',
      cScaleLabel5: '#ffffff',
      cScaleLabel6: '#ffffff',
      cScaleLabel7: '#ffffff',
      cScaleLabel8: '#ffffff',
      cScaleLabel9: '#ffffff',
      cScaleLabel10: '#ffffff',
      cScaleLabel11: '#ffffff',
    },
    flowchart: { curve: 'basis', useMaxWidth: true, htmlLabels: true },
    timeline: { useMaxWidth: true },
  },
  plugins: [RevealNotes, RevealMarkdown, RevealHighlight, RevealMermaid],
});

deck.initialize();
