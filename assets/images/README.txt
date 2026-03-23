이 폴더에 다음 파일을 복사해주세요:

[이미지]
- justed_logo.png
  원본 위치: ../../Justed Logo/justed_기본형.png
  용도: 사이트 헤더 로고, 모바일 메뉴 로고, 푸터 로고

- venture.svg
  원본 위치: ../../Company Info/venture_img-D4l1p6oA.svg
  용도: 푸터 벤처확인기업 인증 이미지

[PDF]
assets/files/ 폴더를 생성하고 아래 파일을 복사해주세요:

- assets/files/justed_회사소개서.pdf
  원본 위치: ../../Company Info/justed_회사소개서.pdf
  용도: 회사소개서 다운로드 버튼

---

복사 명령 (Windows PowerShell 예시):

# 이미지 복사
Copy-Item "..\..\Justed Logo\justed_기본형.png" -Destination "justed_logo.png"
Copy-Item "..\..\Company Info\venture_img-D4l1p6oA.svg" -Destination "venture.svg"

# PDF 폴더 생성 및 복사
New-Item -ItemType Directory -Force -Path "..\files"
Copy-Item "..\..\Company Info\justed_회사소개서.pdf" -Destination "..\files\justed_회사소개서.pdf"
