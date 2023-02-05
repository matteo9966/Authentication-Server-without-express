export interface DbLesson {
  id: number;
  description: string;
  longDescription: string;
  tags: string;
  duration: string;
  url: string;
  videoUrl?: string;
}
