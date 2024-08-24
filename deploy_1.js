const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public'))); // 'public' 폴더를 사용하여 정적 파일 제공

// 기본 경로 요청 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // index.html 파일을 제공
});

let orders = []; // 주문 목록을 저장할 배열

// 주문 추가 API
app.post('/api/orders', (req, res) => {
    const order = req.body.order;
    orders.push(order);
    res.status(201).send(orders);
});

// 주문 삭제 API
app.delete('/api/orders/:order', (req, res) => {
    const order = req.params.order;
    orders = orders.filter(o => o !== order);
    res.send(orders);
});

// 주문 목록 조회 API
app.get('/api/orders', (req, res) => {
    res.send(orders);
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});