declare module 'inkjs' {
  class Story {
    constructor(storyContent: any);
  }

  export interface Choice {
    index: number;
    text: string;
  }
}
