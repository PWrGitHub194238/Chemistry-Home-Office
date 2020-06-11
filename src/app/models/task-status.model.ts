export enum TaskStatus {
  ToReview,
  Reviewed,
  Accepted,
  Rejected
}

export const taskStatusToColor: Map<TaskStatus, string> = new Map([
  [TaskStatus.ToReview, "warn"],
  [TaskStatus.Reviewed, "warn"],
  [TaskStatus.Accepted, "basic"],
  [TaskStatus.Rejected, "basic"]
]);

export const taskStatusToClass: Map<TaskStatus, string> = new Map([
  [TaskStatus.ToReview, "icon-color icon-color-to-review"],
  [TaskStatus.Reviewed, "icon-color icon-color-reviewed"],
  [TaskStatus.Accepted, "icon-color icon-color-accepted"],
  [TaskStatus.Rejected, "icon-color icon-color-rejected"]
]);

export const taskStatusToString: Map<TaskStatus, string> = new Map([
  [TaskStatus.ToReview, "Do sprawdzenia"],
  [TaskStatus.Reviewed, "Sprawdzone"],
  [TaskStatus.Accepted, "Ocenione pozytywnie"],
  [TaskStatus.Rejected, "Do poprawy"]
]);
