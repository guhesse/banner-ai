const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exportRoutes = require('./routes/export');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/export', exportRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});