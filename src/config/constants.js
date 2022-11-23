export const COLOR = {
  BLACK: "#212426",
  WHITE: "#FFFFFF",
  GRAY: "#D9D9D9",
  RED: "#CD264B",
  YELLOW: "#FFCF00",
  BLUE: "#0073B7",
};

export const DEFAULT_CODE =
  "async function APIFunction() {\r\n" + "//your code...\r\n" + "\r\n" + "}";

export const GUIDE_CONTENT = [
  {
    TITLE: "API FACTORY",
    CONTENT:
      "<h2 style='text-align: center;'>API FACTORY</h2><br/><br/>" +
      "<p style='font-size: 20px; line-height: 2.5;'>" +
      "<strong>API FACTORY</strong>는 <strong>aws serverless</strong>(AWS Lambda)에 대한 지식이 없이도 쉽게 serverless환경의 application을" +
      " 구현할 수 있도록 도와주는 개발자를 위한 wep application 입니다. 사용자는 FaaS (Function as a Service) 형태로 backend를 구현할 수 있으며," +
      " API FACTORY에서 제공하는 라이브러리를 사용해 데이터베이스와 저장소 또한 사용 할 수 있습니다.</p>",
  },
  {
    TITLE: "사용 가능한 언어",
    CONTENT:
      "<h2 style='text-align: center;'>사용 가능한 언어</h2><br/><br/>" +
      "<p style='font-size: 20px; line-height: 2.5;text-align: center;'>" +
      "현재 지원되는 언어는 <strong>javascript</strong>이며 추후 더 많은 언어를 지원 할 예정입니다.</p><br/>" +
      "<p style='line-height: 2.5;text-align: center;'>(주의: 외부 라이브러리를 가져올 때는 import 가 아닌 require을 사용합니다.)</p>",
  },
  {
    TITLE: "API 생성 규칙",
    CONTENT:
      "<h2 style='text-align: center;'>API 생성 규칙</h2><br/><br/>" +
      "<p style='font-size: 20px; line-height: 2.5; text-align: center;'>" +
      "• editor 왼쪽 상단에서 해당 api의 method 설정해야 한다<br />" +
      "• 함수 이름은 APIFunction으로 유지해야 한다. (기본 형태)<br/>" +
      "• editor 하단에서 해당 api의 이름을 설정해야 한다.<br/>" +
      "• 함수 내에서 최종 return되는 값을 response로 받을 수 있다.<br/>" +
      "• 외부 라이브러리를 불러올 때는 require을 사용해야 한다.<br/>" +
      "• API FACTORY 고유 라이브러리는 바로 사용할 수 있다.</p>",
  },
  {
    TITLE: "사용 가능한 라이브러리",
    CONTENT:
      "<h2 style='text-align: center;'>사용 가능한 라이브러리</h2><br/><br/><br/>" +
      "<p style='font-size: 20px; line-height: 2.5; text-align: center;'>" +
      "<strong>외부 라이브러리</strong><br/>" +
      "lodash, axios, dayjs<br/><br/>" +
      "<strong>API FACTORY 고유 라이브러리</strong><br/>" +
      "generateStorageUrl, getDbData, setDbData</p>",
  },
  {
    TITLE: "고유 라이브러리 사용법",
    CONTENT:
      "<h2 style='text-align: center;'>고유 라이브러리 사용법</h2><br/><br/>" +
      "<h3 style='line-height: 1;'><strong>generateStorageUrl(key, action, expires)</strong></h3><br/>" +
      "<p style='line-height: 0.5;'>• key(type String) -> 저장소에 사용할 키 값.</p><br/>" +
      "<p style='line-height: 0.5;'>• action(type String) -> GET/PUT 설정(GET = getObject, PUT = putObject)</p><br/>" +
      "<p style='line-height: 0.5;'>• expires(type Number) -> URL의 유효기간(초 단위)</p><br/>" +
      "<p style='line-height: 0.5;'>• response -> result : { statusCode, body(url or error message) }</p><br/><br/>" +
      "<h3 style='line-height: 2;'><strong>getDbData(key)</strong></h3><br/>" +
      "<p style='line-height: 0.5;'>• key(type String) -> 데이터베이스에서 읽어올 데이터의 키 값.</p><br/>" +
      "<p style='line-height: 0.5;'>• response -> result : { data }</p><br/><br/>" +
      "<h3 style='line-height: 2;'><strong>setDbData(key, data)</strong></h3><br/>" +
      "<p style='line-height: 0.5;'>• key(type String) -> 데이터베이스에 저장 할 데이터의 키 값.</p><br/>" +
      "<p style='line-height: 0.5;'>• data(type Object) -> { key1: value, key2: value ... }</p><br/>" +
      "<p style='line-height: 0.5;'>• response -> result : { data }</p><br/><br/>",
  },
  {
    TITLE: "API 사용법",
    CONTENT:
      "<h2 style='text-align: center;'>API 사용법</h2><br/><br/>" +
      "<h3 style='line-height: 1;'><strong>기본 API 주소</strong></h3><br/><br/>" +
      "<p style='line-height: 0.5;'><strong>https://jh90y6zqei.execute-api.ap-northeast-2.amazonaws.com/apiRunner</strong></p><br/><br/><br/>" +
      "<h3 style='line-height: 1;'><strong>함수 API 주소</strong></h3><br/><br/>" +
      "<p style='line-height: 0.5;'>query parameter에 key = functionKey , value = 발급받은 functionKey 를 넣어준다.</p><br/>" +
      "<p style='line-height: 0.5;'>ex) https://jh90y6zqei.execute-api.ap-northeast-2.amazonaws.com/apiRunner?functionKey=abcd1234</p><br/><br/><br/>" +
      "<h3 style='line-height: 1;'><strong>함수의 parameter 값 보내기</strong></h3><br/><br/>" +
      "<p style='line-height: 0.5;'>POST나 PUT 요청시, body에 { 'parameters' : [value1, value2, value3 ...] } 형태로 넣어준다.</p><br/>" +
      "<p style='line-height: 0.5;'>배열 안에는 함수의 파라미터 값이 순서에 맞게 들어있어야 한다.</p>",
  },
  {
    TITLE: "문의 사항",
    CONTENT:
      "<h2 style='text-align: center;'>문의 사항</h2><br/>" +
      "<h3 style='text-align: center; line-height: 1; padding-top: 35vh'><strong>Email : hsj890509@gmail.com</strong></h3><br/><br/>",
  },
];
