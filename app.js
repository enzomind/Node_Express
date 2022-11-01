const express = require('express');
const path = require('path'); //sendFile 메서드를 위해 path 모듈로 경로 지정해야 함.

const app = express();
app.set('port',process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.send('Hello Express baby!');
    res.sendFile(path.join(__dirname, '/study/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 ON');
});