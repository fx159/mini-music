# mini-music

## Project setup
```
1. git clone https://github.com/fx159/mini-music.git
2. cd mini-music 
3. npm install
4. 下载后台服务api模块 
git submodule update --init --recursive
4. cd NeteaseCloudMusicApi
5. npm start 
6. cd ../
7. npm run serve
```
## 记录一些项目中遇到的问题
```
1.轮播图：修复了切换视口后图片无法自适应屏幕大小的问题
2.推荐歌单：由于拿到推荐歌单接口后需要根据拿到的歌单id获取到歌单图片和歌单详情，所以需要对拿到的推荐歌单进行遍历，
但是发现便利后得到的数据带有{__ob__: Observer}属性，无法直接对歌单数据进行获取，后利用Object.assign()解决该问题，成功获取到歌单详情和图片
3.better-scroll:content内容不超过warrper内容时页面无法滚动，并且content需要定义高度
```
