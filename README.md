# `express-REST-api`

## express로 간단한 api 구현하기

- 데이터베이스 : mongoDB Cloud, mongoose
    - user schema
    - post schema
- 3계층 구조로 설계(Models, Service, Routes)
- 유저 인증 단계별로 확장하기
    - passport
    - jwt
    - jwt 확장(엑세스토큰 + 리프레시 토큰)
    - OAUTH(구글, 카카오)
- 세션 스토어(최종 redis 연동하기)
    - session store(session-file-store 패키지 활용)
    - redis
</br></br>

### <메인 페이지: 로그인 폼>
```
- GET / : 메인 페이지(페이지 정보 & 로그인 폼)
- GET /login : 로그인 페이지
```
</br></br>

### <기본기능: 회원관리 api>
```
- GET /users/:id : 회원 정보 조회
- POST /users/register : 회원 등록
- PUT /users/:id : 회원 정보 수정
- DELETE /users/:id : 회원 정보 삭제


- POST /login : 로그인 정보 등록
- GET /logout : 로그아웃 페이지
- GET /users : 모든 회원 리스트
```
</br></br>

### <추가기능: 게시글 api>
```
- GET /posts/:id : 특정 게시물 정보 조회
- POST /posts : 게시물 등록
- PUT /posts/:id : 특정 게시물 정보 수정
- DELETE /posts/:id : 특정 게시물 정보 삭제

- GET /posts : 모든 게시물 정보 조회 & 게시물 등록 페이지
```
</br></br>

## `단계별 구현 ing~`
1. session-file-store와 passport 기반 로그인/로그아웃 기능 구현
    - /db/models/User.js - User 클래스 구현
    - /passport.js - Serialize, Deserialize, Strategy 구현
    - /routes/authRouter.js - 유저 로그인/로그아웃 라우터 구현