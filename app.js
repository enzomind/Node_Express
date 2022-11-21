const express = require('express');
const path = require('path');

const morgan = require('morgan'); //추가 로그 확인 시 사용

const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.set('port',process.env.PORT || 3000);

//static 미들웨어 : 정적인 파일들을 제공하는 라우터 역할
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));

//요청의 본문에 있는 데이터를 해석해 req.body 객체로 만들어주는 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//요청의 쿠키를 해석해 req.cookies 객체로 만듬.
app.use(cookieParser(process.env.COOKIE_SECRET));

//세션 관리용 미들웨어
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));



//미들웨어는 익스프레스의 핵심으로로 app.use와 사용됨.
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행');
    next(); //다음 미들웨어로 넘어가는 함수
});

app.get('/', (req, res, next) => {
    // res.send('Hello Express baby!');
    console.log('GET / 요청에서만 실행');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 감');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 ON');
});
