## Projekt na zaliczenie przedmiotu "Inteligencja Obliczeniowa"
### Temat: Labirynt - algorytm genetyczny vs algorytm A*
Pierwszym ważnym celem projektu jest napisanie algorytmu genetycznego, który z powodzeniem znajdowałby drogę w labiryncie. 
Należy opisać jakie ustawienia algorytmu genetycznego dają najlepsze wyniki.

Następnie w tej samej technologii należy napisać [algorytm A*](https://pl.wikipedia.org/wiki/Algorytm_A*) , 
który również nadaje się do znajdowania drogi w labiryncie (nie jest algorytmem genetycznym). 
Na każdym skrzyżowaniu w labiryncie zastanawia się, w którą stronę pójść. Wybór kierunku zależy od funkcji heurystycznej h(x). 
Wydaje się logiczne, by h(x) była odległością x od końca labiryntu.

Trzecim ważnym zadaniem jest porównanie efektywności obu algorytmów. 
Należy wygenerować kilka labiryntów o różnej wielkości np. kwadraty o boku długości 10,20,40,60,100. 

Następnie mierzymy czas działania obu algorytmów dla labiryntów różnych wielkości i nanosimy na wykres.

### Uruchomienie

Pobranie repozytorium i otwarcie pliku index.html.

*** UWAGA ***
Projekt może nie działać na starszych przeglądarkach!

### Zasada działania
#### Po uruchomieniu projektu należy:
1. wybrać rozmiar labiryntu, każdy z rozmiarów uwzględnia również pola na ściany zewnętrzne labiryntu, więc nasz algorytm poruszać się będzie w przestrzeni (x-2)^2
2. kliknąć 'Generuj labirynt', labirynt generowany jest za pomocą algorytmu First Deep Search,
3. za pomocą suwaka ustalić ilość genów w chromosomie, przy każdej zmianie rozmiaru labiryntu wartość suwaka jest zmieniana na minimalną ilość pól możliwą do przejścia danej wielkości labiryntu (ilość ta nie uwzględnia ścian, co oznacza, że ustawiając suwak na minimum, algorytm może nie znaleźć drogi),
4. Kliknąć 'Uruchom algorytm'
