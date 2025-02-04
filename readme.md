Собрать образ:
docker build -t vitest-runner .

Запустите тесты:
docker run --rm -it vitest-runner

Для разработки с автоматическим обновлением файлов:
# Запуск с монтированием текущей папки (PowerShell)
docker run --rm -it -v ${PWD}:/app -w /app vitest-runner