
`navigator.getUserMedia` is now deprecated and is replaced by `navigator.mediaDevices.getUserMedia`. To fix this bug replace all versions of `navigator.getUserMedia` with `navigator.mediaDevices.getUserMedia`

1) допилить сокет, и подрубить к основе
2) для подключения к реакт приложению поменять конфиг html-webpack
3) хранение в локалсторедже - done
4) по приему сокета интервал на отправку - done
5) Buffer 31 fix ( from front string, back buffer)
