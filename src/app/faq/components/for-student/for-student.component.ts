import { Component } from "@angular/core";
import { getIcon } from "../../helpers/faq-helper.const";
import { FaqPoint } from "../../model";

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
          Aby to zrobić, wejdź na <a href="https://chemistry-home-office.firebaseapp.com/">stronę</a>, gdzie domyślnie zostaniemy przeniesieni na stronę logowania.`
        },
        {
          slideIndex: 1,
          description: `Jeżeli nie posiadamy konta użytkownika, można przejść do rejestracji, klikając na <strong>zarejestruj się</strong>.`
        },
        {
          slideIndex: 2,
          description: `W formularzu należy podać takie same dane, jakie są wpisane do dziennika szkolnego m.in. prawidłową nazwę klasy`
        },
        {
          slideIndex: 3,
          description: `oraz numer w dzienniku, który zostanie dopasowany do podanej wcześniej klasy.`
        },
        {
          slideIndex: 5,
          description: `Jeśli wszystko pójdzie dobrze a podane dane okażą się prawidłowe, nowe konto zostanie stworzone 
          a użytkownik przeniesiony pponownie na stronę logowania.`
        }
      ],
      slideImages: [
        "assets/faq/for-student/1.jpg",
        "assets/faq/for-student/2.jpg",
        "assets/faq/for-student/register/1.jpg",
        "assets/faq/for-student/register/2.jpg",
        "assets/faq/for-student/register/3.jpg",
        "assets/faq/for-student/register/4.jpg"
      ]
    },
    {
      icon: "exit_to_app",
      header: `Logowanie przy użyciu kont społecznościowych`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Poza możliwością utworzenia nowego konta istnieje możliwość zalogować się za pomocą kont serwisów Facebook lub Google. 
          W celu zalogowania się przez któreś z wymienionych należy wybrać <strong>Zaloguj się przez Facebooka</strong> lub <strong>Zaloguj się przez Google</strong>.`
        },
        {
          slideIndex: 5,
          description: `Po zalogowaniu się dowolną z wymienionych metod jesteśmy proszeni o podanie dodatkowych danych jak: 
          adres e-mail (jeśli konto zostało utworzone przy pomocy numeru telefonu), klasę oraz numer w dzienniku.`
        },
        {
          slideIndex: 7,
          description: `Po podaniu wymaganych danych można zalogować się do aplikacji powtórnie wybierając którąś z dostępnych opcji: 
          <strong>Zaloguj się przez Facebooka</strong> lub <strong>Zaloguj się przez Google</strong>.`
        }
      ],
      slideImages: [
        "assets/faq/for-student/login/facebook/1.jpg",
        "assets/faq/for-student/login/google/1.jpg",
        "assets/faq/for-student/login/facebook/2.jpg",
        "assets/faq/for-student/login/google/2.jpg",
        "assets/faq/for-student/login/facebook/3.jpg",
        "assets/faq/for-student/login/facebook/4.jpg",
        "assets/faq/for-student/login/facebook/5.jpg",
        "assets/faq/for-student/login/facebook/6.jpg"
      ]
    },
    {
      icon: "admin_panel_settings",
      header: `Resetowanie hasła w przypadku jego utraty`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `W przypadku zapomnienia hasła i braku możliwości zalogowania się na swoje konto,
          można odzyskać dostęp do niego z poziomu panelu logowania/rejestracji poprzez wybór ikony (${getIcon(
            "admin_panel_settings"
          )}).`
        },
        {
          slideIndex: 4,
          description: `Po wprowadzeniu adresu e-mail, na który zostało zarejestrowane konto,
          na wskazany adres zostanie wysłana wiadomość z łączem kierującym do formularza resetującego hasło do konta.`
        }
      ],
      slideImages: [
        "assets/faq/for-student/reset-password/1.jpg",
        "assets/faq/for-student/reset-password/2.jpg",
        "assets/faq/for-student/reset-password/3.jpg",
        "assets/faq/for-student/reset-password/4.jpg",
        "assets/faq/for-student/reset-password/5.jpg"
      ]
    },
    {
      icon: "assignment",
      header: `Przesyłanie zadań do nauczyciela`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Po zalogowaniu się na <a href="https://chemistry-home-office.firebaseapp.com/home/login">stronie</a>
          jesteśmy przekierowywani do wyboru jednej z lekcji, które zostały przypisana do wybranmej przy rejestracji klasy ucznia,
          a do której chcemy przesłać wykonane zadania domowe.`
        },
        {
          slideIndex: 1,
          description: `Wybór lekcji spowoduje przejście do następnego kroku, w którym jesteśmy proszeni o przesłanie załączników z zadaniem domowym. 
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
          description: `Przesyłanie wybranych plików może zająć dużo czasu w zależności od ich liczby i rozmiaru.
          Po zakończeniu wysyłania na skrzynkę pocztową zalogowanego użytkownika zostanie wysłana wiadomość e-mail
          z potwierdzeniem wysłania zadania domowego do wybranej lekcji.`
        },
        {
          slideIndex: 7,
          description: `Aplikacja po zakończeniu wysyłania plików oraz wiadomości do nauczyciela wraz z załącznikami powróci do strony logowania.`
        }
      ],
      slideImages: [
        "assets/faq/for-student/send-basic/1.jpg",
        "assets/faq/for-student/send-basic/2.jpg",
        "assets/faq/for-student/send-basic/3.jpg",
        "assets/faq/for-student/send-basic/4a.jpg",
        "assets/faq/for-student/send-basic/4b.jpg",
        "assets/faq/for-student/send-basic/5.jpg",
        "assets/faq/for-student/send-basic/6.jpg",
        "assets/faq/for-student/send-basic/7.jpg"
      ]
    },
    {
      icon: "attachment",
      header: `Dodawanie większej liczby załączników`,
      bulletPoints: [
        {
          slideIndex: 0,
          description: `Natychmiast po zalogowaniu i wybraniu lekcji zostanie wyświetlony panel,
          w którym należy wybrać jedno ze zdefiniowanych przez nauczyciela zadań domowych 
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
        "assets/faq/for-student/send-many/1.jpg",
        "assets/faq/for-student/send-many/2.jpg",
        "assets/faq/for-student/send-many/3.jpg",
        "assets/faq/for-student/send-many/4.jpg",
        "assets/faq/for-student/send-many/5.jpg",
        "assets/faq/for-student/send-many/6.jpg",
        "assets/faq/for-student/send-many/7.jpg"
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
        "assets/faq/for-student/add-description/1.jpg",
        "assets/faq/for-student/add-description/2.jpg",
        "assets/faq/for-student/add-description/3.jpg"
      ]
    }
  ];
}
