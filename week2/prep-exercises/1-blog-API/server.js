const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

const getFileName = (title) => {
    return path.join(__dirname, `${title.replace(/\s+/g, '_')}.txt`);
};

const fileExists = (fileName) => {
    return fs.existsSync(fileName);
};

const handleFileOperationError = (err, res) => {
    console.error(err);
    res.status(500).send('Internal server error.');
};

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/blogs', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res
            .status(400)
            .send('Bad Request. Both title and content are required!');
    }

    const fileName = getFileName(title);

    try {
        fs.writeFileSync(fileName, content);
        res.end('ok');
    } catch (err) {
        handleFileOperationError(err, res);
    }
});

app.put('/posts/:title', (req, res) => {
    const { title } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Bad Request. Content is required!');
    }

    const fileName = getFileName(title);

    if (fileExists(fileName)) {
        try {
            fs.writeFileSync(fileName, content);
            res.end('ok');
        } catch (err) {
            handleFileOperationError(err, res);
        }
    } else {
        res.status(404).send('This post does not exist!');
    }
});

app.delete('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const fileName = getFileName(title);

    if (fileExists(fileName)) {
        try {
            fs.unlinkSync(fileName);
            res.end('ok');
        } catch (err) {
            handleFileOperationError(err, res);
        }
    } else {
        res.status(404).send('This post does not exist!');
    }
});

app.get('/blogs/:title', (req, res) => {
    const { title } = req.params;
    const fileName = getFileName(title);

    if (fileExists(fileName)) {
        try {
            const post = fs.readFileSync(fileName, 'utf8');
            res.status(200).send(post);
        } catch (err) {
            handleFileOperationError(err, res);
        }
    } else {
        res.status(404).send('This post does not exist!');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
