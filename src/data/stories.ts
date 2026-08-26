import { PipDialogue } from '../types/pip';

export const stories: Record<string, PipDialogue[]> = {
  welcome: [
    { text: "Hello there! I'm Pip, your lab assistant.", expression: 'happy', duration: 3000 },
    { text: "Today we are going to learn about the incredible world of MATERIALS!", expression: 'excited', duration: 4000 },
    { text: "Are you ready to explore the laboratory?", expression: 'curious', nextAction: 'interact' }
  ],
  origins_intro: [
    { text: "Everything around us is made of something.", expression: 'thinking', duration: 3000 },
    { text: "Some things come directly from nature...", expression: 'pointing', duration: 3000 },
    { text: "...and other things are invented by humans in labs just like this one!", expression: 'excited', duration: 4000 }
  ],
  fibres_intro: [
    { text: "Look closely at your clothes.", expression: 'curious', duration: 3000 },
    { text: "They are made of tiny threads called fibres.", expression: 'pointing', duration: 3000 },
    { text: "Let's investigate where these fibres come from!", expression: 'happy', nextAction: 'interact' }
  ],
  burn_test_warning: [
    { text: "Warning! We are about to use fire.", expression: 'worried', duration: 3000 },
    { text: "In a real lab, you must always wear safety goggles and have an adult present.", expression: 'worried', duration: 4000 },
    { text: "But here in our virtual lab, it's completely safe. Let's observe what happens!", expression: 'happy', duration: 4000 }
  ],
  plastic_melting: [
    { text: "Oh my!", expression: 'surprised', duration: 2000 },
    { text: "Did you see how the synthetic fibre melted instead of burning to ash?", expression: 'pointing', duration: 4000 },
    { text: "Imagine if you were wearing that near a hot stove! It would melt and stick to your skin.", expression: 'worried', duration: 5000 }
  ],
  celebration: [
    { text: "Brilliant! You figured it out!", expression: 'celebrating', duration: 3000 },
    { text: "You're becoming a true materials scientist.", expression: 'proud', duration: 3000 }
  ],
  hint_level_1: [
    { text: "Hmm, let's think about where this material comes from.", expression: 'thinking', duration: 3000 }
  ],
  hint_level_2: [
    { text: "Was it made by a plant or animal, or in a factory?", expression: 'curious', duration: 3000 }
  ]
};
