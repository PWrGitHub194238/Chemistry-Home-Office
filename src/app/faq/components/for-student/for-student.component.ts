import { Component } from "@angular/core";
import { FaqPoint } from "../../model/faq-point.model";
import { getIcon } from "../../faq-helper.const";

@Component({
  selector: "cho-for-student",
  templateUrl: "./for-student.component.html",
  styleUrls: ["./for-student.component.scss"]
})
export class ForStudentComponent {
  public faqPoints: FaqPoint[] = [
    {
      icon: "fingerprint",
      header: `Zaloguj się na swoje konto ucznia <br />
        bądź stwórz nowe`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Aby mieć dostęp do aplikacji należy uzyskać dostęp poprzez stworzenie konta użytkownika.
          Aby to zrobić, wejdź na <a href="https://chemistry-home-office.firebaseapp.com/">stronę</a>, gdzie domyślnie zostaniesz przeniesiony na stronę logowania.`
        },
        {
          slideIndex: 1,
          description: `Jeżeli nie posiadasz konta użytkownika, przejdź do rejestracji klikając na <strong>zarejestruj się</strong>.`
        },
        {
          slideIndex: 2,
          description: `W formularzu podaj takie same dane, jakie są wpisane do dziennika szkolnego m.in. prawidłową nazwę klasy`
        },
        {
          slideIndex: 3,
          description: `oraz numer w dzienniku, który zostanie dopasowany do podanej wcześniej przez Ciebie klasy.`
        },
        {
          slideIndex: 5,
          description: `Jeśli wszystko pójdzie dobrze a podane dane okażą się prawidłowe, nowe konto zostanie stworzone a Ty przekierowany ponownie na stronę logowania.`
        }
      ],
      slideImages: [
        "assets/faq/1.jpg",
        "assets/faq/2.jpg",
        "assets/faq/register/1.jpg",
        "assets/faq/register/2.jpg",
        "assets/faq/register/3.jpg",
        "assets/faq/register/4.jpg"
      ]
    },
    {
      icon: "exit_to_app",
      header: `Logowanie przy użyciu kont społecznościowych`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Poza możliwością utworzenia nowego konta masz możliwość zalogować się za pomocą kont serwisów Facebook lub Google. 
          W celu zalogowania się przez któreś z wymienionych wybierz <strong>Zaloguj się przez Facebooka</strong> lub <strong>Zaloguj się przez Google</strong>.`
        },
        {
          slideIndex: 5,
          description: `Po zalogowaniu się dowolną z wymienionych metod zostaniesz poproszony o podanie dodatkowych danych jak: 
          adres e-mail (jeśli utworzyłeś konto przy pomocy numeru telefonu), Twoją klasę oraz numer w dzienniku.`
        },
        {
          slideIndex: 7,
          description: `Po podaniu wymaganych danych możesz zalogować się do aplikacji powtórnie wybierając którąś z dostępnych opcji: 
          <strong>Zaloguj się przez Facebooka</strong> lub <strong>Zaloguj się przez Google</strong>.`
        }
      ],
      slideImages: [
        "assets/faq/login/facebook/1.jpg",
        "assets/faq/login/google/1.jpg",
        "assets/faq/login/facebook/2.jpg",
        "assets/faq/login/google/2.jpg",
        "assets/faq/login/facebook/3.jpg",
        "assets/faq/login/facebook/4.jpg",
        "assets/faq/login/facebook/5.jpg",
        "assets/faq/login/facebook/6.jpg"
      ]
    },
    {
      icon: "assignment",
      header: `Przesyłanie zadań do nauczyciela`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po zalogowaniu się na stronie <a href="https://chemistry-home-office.firebaseapp.com/">stronę</a> zostaniesz przekierowany do wyboru lekcji, która została przypisana do Twojej klasy, 
          a do której chcesz przesłać wykonane zadania domowe.`
        },
        {
          slideIndex: 1,
          description: `Wybór lekcji spowoduje przejście do następnego kroku, w którym zostaniesz poproszony o przesłanie załączników z zadaniem domowym. 
          Załącznikami mogą być wykonane bezpośrednio z poziomu strony zdjęcia (${getIcon(
            "add_a_photo"
          )}) lub dowolne inne pliki (${getIcon("add_photo_alternate")}).`
        },
        {
          slideIndex: 5,
          description: `Niezależnie od wybranej opcji przekazania załącznika, po jego wybraniu aplikacja zaoferuje możliwość kontynuowania ich wybierania (${getIcon(
            "add_circle_outline"
          )}) lub wysłania wszystkich do tej pory wybranych załączników na skrzynkę pocztową nauczyciela (${getIcon(
            "send"
          )}).`
        },
        {
          slideIndex: 6,
          description: `Przesyłanie wybranych plików może zająć dużo czasu w zależności od ich liczby i rozmiaru. Po zakończeniu wysyłania na Twoją skrzynkę pocztową zostanie wysłany mail z potwierdzeniem wysłania zadania domowego do wybranej lekcji.`
        },
        {
          slideIndex: 7,
          description: `Aplikacja po zakończeniu wysyłania plików oraz wiadomości do nauczyciela wraz z załącznikami powróci do strony logowania.`
        }
      ],
      slideImages: [
        "assets/faq/send-basic/1.jpg",
        "assets/faq/send-basic/2.jpg",
        "assets/faq/send-basic/3.jpg",
        "assets/faq/send-basic/4a.jpg",
        "assets/faq/send-basic/4b.jpg",
        "assets/faq/send-basic/5.jpg",
        "assets/faq/send-basic/6.jpg",
        "assets/faq/send-basic/7.jpg"
      ]
    },
    {
      icon: "attachment",
      header: `Dodawanie większej liczby załączników`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Natychmiast po zalogowaniu i wybraniu lekcji zostanie wyświetlony panel, w którym należy wybrać jedno ze zdefiniowanych przez nauczyciela zadań domowych 
          a następnie sposób przekazania zdjęcia/pliku z wykonanym zadaniem (${getIcon(
            "add_a_photo"
          )}/${getIcon("add_photo_alternate")}).`
        },
        {
          slideIndex: 1,
          description: `Przykładowo po wybraniu opcji przesyłania zdjęć (${getIcon(
            "add_a_photo"
          )}) i wykonaniu go kliknięciem w dowolnym miejscu podglądu aparatu`
        },
        {
          slideIndex: 2,
          description: `aplikacja wróci do poprzedniego okna, tym razem dając możliwość przesłania kolejnego załącznika dowolną z metod (${getIcon(
            "add_circle_outline"
          )}) 
          lub też wysłania dotychczasowo wybranych załączników/wykonanych zdjęć (${getIcon(
            "send"
          )}).`
        },
        {
          slideIndex: 3,
          description: `W przypadku wybrania opcji dodawania kolejnych załączników (${getIcon(
            "add_circle_outline"
          )}) poprzez wybór ikony ${getIcon("more_horiz")}`
        },
        {
          slideIndex: 4,
          description: `aplikacja ponownie wraca do ekranu wyboru: przesyłania kolejnych załączników (${getIcon(
            "add_a_photo"
          )}/${getIcon(
            "add_photo_alternate"
          )}) lub wysyłania rozwiązanych zadań (${getIcon("send")}).`
        }
      ],
      slideImages: [
        "assets/faq/send-many/1.jpg",
        "assets/faq/send-many/2.jpg",
        "assets/faq/send-many/3.jpg",
        "assets/faq/send-many/4.jpg",
        "assets/faq/send-many/5.jpg",
        "assets/faq/send-many/6.jpg",
        "assets/faq/send-many/7.jpg"
      ]
    },
    {
      icon: "insert_comment",
      header: `Dodawanie opisu do załączników`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Do każdego z załączników można dodać dodatkowy opis załącznika, jego nazwę oraz typ zadania, którego będzie on dotyczył.`
        },
        {
          slideIndex: 1,
          description: `Wybranie ikony ${getIcon(
            "description"
          )} spowoduje otworzenie dodatkowego okna, w którym można wprowadzić dodatkowe informacje. 
          Będą one dotyczyć tylko wybranego następnie zdjęcia/pliku. Zostaną one dodane do treści wiadomości wysyłanej do nauczyciela.`
        }
      ],
      slideImages: [
        "assets/faq/add-description/1.jpg",
        "assets/faq/add-description/2.jpg",
        "assets/faq/add-description/3.jpg"
      ]
    }
  ];
}
