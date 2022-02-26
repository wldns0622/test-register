const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(helmet());

const PORT = 5099;

const users = [];

app.get('/', (req, res) => {
  return res.status(400).send('Sever Connected...!');
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  let findUser = false;

  users.forEach(user => {
    if(user.email === email && user.password === password) {
      findUser = true;
    }
  })

  if(findUser) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});

app.post('/register', (req, res) => {
  const { email, password, nickname} = req.body;
  const findUser = false;
  const message = '';

  users.forEach(user => {
    if(user.email === email && !message) {
      message = "이미 존재하는 이메일";
    } else if(user.nickname === nickname && !message) {
      message = "이미 존재하는 닉네임";
    }
  });

  if(message) {
    users.push({ email, password, nickname });
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, message });
  }
})

app.listen(PORT, () => {
  console.log('Connected...');
})