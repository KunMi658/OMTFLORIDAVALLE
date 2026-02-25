@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%
git add -A
git commit -m "Logo PNG transparente centrado + sin marco negro"
git push origin main
echo PUSH COMPLETE
