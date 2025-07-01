const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');

const app = express();
const PORT = 9376;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

const htmlRoutes = [
  '/impressum',
  '/datenschutzerklaerung',
];

htmlRoutes.forEach(route => {
  app.get(route, (req, res) => {
    const fileName = `${route.replace('/', '')}.html`;
    res.sendFile(path.join(__dirname, 'public', fileName), err => {
      if (err) {
        console.error(`Fehler beim Laden von ${fileName}:`, err);
        res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
      }
    });
  });
});

//homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), err => {
  });
});

//impressum
app.get('/impressum', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'impressum.html'), err => {
  });
});

//datenschutzerklaerung
app.get('/datenschutzerklaerung', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'datenschutzerklaerung.html'), err => {
  });
});

//datenschutzerklaerung (soon)
//app.get('/datenschutzerklaerung-zipline', (req, res) => {
//  res.sendFile(path.join(__dirname, 'public', 'datenschutzerklaerung-zipline.html'), err => {
//  });
//});

//nutzungsbedingungen
app.get('/nutzungsbedingungen-zipline', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nutzungsbedingungen-zipline.html'), err => {
  });
});

//error
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use((err, req, res, next) => {
  console.error('Unerwarteter Fehler:', err.stack);
  res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});


http.createServer(app).listen(PORT, () => {
  console.log(`ONLINE: ${PORT}`);
});
