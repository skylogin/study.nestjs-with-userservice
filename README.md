# nest.js with User Service

- nest g co Users (컨트롤러 생성)
- nest g s Users (서비스 생성)
- nest g mo Users (모듈 생성)

- docker run --name mysql-local -p 3306:3306/tcp -e MYSQL_ROOT_PASSWORD=test -d mysql:8
  - allowPublicKeyRetrieval : TURE
  - New Database (test / utf8mb4 / utf8mb4_unicode_ci)
