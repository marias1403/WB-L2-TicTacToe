# WB-L2-TicTacToe
# Игра «Крестики-нолики»
Это небольшое веб-приложение, созданное с использованием HTML, CSS и JavaScript, чтобы предоставить вам возможность играть в классическую игру "крестики-нолики" на одном устройстве. Приложение также поддерживает дополнительные функции, такие как определение победителя, начало новой игры и (по желанию) выбор уровня сложности для компьютерного противника.
## Демо
https://marias1403.github.io/WB-L2-TicTacToe
## Дополнительные функции
### Выбор уровня сложности для компьютерного противника
Приложение позволяет играть двум игрокам на одном устройстве или против компьютерного противника. У компьютерного противника реализованы разные уровни сложности (простой и сложный режим).
### Сохранение прогресса в localStorage
Приложение поддерживает сохранение текущего прогресса игры в localStorage.
## Технические детали
Этот проект разработан с использованием чистого JavaScript, HTML и CSS.
## Зависимости
* Webpack: Используется для сборки проекта и управления зависимостями.
* Babel: Используется для компиляции современного JavaScript в совместимый с браузерами код.
* CSS-зависимости: Для обработки и оптимизации стилей.
* HTML-Webpack-Plugin: Генерирует HTML-файл, внедряя в него ссылки на собранные ресурсы.
## Инструкция по сборке
Следуйте этим шагам, чтобы собрать и запустить проект локально:
* Убедитесь, что у вас установлен Node.js и npm (Node Package Manager) на вашем компьютере. Если их нет, вы можете загрузить их с официального сайта Node.js.
* Склонируйте репозиторий на свой компьютер или скачайте его как ZIP-архив.
* Перейдите в директорию проекта с помощью командной строки.
* Установите зависимости проекта, выполнив следующую команду:
   ```bash
   npm install
  ```
* Теперь вы можете запустить сервер разработки с помощью команды:
* ```bash
   npm run dev
   ```
  Это запустит локальный сервер и приложение будет доступно по адресу http://localhost:8080. Приложение автоматически перезагрузится при внесении изменений в исходный код.
* Для создания финальной сборки приложения в режиме production выполните команду:
   ```bash
   npm run build
   ```
  Собранные файлы будут доступны в директории dist.
