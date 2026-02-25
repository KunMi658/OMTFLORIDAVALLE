@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%
git add -A
git commit -m "Logo de academia + eliminar duracion del splash"
git push origin main
echo PUSH COMPLETE
