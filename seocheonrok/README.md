# 서천록 西天錄

서천록 시리즈 세계관과 작품 안내 페이지입니다.

## 파일 구성
- `index.html` 페이지 본문 (세계관 / 작품 탭)
- `css/style.css` 디자인
- `js/main.js` 탭 전환, 인물 프로필, 페르소나 압축 시트
- `.nojekyll` GitHub Pages가 파일을 그대로 쓰게 하는 빈 파일

## GitHub Pages로 올리기
1. 새 저장소를 만들고 이 폴더 안의 파일을 모두 올립니다. (`index.html`이 저장소 맨 위에 있어야 합니다)
2. 저장소 Settings → Pages → Branch를 `main` / `/(root)`로 선택하고 저장합니다.
3. 1~2분 뒤 `https://아이디.github.io/저장소이름/` 에서 열립니다.
4. 빌못멸 페이지 바로가기: 주소 뒤에 `#case`

## 플레이 링크 넣기
`js/main.js` 맨 위의 `const PLAY_URL = "";` 따옴표 안에 크랙 주소를 넣습니다.

## 새 작품 페이지 추가
`index.html` 안의 안내 주석을 따라 `<main class="page" data-tab="...">` 블록을 복사해 붙이면 탭이 자동으로 생깁니다.
