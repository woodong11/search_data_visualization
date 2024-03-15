# search_data_visualization
네이버 검색 API를 이용해 설정기간동안 해당 키워드가 얼마나 검색되었는지 차트로 시각화하는 프로젝트입니다. (SSAFY 임베디드과정 미니 웹 프로젝트)
node.js, vue.js를 사용했고, 차트 시각화를 위해 chart.js 라이브러리를 이용했습니다.

![22](https://github.com/woodong11/search_data_visualization/assets/91379630/7683cd43-b9a0-4af7-af39-2fecd5985ac4)
![333](https://github.com/woodong11/search_data_visualization/assets/91379630/c89af7a1-fa46-4dc7-a2ce-c83c597b1826)

<br>

# 사용방법
vscode를 server와 client/visual_pjt에서 각각 켜줍니다. 

### 네이버 api 생성하기
https://developers.naver.com/main/ 접속해서 로그인 후,
Application -> 애플리케이션 등록 

애플리케이션 이름에 data-visualization
사용 API에 데이터랩(검색어트렌드), 데이터랩(쇼핑인사이트) 추가
비로그인 오픈 API 서비스 환경에서 웹서비스 http://127.0.0.1 , 등록

내 애플리케이션에서 애플리케이션 정보 들어가기
-> 자신의 Client ID, Client Secret(보기 버튼 클릭해야 보임)를 server의 .env파일에 등록

### 서버켜기
server 디렉토리 vscode에서 node_module 생성
```
npm i 
```

서버 켜기
```
node index.js
```


### 클라이언트 켜기
client 디렉토리 vscode에서 node_module 생성
```
npm i 
```

클라이언트 서버 켜기
```
npm run dev
```

### 클라이언트 확인하기
크롬을 열고 http://localhost:5173/ 접속
