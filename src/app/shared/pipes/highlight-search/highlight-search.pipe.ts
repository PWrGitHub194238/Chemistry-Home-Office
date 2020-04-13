import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlightSearch"
})
export class HighlightSearchPipe implements PipeTransform {
  transform(input: string, searchTerm: string): string {
    if (searchTerm === "") {
      return input;
    }

    // Match in a case insensitive maneer
    const searchRegexp = new RegExp(searchTerm, "gi");
    const match = input.match(searchRegexp);

    if (!match) {
      return input;
    }

    return input.replace(searchRegexp, `<mark>${match[0]}</mark>`);
  }
}
