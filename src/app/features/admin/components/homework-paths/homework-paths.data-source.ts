import { MatTableDataSource } from "@angular/material/table";
import { HomeworkPath } from "functions/src/models/homework-path.model";
import { BehaviorSubject } from "rxjs";
import { FirestoreDocumentService } from "src/app/core/services/firestore-document.service";

export class HomeworkPathsDataSource extends MatTableDataSource<HomeworkPath> {
  private dataSubject$ = new BehaviorSubject<HomeworkPath[]>([]);

  constructor(private firestoreDocumentService: FirestoreDocumentService) {
    super();

    this.firestoreDocumentService
      .getAllHomeworkPaths$()
      .subscribe((data: HomeworkPath[]) => {
        super.data = data;
      });
  }

  filterPredicate = (data: HomeworkPath, filter: string) => {
    const lowerCaseFilter = filter.toLowerCase();
    return isNaN(Number(filter))
      ? data.topic.toLowerCase().includes(lowerCaseFilter) ||
          data.assignments.some(assignment =>
            assignment.name.toLowerCase().includes(lowerCaseFilter)
          )
      : data.class === Number(filter);
  };
}
