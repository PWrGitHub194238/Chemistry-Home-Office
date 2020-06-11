import { HomeworkPath, SentHomework } from "src/app/models";

export interface SentHomeworksForPath extends HomeworkPath {
  sentHomeworks: SentHomework[];
}
