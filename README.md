# API-Factory

`API FACTORY`는 AWS에 대한 지식이 없이도 AWS resource를 사용하여 FaaS (Function as a Service) 방식의 BackEnd를 구축할 수 있도록 도와주는 개발자를 위한 Wep application입니다.

<br/>

## 프로젝트 기간

- 아이디어 수집 및 칸반 제작 : 2022.11.07 ~ 2022.11.14
- 제작 및 배포 : 2022.11.14 ~ 2022.11.25

<br/>

## Contents

- [개발 동기]
- [기술 스택]
- [Features]
- [Challenges]
- [고민했던 점
- [📂 파일 구조]

<br/>

## 개발 동기

<br>

- AWS는 사용한 만큼의 비용만을 지불한다는 점과 Scaling에 신경쓰지 않아도 된다는 점 등의 많은 매리트로 클라우드 점유율이 전세계 33%, 국내에선 50%에 육박하고 있다. 많은 회사들이 사용하는 만큼 나도 늘 사용해 보고 싶었지만, 다른 서비스들에 비해 상대적으로 높은 진입 장벽에 망설여 졌었다.<br>
  그래서 나는 직접 AWS의 사용방법을 익히면서 현재 나처럼 AWS에 대한 지식이 없는 사람들도 손쉽게 AWS resource를 사용할 수 있도록 도와주는 서비스를 개발하기로 하였다.

<br/>

## 기술 스택

<br>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![](https://img.shields.io/badge/Node.js-white?style=flat-square&logo=Node.js&logoColor=339933)
![](https://img.shields.io/badge/express-DA3940?style=flat-square&logo=express&logoColor=black)
![](https://img.shields.io/badge/Passport-DC461D?style=flat-square&logo=Passport&logoColor=34E27A)
<br>
![](https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=black)
![](https://img.shields.io/badge/Serverless-black?style=flat-square&logo=Serverless&logoColor=FD5750)
![](https://img.shields.io/badge/DynamoDB-232F3E?style=flat-square&logo=AmazonDynamoDB&logoColor=4053D6)
<br>
![](https://img.shields.io/badge/sandbox-VM2-4946DD?style=flat-square)
<br>

### 배포

- FrontEnd -> ![](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white)
- BackEnd -> ![](https://img.shields.io/badge/ElasticBeanstalk-white?style=flat-square&logo=AmazonECS&logoColor=FF9900)
- serverless API -> ![](https://img.shields.io/badge/Lambda-A22846?style=flat-square&logo=AWSLambda&logoColor=FF9900)

<br/>
<br/>

## Feature

- 사용자가 입력한 함수를 api를 통해 사용할 수 있도록 해준다.
- 사용자는 자신이 생성한 함수를 수정/삭제 할 수 있다.
- 사용자는 함수 내에서 dynamoDB와 S3를 사용 할 수 있다.
- 사용자는 함수 내에서 lodash, axios 등의 라이브러리를 사용 할 수 있다.
- 사용자는 해당 기능들을 이용해 serverless 환경의 BackEnd를 구현할 수 있다.

<br>

## Challenges

<br>

### 악의적인 코드에 대한 대응

- 사용자가 입력해 주는 코드를 대신 실행해 주는 서비스를 구현하는 것이기 때문에 `AWS SDK` 직접 조작 등의 악의적인 함수를 제어할 필요가 있었다. 이 부분에 대해 여러 옵션을 고려했지만 `VM2`에서 제공하는 SandBox 내에서 함수를 실행 시키고 VM2에서 제공하는 방식에 따라 제한된 라이브러리를 SandBox 내에 제공하는 것으로 생각보다 쉽게 해결할 수 있었다.

### 사용자의 DynamoDB 사용

- `API FACTORY`의 사용자는 또 다른 개발자가 타겟이다. 따라서 나는 DB 내에서 내 서비스의 사용자들을 구분해야 하고, 그 사용자들도 자신의 서비스의 사용자들을 구분 할 수 있어야 했다. `DynamoDB`에서는 `파티션 키(Partition Key)`와 `정렬키(Sort Key)`를 제공하는데, 파티션 키에는 유저의 아이디(고유값)를 넣고 사용자에게 정렬키를 제공하는 방식을 사용했다.

### 사용자의 S3 사용

- 사용자에게 저장소를 사용 할 수 있도록 해줄 방법을 찾다가 `PreSigned url`을 알게 되었다. 사용자가 key를 입력하면, 해당 키에 유저의 아이디를 prefix해서 PreSigned url을 발급받아 돌려주는 방식을 사용했다.

<br/>

## 고민했던 점

<br>

### DynamoDB에서의 글로벌 보조 인덱스 사용

<br>

사용자에게 자신이 만든 api목록과 내용을 제공하기 위한 방법에는 세가지 옵션이 있었다.

<br>

1. 정렬키 (Sort Key)
   - 정렬키로 해당 사용자의 아이디를 넣게 된다면 사용자가 api를 사용할 때마다 function_key 와 자신의 아이디를 입력해야만 했다. 나는 간편하게 function_key만을 사용해서 api를 사용하도록 만들고 싶었기에 배제하였다.
2. 스캔 (Scan)
   - 테이블 전체를 뒤져서 찾아오기에 속도나 비용적이 면에서 모두 지양되는 방식이라 배제하게 되었다.
3. 글로벌 보조 인덱스 (Global Secondary Indexes)
   - 사용자가 만든 api들의 모든 정보가 필요했고, 따라서 테이블의 모든 속성을 보조 인덱스로 프로젝션 해야만 했다. 이는 Scan과 마찬가지로 비용적인 면에선 다소 불리한 면이 있지만 속도에서는 더 나은 성능을 보였고, 셋 중 내가 구현하고자 하는 서비스에 가장 적합하다 판단되어 선택하게 되었다.

<br>

## 📂 파일 구조

<details>
<summary>FrontEnd</summary>
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
<summary>BackEnd</summary>
📦API-Factory-Backend

┣ 📦controller  
 ┃ ┣ 📜functionData.controller.js  
 ┃ ┗ 📜index.controller.js  
 ┣ 📦middleware  
 ┃ ┗ 📜localStrategy.js  
 ┣ 📦routes  
 ┃ ┣ 📜functionData.js  
 ┃ ┗ 📜index.js  
 ┣ 📦services  
 ┃ ┗ 📜index.services.js  
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
📦API-Factory-serverless-api

┣ 📦src  
 ┃ ┣ 📂lib  
 ┃ ┃ ┣ 📜dynamoDbUtil.js  
 ┃ ┃ ┗ 📜setGeneratePresignedUrl.js  
 ┃ ┗ 📜apiRunner.js  
 ┣ 📜.eslintrc.js  
 ┗ 📜.prettierrc.js

</details>
