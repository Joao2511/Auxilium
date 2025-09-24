// src/server.js
app.use(cors({
  origin: "http://localhost:5500", // <- troque para a porta do seu front (ex: Live Server)
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",  // se for HTTPS em domínios diferentes, mude para 'none' e cookie.secure=true
    secure: false     // true se usar HTTPS
  }
}));
