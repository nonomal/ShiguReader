<h1 align="center">ShiguReader</h1>

[<img src="https://img.shields.io/github/v/release/hjyssg/ShiguReader?label=latest%20release">](https://github.com/hjyssg/ShiguReader/releases)
[<img src="https://img.shields.io/docker/v/liwufan/shigureader?label=docker%20version">](https://hub.docker.com/r/liwufan/shigureader)
[<img src="https://img.shields.io/docker/pulls/liwufan/shigureader.svg">](https://hub.docker.com/r/liwufan/shigureader)

Read Comic/Play Music and Video on all platforms


##### Demo Video

[demo video](https://youtu.be/nV24b6X6eeI)  

##### Screenshot

![screenshot-01](screenshot/01.png)
![screenshot-02](screenshot/02.png)
![screenshot-02](screenshot/02.5.png)
![screenshot-03](screenshot/03.png)
![screenshot-04](screenshot/04.png)
![screenshot-05](screenshot/05.png)
![screenshot-06](screenshot/06.png)
![screenshot-06](screenshot/08.png)

password is at password-config.js

##### Features

* display the thumbnails of zip/rar/7zip files
* re-compress images to save disk space
* move/delete files
* play music files that are in the zip/rar/7zip files
* play mp4/mkv/avi files and display their tags
* show statistics chart
* same color theme as exh**tai
* support Windows/*nix servers
* client can run on any modern browser(except IE), including mobile phone and tablet(no need to install any other softwares)


##### File Format Support

* Compressed files: zip/rar/7zip files  
* Format support of image/video/music files depends on the browser. Support typical jpg,png,png,mp4,avi,mp3,wav files  
* More details in src/util.js

##### Instruction

* For windows, download the zip file
* Modify ini file, then click the ShiguReader.exe
* For *nix users and developers, please refer to [Readme_Env_Setup](https://github.com/hjyssg/ShiguReader/blob/dev/Readme_Env_Setup.md)

##### Third Party Dependency

It is nice to have. But ShiguReader can run without it.
install imagemagick  from https://imagemagick.org

##### Safety

ShiguReader is not safe when being accessed from the public IP. The server is not prepared for any cyber attack.

If you just want to read comic or watch anime when going outside, you can download the files to you tablet.
For example, my ipad has VLC for video and ComicGlass for comic. I download file in Chrome browser and save them to the apps.

##### How to use on NAS

Thanks to [this guy](https://github.com/hjyssg/ShiguReader/issues/90)

##### Hotkey

enter: browser enter/quit full screen
AD and left right arrow key: go to next/previous page
+-: zoom image

##### Caution

If you find the images with file name containing Japanese Kanji/Kana, you will need to change the language setting:
![unicode setting](screenshot/unicode-setting.png)
But it's also reported that this setting will cause Mojibake in other softwares using non unicode encoding.

##### FAQ
    Q： I can open the webpage, but it is empty or 404.
    A: Please check your config-path.ini file

    Q：Why English Readme is much less than Chinese Readme?
    A: I received more questions from Chinese community. But I do provide enough information here.

    Q： What does ShiguReader mean？
    A： Shigure(しぐれ) + Reader


##### Have any question?

If you have any question, just post in Github Issue.
