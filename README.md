# API-Factory

`API FACTORY`는 AWS에 대한 지식이 없이도 AWS resource를 사용하여 FaaS (Function as a Service) 방식의 Backend를 구축할 수 있도록 도와주는 개발자를 위한 Wep application입니다.

<br/>

## 서비스 주소

- https://www.api-factory.live

<br>

## 레포지토리

- [Frontend](https://github.com/jun2212/API-Factory-Frontend)
- [Backend](https://github.com/jun2212/API-Factory-Backend)
- [Serverless Backend](https://github.com/jun2212/API-Factory-Severless-API)

<br/>

## 프로젝트 기간

- 아이디어 수집 및 칸반 제작 : 2022.11.07 ~ 2022.11.14
- 제작 및 배포 : 2022.11.14 ~ 2022.11.25

<br/>

## Contents

- [개발 동기](https://github.com/jun2212/API-Factory-Frontend#개발-동기)
- [기술 스택](https://github.com/jun2212/API-Factory-Frontend#기술-스택)
- [기능](https://github.com/jun2212/API-Factory-Frontend#기능)
- [시연 연상](https://github.com/jun2212/API-Factory-Frontend#시연-연상)
- [챌린지](https://github.com/jun2212/API-Factory-Frontend#챌린지)
  - [악의적인 코드에 대한 대응](https://github.com/jun2212/API-Factory-Frontend#악의적인-코드에-대한-대응)
  - [AWS resource를 어떻게 제공할까?](https://github.com/jun2212/API-Factory-Frontend#aws-resource를-어떻게-제공할까)
  - [배포 관련 이슈](https://github.com/jun2212/API-Factory-Frontend#배포-관련-이슈)
- [개선하고 싶은 점](https://github.com/jun2212/API-Factory-Frontend#개선하고-싶은-점)
  - [Backend](https://github.com/jun2212/API-Factory-Frontend#backend)
  - [Mixed Content 해결 방법](https://github.com/jun2212/API-Factory-Frontend#mixed-content-해결-방법)
  - [로그인 관리](https://github.com/jun2212/API-Factory-Frontend#로그인-관리)
  - [Frontend의 재배포](https://github.com/jun2212/API-Factory-Frontend#frontend의-재배포)
- [📂 파일 구조](https://github.com/jun2212/API-Factory-Frontend#-파일-구조)

<br/>

## 개발 동기

<br/>

- AWS는 사용한 만큼의 비용만을 지불한다는 점과 Scaling에 신경 쓰지 않아도 된다는 점 등의 여러 매리트 들로 많은 회사들이 사용하고 있는 만큼 꼭 사용해 보고 싶었지만, 다른 서비스들에 비해 상대적으로 높은 진입 장벽을 느껴 그간 사용을 망설였습니다.
- 그래서 이번 기회에 직접 AWS의 사용방법을 익히면서 현재 나처럼 AWS에 대한 지식이 없는 사람들도 손쉽게 AWS resource를 사용할 수 있도록 도와주는 서비스를 개발하기로 하였습니다.

<br/>

## 기술 스택

<br/>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![](https://img.shields.io/badge/Node.js-311C87?style=flat-square&logo=Node.js&logoColor=339933)
![](https://img.shields.io/badge/express-DA3940?style=flat-square&logo=express&logoColor=black)
![](https://img.shields.io/badge/Passport-DC461D?style=flat-square&logo=Passport&logoColor=34E27A)
<br/>
![](https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=black)
![](https://img.shields.io/badge/Serverless-black?style=flat-square&logo=Serverless&logoColor=FD5750)
![](https://img.shields.io/badge/DynamoDB-232F3E?style=flat-square&logo=AmazonDynamoDB&logoColor=4053D6)
<br/>
![](https://img.shields.io/badge/sandbox-VM2-4946DD?style=flat-square)
<br/>

### 배포

- Frontend -> ![](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white)
- Backend -> ![](https://img.shields.io/badge/ElasticBeanstalk-8BC0D0?style=flat-square&logo=AmazonECS&logoColor=FF9900)
- Serverless Backend -> ![](https://img.shields.io/badge/Lambda-A22846?style=flat-square&logo=AWSLambda&logoColor=FF9900)

<br/>
<br/>

## 기능

- 사용자가 입력한 함수를 api를 통해 사용할 수 있도록 해줍니다.
- 사용자는 자신이 생성한 함수를 수정/삭제할 수 있습니다.
- 사용자는 자신이 생성한 함수를 테스트해 볼 수 있습니다.
- 사용자는 함수 내에서 dynamoDB와 S3를 사용할 수 있습니다.
- 사용자는 함수 내에서 서비스에서 제공하는 라이브러리(lodash, axios 등)를 사용할 수 있습니다.
- 사용자는 해당 기능들을 이용해 serverless 환경의 Backend를 구현할 수 있습니다.

<br/>

[API-Factory 사용설명](https://www.api-factory.live/guide)

<br/>

## 시연 연상

https://user-images.githubusercontent.com/106646292/235652699-91f40751-dfdd-4601-97db-2412a3ebfa3e.mp4

<br/>

## 챌린지

<br/>

### 악의적인 코드에 대한 대응

<br>

사용자가 입력해 주는 코드를 대신 실행해 주는 서비스를 구현하는 것이기 때문에 `AWS SDK` 직접 조작 등의 악의적인 함수를 제어하며 함수를 실행할 방법을 찾아야 했습니다.

- `Eval` : 문자 형태의 함수를 실행하는 방법으로서는 가장 먼저 떠올랐지만, 외부 지역함수에 접근 가능한 매우 큰 보안적 결함이 있어 제외하였습니다.
- `Window.Function` : eval의 대안으로 많이 사용되지만, 무한루프에 대응이 되지 않았고 여전히 보안적으로도 안전하지 않아 제외하였습니다.
- `VM2` : VM2는 Sandbox 내에서 함수를 실행시켜 주는 라이브러리입니다. 해당 라이브러리의 공식 페이지에도 '신뢰할 수 없는 코드를 샌드박스에서 실행해 볼 수 있다'라고 적혀있는 만큼 제가 원하던 기능에 잘 부합하였습니다. 다만 얼마 전 보안적 결함이 발견된 이슈가 있었는데, 빠르게 업데이트되어 해결되는 모습에 오히려 더 신뢰가 갔습니다. 게다가 무한 루프에 대응한 타임아웃 기능과 외부 라이브러리를 샌드박스 내에 제공하는 기능까지 있어 제 프로젝트에 적합하다 판단해 해당 라이브러리를 사용하였습니다.
  <br/><br/>

### AWS resource를 어떻게 제공할까?

<br/>

아직 스스로도 AWS resource가 익숙하지 않은 상황에서 사용자에게 AWS resource들을 제공할 방법을 고민해야 했습니다. 여기서 중요하게 생각한 점은, 사용자가 AWS에 가입하지 않더라도 해당 기능들을 사용할 수 있어야 한다는 것이었습니다.

<br/>

- 사용자의 DynamoDB 사용

  - `API FACTORY`의 사용자는 또 다른 개발자가 타깃이기 때문에 제가 DB 내에서 사용자들을 구분해야 하는 것처럼, 그 사용자들도 자신의 서비스의 사용자들을 구분할 수 있어야 한다고 생각했습니다. `DynamoDB`에서는 `파티션 키(Partition Key)`와 `정렬 키(Sort Key)`를 제공하는데, 파티션 키에는 유저의 고유키를 넣고 사용자에게 정렬 키를 사용할 수 있는 라이브러리를 제공하는 방식을 사용해서 해당 기능을 구현했습니다.

<br/>

- 사용자의 S3 사용

  - 해당 프로잭트에서 `DynamoDB`를 사용하는 모든 경우(사용자정보 관리, 사용자함수 관리, DynamoDB를 사용할 수 있는 고유 라이브러리)에서 `백앤드(Express)`를 거쳐서 동작하도록 설계하였기 때문에 따로 `AWS 접근권한`에 대해 고민 할 필요가 없었습니다.

  <br/>

  처음에는 S3를 제공하는 고유 라이브러리도 같은 방식으로 구현하려 했지만, 주로 택스트가 오가는 DynamoDB와 달리 S3의 경우에는 사진, 동영상 등 `높은 용량`을 가진 파일이 오갈 수 있어야 해서 `지연문제`, `Lambda`의 `제한시간 문제`, 새로고침 시 매번 `Lambda를 통해 높은 용량의 파일을 다시 불러야 하는 문제` 등이 있어 다른 방법을 찾아야 헸습니다.

  - 그렇게 사용자에게 직접 S3 저장소를 사용할 수 있도록 해줄 방법을 찾다가 `PreSigned url`이란 것을 알게 되었습니다.

    - `PreSigned url` 이란?

      > AWS 공식문서
      > <br/>
      > 미리 서명된 URL의 생성자가 해당 객체에 대한 액세스 권한을 보유할 경우, 미리 서명된 URL은 URL에서 식별된 객체에 대한 액세스를 부여합니다.
      > 즉, 객체를 업로드하기 위해 미리 서명된 URL을 수신하는 경우, 미리 서명된 URL의 생성자가 해당 객체를 업로드하는 데 필요한 권한을 보유하는 경우에만 객체를 업로드할 수 있습니다.
      > <br/>

      https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html
      (AWS)

    - 즉 미리 서명된 URL(액세스 권한 부여)을 제공하여 S3 버킷을 사용할 수 있도록 해주는 것입니다.

    <br/>

  이 서비스에서 제공하는 라이브러리에 사용자가 원하는 object key와 하고 싶은 작업(get, put)을 입력하면, 해당 object key에 유저의 고유키를 `prefix`로 붙여서 `PreSigned url`을 발급받아 돌려주는 방식을 사용했습니다.

<br/>

### 배포 관련 이슈

<br/>

Frontend와 Backend를 각각 다른 곳에 배포하면서 여러 가지 문제가 발생했었습니다.

<br/>

1. `Mixed Content`

   - ElasticBeanstalk는 `HTTP`로 배포가 되기 때문에 `HTTPS`로 배포된 Frontend에서 HTTP로 배포된 백앤드의 데이터를 가져오면 browser(크롬, 파이어폭스 등)에서 `Mixed content(혼합 콘텐츠)` 에러가 발생하였습니다.

     - `Mixed content`란?
       <br/>

       > HTTP를 통해 받아온 데이터를 포함하는 HTTPS 페이지를 mixed content 페이지라고 한다. 일부만 암호화되기 때문에, 암호화되지 않은 콘텐츠에는 공격자가 접근(man-in-the-middle)할 수 있으므로 페이지는 안전하지 않은 상태가 된다.
       > <br/>

       https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content (MDN, Mixed content)

   - 리서치 결과 알게 된 해결 방법은 크게 2가지가 있었습니다.

     1. `콘탠츠 보안 정책(Content-Security-Policy)`
        <br/>

        HTTP 헤더나 meta 태그를 사용해서 `Content-Security-Policy` 를 `upgrade-insecure-requests`로 설정헤서 HTTP요청을 HTTPS 바꿔 보내주도록 설정하는 방법.
        <br/>
        <br/>

        > meta 태그 예시

        ```
        <meta
          	httpEquiv="Content-Security-Policy"
          	content="upgrade-insecure-requests"
        />
        ```

        <br/>

        해당 방법이 가장 손쉬웠지만 upgrade-insecure-requests가 적용된 도메인에서는 안전하지 않은 리소스 요청을 자동으로 업그레이드하고, 리소스를 `HTTPS`로 받아올 수 없을 시 `HTTP`로 돌리지 않고 `요청이 실패하는 문제`가 있다는걸 알게 되었습다. 즉 외부에서 가져오는 리소스의 URL이 HTTP인 경우 에러가 발생한다는 것이었습니다. 현재 프로잭트에선 이와같은 케이스는 없지만 추후 확장성을 고려하면 좋은 선택이 아니라고 생각했습니다.
        <br/>
        추가적으로 보안적인 지식이 부족한 상황에서 임의로 HTTP를 HTTPS로 변경시키는게 어떠한 보안적 문제를 일으킬지 예측할 수 없기에 다른 방법을 찾아보기로 했습니다.

     2. `ElasticBeanstalk`에 `개인 도메인`을 적용
        <br>

        `SSL` 인증서를 받아 백엔드 서버 진입점을 HTTPS를 지원하는 `Load Balancer`를 두고 AWS의 `reverse proxy`를 통해 연결하는 방법입니다. 임의로 HTTPS로 변경하는게 아니라 백앤드의 진입점을 HTTPS로 만들어 줘 보안적으로 좀 더 안전하다는 생각이 들었고, 무엇보다 같은 오류를 겪는 사람들이 이 방법을 많이 사용하는것을 보고 선택하게 되었습니다.

        <br/>

    <br/>

2. Load balancer통한 Frontend와 Backend의 연결

   - 통신 문제는 해결하였으나 이번엔 `cookie`가 전달되지 않는 문제가 발생했습니다. 이는 Frontend와 Backend가 직접 연결되는 것이 아니라 Load balancer를 통하면서 생긴 문제였고 express-session에 `proxy`옵션을 추가함으로써 해결했습니다.

   <br/>

3. Domain
   - Backend에서 Frontend로 cookie를 보내왔지만 해당 cookie가 브라우저에 적용되진 않았습니다. cookie는 `domain`에 종속적인데 Frontend와 Backend의 `domain name`이 달랐기 때문이었습니다. express-session의 cookie에 `sameSite:"none"` 옵션을 줘서 문제를 해결했습니다.

<br/><br/>

## 개선하고 싶은 점

<br/>

### Backend

<br/>

- 이번 프로젝트에서의 Backend(Express)의 역할은 `사용자가 입력한 함수` 정보를 `dynamoDB에 저장/수정/삭제`해주는 것과 `로그인 관리` 입니다. 사실 이 기능들은 `Lambda`로도 구현 가능한 부분이지만 이전에 진행한 팀 프로젝트에서도 Express를 사용하지 않았고, 포트폴리오 성격이 강한 프로젝트이기 때문에 `Express를 무조건 넣어야겠다는 생각`을 했습니다.
  <br/>
  다만 `아키텍처적인 면`으로 봤을 때는 `올바른 구조가 아닌 것` 같아서 추후에 모두 Lambda로 교체하고 싶습니다.

<br/>

### Mixed Content 해결 방법

<br/>

- 해당 프로잭트는 Mixed Content를 해결하기 위해 Load Balancer를 사용해 백앤드에 개인 도매인을 적용하는 방식을 사용했습니다. 하지만 추후에 `CloudFront`라는 더 좋은 방법을 알게 되었습니다. `CloudFront`란 AWS에서 제공하는 `CDN` 서비스로 이를 이용해 클라이언트가 https로 CloudFront와 통신을 하고 CloudFront와 ElasticBeanstalk 서버가 http로 통신하는 방법입니다. `Load Balancer`를 사용하는 방식과 유사한 방식이지만 CDN 서비스 이기에 비용적으로 유리한 측면이 있어 해당 방식으로 개선해보고 싶습니다.

<br/>

### 로그인 관리

<br/>

- 해당 프로잭트는 AWS resource가 주가 되었기에 로그인 에서도 일관성 있게 AWS의 `Amazon Cognito`를 사용하는 `JWT token` 방식을 사용하료 했었습니다. 그러다 Backend의 볼륨을 늘려야 겠다는 생각이 들어 `passport`를 사용하는 `session` 방식으로 선회하게 되었습니다. 하지만 어느 정도 프로잭트를 완성을 하고 보니 잘못된 판단을 했다고 느껴졌습니다. session 방식보다는 JWT token 방식의 로그인이 최근 좀 더 선호되기도 하고 Cognito를 사용했어도 큰 볼륨의 차이는 없었을 것 같았기 때문입니다. 아니면 passport를 사용하더라도 `passport local`이 아니라 `소셜 로그인 방식`을 사용하는 게 더 좋지 않았을까 라는 생각이 들었습니다.

<br/>

### Frontend의 재배포

<br/>

Frontend와 Backend의 `domain name`이 달라서 생긴 이슈를 `sameSite: "none"`옵션을 줘서 해결했지만 보안상 좋은 방법은 아닌 것 같아 Frontend도 aws에 배포하고 `sub domain`을 사용하는 방식으로 개선해보고 싶습니다.

<br/>

## 📂 파일 구조

<details>
<summary>Frontend</summary>
📦API-Factory

┣ 📦public  
┃ ┣ 📂assets  
┃ ┃ ┗ 📜favicon.ico  
┃ ┗ 📜index.html  
┣ 📦src  
┃ ┣ 📂app  
┃ ┃ ┗ 📜App.js  
┃ ┣ 📂components  
┃ ┃ ┣ 📂CodeEditor  
┃ ┃ ┃ ┗ 📜CodeEditor.js  
┃ ┃ ┣ 📂CodeTester  
┃ ┃ ┃ ┗ 📜CodeTester.js  
┃ ┃ ┣ 📂ConfirmModal  
┃ ┃ ┃ ┗ 📜ConfirmModal.js  
┃ ┃ ┣ 📂GuideContent  
┃ ┃ ┃ ┗ 📜GuideContent.js  
┃ ┃ ┣ 📂LoginForm  
┃ ┃ ┃ ┗ 📜LoginForm.js  
┃ ┃ ┣ 📂Modal  
┃ ┃ ┃ ┗ 📜Modal.js  
┃ ┃ ┣ 📂NavBar  
┃ ┃ ┃ ┗ 📜NavBar.js  
┃ ┃ ┣ 📂RegisterForm  
┃ ┃ ┃ ┗ 📜RegisterForm.js  
┃ ┃ ┣ 📂TableOfContents  
┃ ┃ ┃ ┗ 📜TableOfContents.js  
┃ ┃ ┣ 📂TesterModal  
┃ ┃ ┃ ┗ 📜TesterModal.js  
┃ ┃ ┗ 📜Portal.js  
┃ ┣ 📂config  
┃ ┃ ┗ 📜constants.js  
┃ ┣ 📂customHooks  
┃ ┃ ┗ 📜customHooks.js  
┃ ┣ 📂features  
┃ ┃ ┗ 📜authState.js  
┃ ┣ 📂pages  
┃ ┃ ┣ 📂APIList  
┃ ┃ ┃ ┗ 📜APIList.js  
┃ ┃ ┣ 📂Error  
┃ ┃ ┃ ┗ 📜Error.js  
┃ ┃ ┣ 📂Guide  
┃ ┃ ┃ ┗ 📜Guide.js  
┃ ┃ ┣ 📂Login  
┃ ┃ ┃ ┗ 📜Login.js  
┃ ┃ ┣ 📂Main  
┃ ┃ ┃ ┗ 📜Main.js  
┃ ┃ ┣ 📂NotFound  
┃ ┃ ┃ ┗ 📜NotFound.js  
┃ ┃ ┣ 📂Register  
┃ ┃ ┃ ┗ 📜Register.js  
┃ ┃ ┗ 📂UpdateFunction  
┃ ┃ ┃ ┗ 📜UpdateFunction.js  
┃ ┣ 📂utils  
┃ ┃ ┗ 📜utils.js  
┃ ┣ 📜index.js  
┃ ┗ 📜setupTests.js  
┣ 📜.eslintrc.js  
┗ 📜.prettierrc.js

</details>

<details>
<summary>Backend</summary>
📦API-Factory-Backend

┣ 📦routes  
┃ ┣ 📂controller  
┃ ┃ ┣ 📜functionData.controller.js  
┃ ┃ ┗ 📜index.controller.js  
┃ ┣ 📂middleware  
┃ ┃ ┗ 📜localStrategy.js  
┃ ┣ 📂services  
┃ ┃ ┗ 📜index.services.js  
┃ ┣ 📜functionData.js  
┃ ┗ 📜index.js  
┣ 📦utils  
┃ ┣ 📜catchAsync.js  
┃ ┣ 📜dynamoDbUtil.js  
┃ ┗ 📜uuidUtil.js  
┣ 📜.eslintrc.js  
┣ 📜.prettierrc.js  
┗ 📜app.js

</details>

<details>
<summary>Serverless API</summary>
📦API-Factory-Serverless-API

┣ 📦src  
 ┃ ┣ 📂lib  
 ┃ ┃ ┣ 📜dynamoDbUtil.js  
 ┃ ┃ ┗ 📜setGeneratePresignedUrl.js  
 ┃ ┗ 📜apiRunner.js  
 ┣ 📜.eslintrc.js  
 ┗ 📜.prettierrc.js

</details>
