Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c pm2 start cmd --name mi-app-react -- /c ""serve -s dist -l 3000""", 0, False
