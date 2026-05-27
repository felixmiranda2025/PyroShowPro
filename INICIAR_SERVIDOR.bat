@echo off
title PyroShow Pro — Servidor local
echo.
echo  ====================================
echo   PyroShow Pro — Iniciando servidor
echo  ====================================
echo.

:: Buscar Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Python encontrado. Iniciando...
    echo  Abre: http://localhost:8080/pages/app.html
    echo.
    python servidor.py
    goto fin
)

python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Python3 encontrado. Iniciando...
    python3 servidor.py
    goto fin
)

echo  ERROR: Python no encontrado.
echo.
echo  Opciones alternativas:
echo.
echo  1. Instala Python desde https://python.org
echo.
echo  2. O usa Node.js (si lo tienes):
echo     npx serve . -p 8080
echo.
echo  3. O abre directamente con VS Code Live Server
echo.

:fin
pause
