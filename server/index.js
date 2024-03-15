const express = require("express");

const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs"); // 파일을 작성한다
dotenv.config(); // .env파일에 접근하기 위한 세팅

const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(cors());

const morgan = require("morgan"); // 클라이언트 http 요청이 들어올때 로그 상세 출력
app.use(morgan("dev"));

app.use(express.json());

// 기본 루트 get 요청 작성
app.get("/", async (req, res) => {
  try {
    return res.json({
      test: true,
    });
  } catch (error) {
    return res.json({
      test: false,
    });
  }
});

// uploads/chart.json 에 저장된 파일을 읽어서 JSON 포맷으로 출력
app.get("/data", async (req, res) => {
  try {
    res.set("Content-Type", "application/json; charset=utf-8"); // res 객체 설정
    const tempFile = fs.createReadStream("uploads/chart.json");
    return tempFile.pipe(res);
  } catch (error) {
    return res.json(error);
  }
});

// 네이버 검색 API 에, 시작일과 종료일, 검색어 등을 포함한 JSON 을 비동기통신으로 보낸 후,
// 네이버에서 보낸 요청에 대한 결과를 uploads/chart.js 파일로 저장 (내 백엔드 서버에 데이터 기록)
// 시작일과 종료일, 검색어 등을 포함한 JSON 을 api로 요청하고 결과를 chart에 저장한다.
app.post("/data", async (req, res) => {
  try {
    const { startDate, endDate, timeUnit, device, gender, keywordGroups } =
      req.body;

    const request_body = {
      startDate: startDate,
      endDate: endDate,
      timeUnit: timeUnit,
      device: device === "all" ? "" : device,
      gender: gender === "all" ? "" : gender,
      keywordGroups: keywordGroups,
    };

    const url = "https://openapi.naver.com/v1/datalab/search";

    // 서버 코드에 들어갈 설정
    const headers = {
      "Content-Type": "application/json",
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
    };
    const response = await axios.post(url, request_body, {
      headers: headers,
    });

    // uploads/chart.json으로 저장
    fs.writeFile(
      `./uploads/chart.json`,
      JSON.stringify(response.data.results),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
    return res.json(response.data.results);
  } catch (error) {
    return res.json(error);
  }
});

// chart.json 파일 삭제
app.delete("/data", (req, res) => {
  try {
    fs.unlink("uploads/chart.json", (error) => {
      if (error) {
        return res.json(error);
      }
    });
    return res.json({
      delete: true,
    });
  } catch (error) {
    return res.json(error);
  }
});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));
