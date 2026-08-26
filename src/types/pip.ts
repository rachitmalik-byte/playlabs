export type PipExpression = 'curious' | 'confused' | 'thinking' | 'excited' | 'worried' | 'surprised' | 'happy' | 'proud' | 'sleepy' | 'celebrating' | 'pointing' | 'silent';

export type PipDialogue = {
  text: string;
  expression: PipExpression;
  duration?: number;
  nextAction?: 'wait' | 'auto' | 'interact';
};

export type PipHintLevel = 1 | 2 | 3 | 4;
