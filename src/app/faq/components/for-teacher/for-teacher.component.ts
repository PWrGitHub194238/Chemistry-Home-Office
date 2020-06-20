import { Component } from "@angular/core";
import { getIcon, getIconWithStateColor } from "../../helpers/faq-helper.const";
import { FaqPoint } from "../../model";

@Component({
  selector: "cho-for-teacher",
  templateUrl: "./for-teacher.component.html",
  styleUrls: ["./for-teacher.component.scss"]
})
export class ForTeacherComponent {
  public faqPoints: FaqPoint[] = [
    {
      icon: "privacy_tip",
      header: `Omówienie panelów administracyjnych`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po zalogowaniu się na konto z prawami administratora, zamiast zostać przekierowanymi do widoku wyboru lekcji/przesyłania zadań do nich,
          zostajemy przekierowani do panelu administracyjnego, składającego się z następujących paneli:`
        },
        {
          slideIndex: 0,
          description: `widoku pozwalającego na zarządzanie typami zadań domowych takich jak np. sprawdziany, kartkówki, 
          zadania dodatkowe, zadania domowe, notatki, sprawozdania (${getIcon(
            "assignment"
          )}),`
        },
        {
          slideIndex: 1,
          description: `panelu zarządzania klasami (${getIcon(
            "school"
          )}), gdzie dla każdej klasy można podać np. liczbę uczniów, dodać lub usunąć klasę. Podczas rejestracji uczniowie 
          będą mogli wprowadzić dane zgodne tylko dla zdefiniowanych w tym miejscu klas.`
        },
        {
          slideIndex: 2,
          description: `Zarówno przy definiowaniu typów zadań jak i definiowaniu lekcji dla uczniów możemy wykorzystać wybrany przez siebie zbiór ikon. 
          Zbiór aktywnych obrazków można zdefiniować wybierając ikonę ${getIcon(
            "color_lens"
          )}.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/1.jpg",
        "assets/faq/for-teacher/2.jpg",
        "assets/faq/for-teacher/3.jpg"
      ]
    },
    {
      icon: "privacy_tip",
      header: `Omówienie panelów administracyjnych`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Panel zdefiniowanych lekcji jest domyślnym widokiem po zalogowaniu na konto administratora (${getIcon(
            "work_outline"
          )}). W tym miejscu można: zdefiniować nową/zmienić istniejącą lekcję,
          dla każdej lekcji zdefiniować listę typów zadań czy też skopiować link do zdefiniowanych lekcji, by wysłać go uczniom.`
        },
        {
          slideIndex: 1,
          description: `Panel prac uczniów (${getIcon(
            "beenhere"
          )}) pozwala na przeglądanie przesłanych rozwiązań a także oceniać je. Każdy rodzaj plików można pobrać, 
          zdjęcia w dowolnym stopniu powiększać, zmniejszać oraz obracać.`
        },
        {
          slideIndex: 2,
          description: `W panelu przedmiotów lekcji (${getIcon(
            "menu_book"
          )}) można tworzyć, modyfikować lub usuwać przedmioty lekcji
          a także zdefiniować adresy mailowe nauczycieli, na które będą wysyłane wszystkie prace uczniów z danego przedmiotu.`
        },
        {
          slideIndex: 3,
          description: `Ostatni panel prezentuje dane o uczniach, którzy utworzyli w aplikacji konto. 
          Dla tych kont można wysłać stąd wiadomości e-mail dotyczące  m.in. zmiany hasła lub zmienić dane konta 
          takie jak przypisana klasa lub posiadane uprawnienia np. ucznia/administratora (${getIcon(
            "account_circle"
          )}).`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/4.jpg",
        "assets/faq/for-teacher/5.jpg",
        "assets/faq/for-teacher/6.jpg",
        "assets/faq/for-teacher/7.jpg"
      ]
    },
    {
      icon: "assignment",
      header: `Zdefiniowane zadania domowe`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "assignment"
          )}) można zarządzać predefiniowanymi rodzajami zadań, 
          które następnie będzie można zadać uczniom do wykonania w ramach lekcji. Kliknięcie na dowolne zadanie otwiera okno szczegółów wybranego zadania.`
        },
        {
          slideIndex: 2,
          description: `Typy zadań można filtrować poprzez wpisanie nazwy lub części nazwy zadania (${getIcon(
            "search"
          )}).`
        },
        {
          slideIndex: 4,
          description: `Po lewej stronie znajduje się panel z dostępnymi akcjami globalnymi, gdzie można dodać nowy typ zadania (${getIcon(
            "library_add"
          )}). W nowo otwartym oknie można podać nazwę dla tworzonego rodzaju zadania oraz wybrać dla niego odpowiednią ikonę, korzystając ze strzałek (${getIcon(
            "navigate_before"
          )}/${getIcon("navigate_next")}).`
        },
        {
          slideIndex: 9,
          description: `Każdy typ zadania można edytować (${getIcon(
            "edit"
          )}) bądź usunąć (${getIcon(
            "delete_outline"
          )}). Przed usunięciem administrator zostanie zapytany o potwierdzenie decyzji.
          W przypadku edycji typu zadania można zmienić zarówno nazwę typu zadania jak i przypisaną mu ikonę.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/assignment-dict/1.jpg",
        "assets/faq/for-teacher/assignment-dict/2.jpg",
        "assets/faq/for-teacher/assignment-dict/search/1.jpg",
        "assets/faq/for-teacher/assignment-dict/search/2.jpg",
        "assets/faq/for-teacher/assignment-dict/add/1.jpg",
        "assets/faq/for-teacher/assignment-dict/add/2.jpg",
        "assets/faq/for-teacher/assignment-dict/add/3.jpg",
        "assets/faq/for-teacher/assignment-dict/add/4.jpg",
        "assets/faq/for-teacher/assignment-dict/add/5.jpg",
        "assets/faq/for-teacher/assignment-dict/edit/1.jpg",
        "assets/faq/for-teacher/assignment-dict/edit/2.jpg",
        "assets/faq/for-teacher/assignment-dict/edit/3.jpg",
        "assets/faq/for-teacher/assignment-dict/edit/4.jpg",
        "assets/faq/for-teacher/assignment-dict/delete/1.jpg",
        "assets/faq/for-teacher/assignment-dict/delete/2.jpg"
      ]
    },
    {
      icon: "school",
      header: `Zdefiniowane klasy`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "school"
          )}) można zarządzać klasami, dla których można definiować lekcje a w ramach nich zadania do wykonania dla uczniów.
        Kliknięcie na dowolne zadanie otwiera okno szczegółów wybranego zadania.`
        },
        {
          slideIndex: 2,
          description: `Klasy można filtrować poprzez wpisanie nazwy klasy oraz jej numeru (${getIcon(
            "search"
          )}). Wyszukiwanie wielu wartości jednocześnie odbywa się poprzez rozdzielanie szukanych fraz znakiem spacji.`
        },
        {
          slideIndex: 5,
          description: `Po lewej stronie znajduje się panel z dostępnymi akcjami globalnymi, gdzie można dodać nową klasę (${getIcon(
            "library_add"
          )}). W nowo otwartym oknie można podać pełną nazwę klasy oraz liczbę uczniów (zdefiniować pulę numerów w dzienniku do wykorzystania przy rejestracji przez uczniów).`
        },
        {
          slideIndex: 9,
          description: `Każdą zdefiniowaną klasę można edytować (${getIcon(
            "edit"
          )}) bądź usunąć (${getIcon(
            "delete_outline"
          )}). Przed usunięciem administrator zostanie zapytany o potwierdzenie decyzji.
        W przypadku edycji klasy można zmienić zarówno nazwę klasy jak i liczbą jej uczniów.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/class-dict/1.jpg",
        "assets/faq/for-teacher/class-dict/2.jpg",
        "assets/faq/for-teacher/class-dict/search/1.jpg",
        "assets/faq/for-teacher/class-dict/search/2.jpg",
        "assets/faq/for-teacher/class-dict/search/3.jpg",
        "assets/faq/for-teacher/class-dict/add/1.jpg",
        "assets/faq/for-teacher/class-dict/add/2.jpg",
        "assets/faq/for-teacher/class-dict/add/3.jpg",
        "assets/faq/for-teacher/class-dict/add/4.jpg",
        "assets/faq/for-teacher/class-dict/edit/1.jpg",
        "assets/faq/for-teacher/class-dict/edit/2.jpg",
        "assets/faq/for-teacher/class-dict/edit/3.jpg",
        "assets/faq/for-teacher/class-dict/edit/4.jpg",
        "assets/faq/for-teacher/class-dict/delete/1.jpg",
        "assets/faq/for-teacher/class-dict/delete/2.jpg"
      ]
    },
    {
      icon: "color_lens",
      header: `Zdefiniowane ikony zadań`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "color_lens"
          )}) można zarządzać paletą ikon dostępnych do wyboru w aplikacji przy definiowaniu typów zadań.`
        },
        {
          slideIndex: 1,
          description: `Paletę ikon można filtrować poprzez wpisanie jej nazwy lub jej części (${getIcon(
            "search"
          )}). Nazwy ikon są w języku angielskim, ich pełną listę można znaleźć na <a href="https://material.io/resources/icons/?style=baseline">stronie</a>.`
        },
        {
          slideIndex: 3,
          description: `Do palety ikon nie można dodawać nowo zdefiniowanych ikon.
          Zamiast tego administrator ma do dyspozycji ponad 1100 ikon, które może w aplikacji aktywować 
          lub dezaktywować poprzez kliknięcie na żądaną ikonę. Aktywne ikony są podświetlane.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/mat-icon-dict/1.jpg",
        "assets/faq/for-teacher/mat-icon-dict/search/1.jpg",
        "assets/faq/for-teacher/mat-icon-dict/search/2.jpg",
        "assets/faq/for-teacher/mat-icon-dict/check/1.jpg",
        "assets/faq/for-teacher/mat-icon-dict/check/2.jpg",
        "assets/faq/for-teacher/mat-icon-dict/check/3.jpg",
        "assets/faq/for-teacher/mat-icon-dict/uncheck/1.jpg",
        "assets/faq/for-teacher/mat-icon-dict/uncheck/2.jpg",
        "assets/faq/for-teacher/mat-icon-dict/uncheck/3.jpg"
      ]
    },
    {
      icon: "work_outline",
      header: `Zdefiniowane lekcje`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "work_outline"
          )}) można zarządzać zdefiniowanymi lekcjami. Temat lekcji przypisany do konkretnej klasy stanowi podstawowy element aplikacji,
          do którego można przypisać dowolną liczbę typów zadań domowych do wykonania przez uczniów.`
        },
        {
          slideIndex: 1,
          description: `Podstawowy podział zdefiniowanych lekcji to podział na lekcje aktywne (${getIcon(
            "lock_open"
          )}) oraz ukryte (${getIcon(
            "lock"
          )}). Lekcje ukryte, dla których termin przesyłania zadań przez uczniów już minął, 
          nie będą dłużej wyświetlane ani dostępne dla uczniów i są one widoczne tylko w panelu administracyjnym.`
        },
        {
          slideIndex: 3,
          description: `W każdym wierszu przedstawione w postaci ikon są rodzaje zadań przypisane do danej lekcji.`
        },
        {
          slideIndex: 4,
          description: `Kliknięcie na dowolną lekcję spowoduje otworzenie okna ze szczegółami danej lekcji:
          <ul>
            <li>czy dana lekcja jest aktywna (${getIcon("lock_open")}/${getIcon(
            "lock"
          )}),</li>
            <li>przedmiotu, przypisanej klasy, nazwy lekcji,</li>
            <li>listy przypisanych zadań dla uczniów.</li>
          </ul>`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/homework-paths/1.jpg",
        "assets/faq/for-teacher/homework-paths/2.jpg",
        "assets/faq/for-teacher/homework-paths/3.jpg",
        "assets/faq/for-teacher/homework-paths/4.jpg",
        "assets/faq/for-teacher/homework-paths/5.jpg"
      ]
    },
    {
      icon: "work_outline",
      header: `Zdefiniowane lekcje - akcje`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `W obszarze zdefiniowanych akcji można: skopiować link do przesyłania zadań domowych do lekcji (${getIcon(
            "link"
          )}).
          Uczeń logujący się przez podany link zostanie od razu przekierowany do danej lekcji zamiast do okna ich wyboru, 
            gdzie będzie mógł wybrać dowolną lekcję, która jest aktywna oraz przypisana do jego klasy.`
        },
        {
          slideIndex: 4,
          description: `Zmienić szczegóły wybranej lekcji (${getIcon(
            "edit"
          )}) takie jak aktywność lekcji, przypisanie do przedmiotu, klasy, nazwę lekcji czy też liczbę oraz rodzaj przypisanych zadań.`
        },
        {
          slideIndex: 7,
          description: `Każdą zdefiniowaną lekcję można usunąć (${getIcon(
            "delete_outline"
          )}). Przed usunięciem administrator zostanie zapytany o potwierdzenie decyzji.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/homework-paths/actions/1.jpg",
        "assets/faq/for-teacher/homework-paths/actions/2.jpg",
        "assets/faq/for-teacher/homework-paths/actions/3.jpg",
        "assets/faq/for-teacher/homework-paths/actions/4.jpg",
        "assets/faq/for-teacher/homework-paths/actions/5.jpg",
        "assets/faq/for-teacher/homework-paths/actions/6.jpg",
        "assets/faq/for-teacher/homework-paths/actions/7.jpg",
        "assets/faq/for-teacher/homework-paths/actions/8.jpg",
        "assets/faq/for-teacher/homework-paths/actions/9.jpg",
        "assets/faq/for-teacher/homework-paths/actions/10.jpg"
      ]
    },
    {
      icon: "work_outline",
      header: `Zdefiniowane lekcje - dodawanie nowej lekcji`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Aby dodać nową lekcję, należy wybrać odpowiednią opcję z panelu akcji globalnych po lewej (${getIcon(
            "library_add"
          )}).
          Nowo otwarte okno - poza zdefiniowaniem podstawowych danych takich jak aktywność lekcji, przedmiot nauczania,
          przypisana klasa i nazwa lekcji - umożliwia także zdefiniowanie listy typów zadań do wykonania przez uczniów.`
        },
        {
          slideIndex: 2,
          description: `Listę tę można uzupełnić albo korzystając z predefiniowanych typów zadań (patrz <strong>Zdefiniowane zadania domowe</strong> (${getIcon(
            "assignment"
          )}), albo wprowadzając swoje własne zadania.`
        },
        {
          slideIndex: 4,
          description: `Niezależnie od tego, czy zadanie zostało wybrane z gotowej listy bądź nie, do każdego z nich można przypisać właściwą mu ikonę, korzystając ze strzałek ${getIcon(
            "navigate_before"
          )}/${getIcon(
            "navigate_next"
          )}. Lista dostępnych ikon jest definiowana w panelu <strong>Ikony</strong> (${getIcon(
            "color_lens"
          )}).`
        },
        {
          slideIndex: 9,
          description: `Po wprowadzeniu wszystkich informacji i kliknięciu przycisku <b>Dodaj lekcję</b>, zostanie ona zapisana.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/homework-paths/add/1.jpg",
        "assets/faq/for-teacher/homework-paths/add/2.jpg",
        "assets/faq/for-teacher/homework-paths/add/3.jpg",
        "assets/faq/for-teacher/homework-paths/add/4.jpg",
        "assets/faq/for-teacher/homework-paths/add/5.jpg",
        "assets/faq/for-teacher/homework-paths/add/6.jpg",
        "assets/faq/for-teacher/homework-paths/add/7.jpg",
        "assets/faq/for-teacher/homework-paths/add/8.jpg",
        "assets/faq/for-teacher/homework-paths/add/9.jpg",
        "assets/faq/for-teacher/homework-paths/add/10.jpg",
        "assets/faq/for-teacher/homework-paths/add/11.jpg",
        "assets/faq/for-teacher/homework-paths/add/12.jpg",
        "assets/faq/for-teacher/homework-paths/add/13.jpg",
        "assets/faq/for-teacher/homework-paths/add/14.jpg"
      ]
    },
    {
      icon: "beenhere",
      header: `Prace uczniów`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "beenhere"
          )}) można zarządzać przesłanymi przez uczniów zadaniami, pogrupowanymi według lekcji.
          W przypadku nierozwijania wierszy, prezentujących dane na temat lekcji, widok zawiera wszystkie, 
          zdefiniowane w panelu <string>zdefiniowane lekcje</strong> (${getIcon(
            "work_outline"
          )}), lekcje, do których przesłano chociaż jedno zadanie.`
        },
        {
          slideIndex: 2,
          description: `Na tym poziomie są powtórzone wszystkie najważniejsze informacje, które można znaleźć również we wspomnianym wcześniej panelu 
          <string>zdefiniowane lekcje</strong> (${getIcon(
            "work_outline"
          )}) - aktywność danej lekcji, czas jej zdefiniowania, nazwę, numer przypisanej klasy oraz listę zdefiniowanych dla niej zadań.
          W porównaniu do wspomnianego panelu, zmianie uległy tylko możliwe do podjęcia akcje - poprzez kliknięcie ikony ${getIcon(
            "remove_red_eye"
          )} można zobaczyć szczegóły lekcji, przycisk z symbolem ${getIcon(
            "expand_more"
          )} rozwija wewnętrzną listę dla danej lekcji, prezentując wszystkie przesłane przez uczniów zadania.
          `
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/sent-homework/1.jpg",
        "assets/faq/for-teacher/sent-homework/2.jpg",
        "assets/faq/for-teacher/sent-homework/3.jpg",
        "assets/faq/for-teacher/sent-homework/4.jpg",
        "assets/faq/for-teacher/sent-homework/5.jpg",
        "assets/faq/for-teacher/sent-homework/6.jpg"
      ]
    },
    {
      icon: "beenhere",
      header: `Prace uczniów`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Rozwinięta lista przesłanych zadań dla dowolnej lekcji zawiera takie informacje jak:
          <ul>
            <li>imię i nazwisko ucznia, który przesłał zadanie/zadania do lekcji,</li>
            <li>nazwę jego klasy, numer w dzienniku, czas wysłania</li>
            <li>oraz listę przesłanych plików z podziałem na rodzaj przesłanych prac, zdefiniowanych jako możliwe do wysłania na poziomie lekcji.
            Kolor każdej z ikon określa stan zadania. Możliwe stany to:
            <ul>
              <li>do sprawdzenia (${getIconWithStateColor(
                "api",
                "to-review"
              )}),</li>
              <li>sprawdzono (${getIconWithStateColor("api", "reviewed")}),</li>
              <li>sprawdzono i oceniono pozytywnie (${getIconWithStateColor(
                "api",
                "accepted"
              )}),</li>
              <li>sprawdzono, ale odesłano zadanie do poprawy (${getIconWithStateColor(
                "api",
                "rejected"
              )}).</li>
            </ul>
            </li>
          </ul>
          `
        },
        {
          slideIndex: 2,
          description: `Pierwsza ikona na panelu akcji (${getIcon(
            "rotate_right"
          )}) umożliwia przełączanie się kolejno przez wszystkie stany dla wszystkich przesłanych plików na raz.
          Bardziej precyzyjną kontrolę nad procesem oceniania prac administrator może mieć klikając na przycisk ${getIcon(
            "remove_red_eye"
          )} lub na poszczególne ikony zadań w wierszu.
          `
        },
        {
          slideIndex: 5,
          description: `Obie listy - zarówno tę zewnętrzną jak i te wewnętrzne - można filtrować poprzez wpisanie szeregu własności lekcji/przesłanych zadań (${getIcon(
            "search"
          )}). Wiąże się to z niektórymi ograniczeniami np. nie można zablokować wyszukiwania dla tylko jednego przedmiotu.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/sent-homework/7.jpg",
        "assets/faq/for-teacher/sent-homework/8.jpg",
        "assets/faq/for-teacher/sent-homework/9.jpg",
        "assets/faq/for-teacher/sent-homework/10.jpg",
        "assets/faq/for-teacher/sent-homework/11.jpg",
        "assets/faq/for-teacher/sent-homework/search/1.jpg",
        "assets/faq/for-teacher/sent-homework/search/2.jpg",
        "assets/faq/for-teacher/sent-homework/search/3.jpg"
      ]
    },
    {
      icon: "beenhere",
      header: `Prace uczniów - przegląd i ocenianie prac`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Każdy wiersz przedstawiający zadanie wysłane przez ucznia zawiera listę ikon, reprezentującą wszystkie wysłane przez niego pliki.
          Najechanie na dowolny z nich myszką wyświetli szczegóły pliku - o ile te są dostępne - m. in. nazwę pliku, opcjonalny opis, który uczeń może dodać w czasie wybierania plików do wysłania
          oraz aktualny stan pliku, związany z oceną całości zadania.
          `
        },
        {
          slideIndex: 1,
          description: `Kliknięcie w którąkolwiek z ikon otwiera galerię, która - w przypadku załączników będącymi plikami graficznymi - pozwoli na ich podgląd,
          obracanie w obie strony (${getIcon("rotate_left")}/${getIcon(
            "rotate_right"
          )}), zmniejszanie (${getIcon("zoom_out")}), powiększanie (${getIcon(
            "zoom_in"
          )}) oraz lustrzane odbijanie w osi pionowej (${getIcon("flip")}).
          `
        },
        {
          slideIndex: 7,
          description: `Dodatkowo plik może być otworzony w nowej zakładce z wykorzystaniem bezpośredniego łącza do pliku. tą drogą plik może zostać pobrany, niezależnie od jego formatu.
          Podgląd plików z tego poziomu nie umożliwia zmian ich oceny - aby to zrobić, należy wejść w szczegóły zadania (${getIcon(
            "remove_red_eye"
          )}).
          `
        },
        {
          slideIndex: 9,
          description: `Natomiast jeśli wszystkie załączniki składają się np. na pojedyncze zadanie, wtedy przy pomocy ikony ${getIcon(
            "rotate_right"
          )} można zmienić stan wszystkich plików jednocześnie z poziomu wiersza w tabeli.
          `
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/sent-homework/edit/1.jpg",
        "assets/faq/for-teacher/sent-homework/edit/2.jpg",
        "assets/faq/for-teacher/sent-homework/edit/3.jpg",
        "assets/faq/for-teacher/sent-homework/edit/4.jpg",
        "assets/faq/for-teacher/sent-homework/edit/5.jpg",
        "assets/faq/for-teacher/sent-homework/edit/6.jpg",
        "assets/faq/for-teacher/sent-homework/edit/7.jpg",
        "assets/faq/for-teacher/sent-homework/edit/8.jpg",
        "assets/faq/for-teacher/sent-homework/edit/9.jpg",
        "assets/faq/for-teacher/sent-homework/edit/10.jpg"
      ]
    },
    {
      icon: "beenhere",
      header: `Prace uczniów - przegląd i ocenianie prac`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Ten sam widok podglądu załączników można otworzyć poprzez otworzenie szczegółów danego przesłanego zadania (${getIcon(
            "remove_red_eye"
          )}) a następnie wybraniu dowolnego z wyświetlonych załączników - tym razem administrator dodatkowo zyskuje wygodną możliwość przechodzenia między plikami, zmianę stanu każdego pliku z osobna bezpośrednio z ich podglądu oraz ich pobrania na dysk (${getIcon(
            "play_for_work"
          )}).
          `
        },
        {
          slideIndex: 8,
          description: `Zmiany stanu plików można również dokonać bezpośrednio z okna podglądu szczegółów przesłanego zadania, gdzie administrator, poza listą załączników, ma wgląd w takie dane jak:
          <ul>
            <li>imię i nazwisko ucznia, który przesłał zadanie/zadania do lekcji,</li>
            <li>nazwę jego klasy, numer w dzienniku oraz czas wysłania plików.</li>
          </ul>
          `
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/sent-homework/edit/11.jpg",
        "assets/faq/for-teacher/sent-homework/edit/12.jpg",
        "assets/faq/for-teacher/sent-homework/edit/13.jpg",
        "assets/faq/for-teacher/sent-homework/edit/14.jpg",
        "assets/faq/for-teacher/sent-homework/edit/15.jpg",
        "assets/faq/for-teacher/sent-homework/edit/16.jpg",
        "assets/faq/for-teacher/sent-homework/edit/17.jpg",
        "assets/faq/for-teacher/sent-homework/edit/18.jpg",
        "assets/faq/for-teacher/sent-homework/edit/19.jpg",
        "assets/faq/for-teacher/sent-homework/edit/20.jpg",
        "assets/faq/for-teacher/sent-homework/edit/21.jpg"
      ]
    },
    {
      icon: "menu_book",
      header: `Przedmioty lekcji`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "menu_book"
          )}) można zarządzać przedmiotami lekcji. Kliknięcie na dowolne zadanie otwiera okno szczegółów wybranej lekcji.`
        },
        {
          slideIndex: 1,
          description: `Lekcje można filtrować poprzez wpisanie nazwy lub części nazwy przedmiotu lekcji (${getIcon(
            "search"
          )}).`
        },
        {
          slideIndex: 3,
          description: `Po lewej stronie znajduje się panel z dostępnymi akcjami globalnymi, gdzie można dodać nowy przedmiot lekcji (${getIcon(
            "library_add"
          )}). W nowo otwartym oknie można podać nazwę lekcji oraz adres e-mail, na który będą wysyłane wszystkie zadania uczniów do lekcji, które będą przypisane do nowego przedmiotu lekcji.`
        },
        {
          slideIndex: 7,
          description: `Każdą lekcję można edytować (${getIcon(
            "edit"
          )}) bądź usunąć (${getIcon(
            "delete_outline"
          )}). Przed usunięciem administrator zostanie zapytany o potwierdzenie decyzji.
          W przypadku edycji lekcji można zmienić zarówno jej nazwę jak i adres e-mail.
          Jeżeli w wyniku edycji zostanie zmieniony adres e-mail, administrator ma możliwość wysłać na obydwa adresy powiadomienia o zmianie.
          Na stare konto pocztowe nie będą już przekierowywane e-maile o wysłanych zadaniach.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/subject-dict/1.jpg",
        "assets/faq/for-teacher/subject-dict/search/1.jpg",
        "assets/faq/for-teacher/subject-dict/search/2.jpg",
        "assets/faq/for-teacher/subject-dict/add/1.jpg",
        "assets/faq/for-teacher/subject-dict/add/2.jpg",
        "assets/faq/for-teacher/subject-dict/add/3.jpg",
        "assets/faq/for-teacher/subject-dict/add/4.jpg",
        "assets/faq/for-teacher/subject-dict/edit/1.jpg",
        "assets/faq/for-teacher/subject-dict/edit/2.jpg",
        "assets/faq/for-teacher/subject-dict/edit/3.jpg",
        "assets/faq/for-teacher/subject-dict/edit/4.jpg",
        "assets/faq/for-teacher/subject-dict/edit/5.jpg",
        "assets/faq/for-teacher/subject-dict/edit/6.jpg",
        "assets/faq/for-teacher/subject-dict/delete/1.jpg",
        "assets/faq/for-teacher/subject-dict/delete/2.jpg"
      ]
    },
    {
      icon: "account_circle",
      header: `Uczniowie`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po otworzeniu panelu (${getIcon(
            "account_circle"
          )}) można zarządzać kontami użytkowników aplikacji. Kliknięcie na dowolne zadanie otwiera okno szczegółów wybranego zadania.
          Z tego miejsca do każdego użytkownika można wysłać wiadomość e-mail z przypomnieniem hasła (${getIcon(
            "replay"
          )}) lub z prośbą o weryfikację danego adresu (${getIcon(
            "verified_user"
          )}).`
        },
        {
          slideIndex: 8,
          description: `konta użytkowników można filtrować poprzez wpisanie imienia, nazwiska bądź numeru w dzienniku przypisanego do ucznia (${getIcon(
            "search"
          )}).`
        },
        {
          slideIndex: 8,
          description: `Każde konto użytkownika można edytować (${getIcon(
            "edit"
          )}) bądź usunąć (${getIcon(
            "delete_outline"
          )}). Przed usunięciem administrator zostanie zapytany o potwierdzenie decyzji.
          W przypadku edycji konta użytkownika można zmienić zarówno podstawowe dane konta jak imię, nazwisko, klasę i numer dziennika
          jak i nadać, odebrać uprawnienia konta, aktywować bądź zdeaktywować dane konto.`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/user-details/1.jpg",
        "assets/faq/for-teacher/user-details/2.jpg",
        "assets/faq/for-teacher/user-details/3.jpg",
        "assets/faq/for-teacher/user-details/4.jpg",
        "assets/faq/for-teacher/user-details/5.jpg",
        "assets/faq/for-teacher/user-details/6.jpg",
        "assets/faq/for-teacher/user-details/7.jpg",
        "assets/faq/for-teacher/user-details/8.jpg",
        "assets/faq/for-teacher/user-details/search/1.jpg",
        "assets/faq/for-teacher/user-details/search/2.jpg",
        "assets/faq/for-teacher/user-details/edit/1.jpg",
        "assets/faq/for-teacher/user-details/edit/2.jpg",
        "assets/faq/for-teacher/user-details/edit/3.jpg",
        "assets/faq/for-teacher/user-details/edit/4.jpg",
        "assets/faq/for-teacher/user-details/edit/5.jpg",
        "assets/faq/for-teacher/user-details/delete/1.jpg",
        "assets/faq/for-teacher/user-details/delete/2.jpg"
      ]
    },
    {
      icon: "account_circle",
      header: `Uczniowie`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `W przypadku kont, które zostały stworzone przy użyciu adresu e-mail, ale użytkownik danego konta nie aktywował go jeszcze, można na wskazany adres e-mail ponownie wysłać link aktywacyjny (${getIcon(
            "verified_user"
          )}).`
        },
        {
          slideIndex: 2,
          description: `Jeśli użytkownik zapomni hasło, administrator ma możliwość wysłania wiadomości e-mail z łączem do resetowania go (${getIcon(
            "replay"
          )}). Użytkownik ma także możliwość zresetowania swojego hasła sam poprzez odpowiednią stronę, dostępną ze stron logowania lub rejestracji konta (${getIcon(
            "admin_panel_settings"
          )}).`
        }
      ],
      slideImages: [
        "assets/faq/for-teacher/user-details/verify/1.jpg",
        "assets/faq/for-teacher/user-details/verify/2.jpg",
        "assets/faq/for-teacher/user-details/reset-password/1.jpg",
        "assets/faq/for-teacher/user-details/reset-password/2.jpg",
        "assets/faq/for-student/reset-password/1.jpg",
        "assets/faq/for-student/reset-password/2.jpg",
        "assets/faq/for-student/reset-password/3.jpg",
        "assets/faq/for-student/reset-password/4.jpg",
        "assets/faq/for-student/reset-password/5.jpg"
      ]
    }
  ];
}
