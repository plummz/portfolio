@echo off
title John Rey Portfolio
cd /d "%~dp0"

if not exist node_modules (
  echo First run: installing packages, this takes a minute...
  call npm install
)

echo.
echo Starting the site. Your browser will open in a few seconds.
echo Keep this window open while you look at it. Close it to stop the site.
echo.
start "" cmd /c "timeout /t 6 >nul & start http://localhost:3000"
call npm run dev
