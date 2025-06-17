const express = require('express');
const { getLayoutZipBuffer } = require('../functions/getLayoutFromGitHub');

const router = express.Router();

router.post('/download', async (req, res) => {
  const { mode, name, repo, owner, branch } = req.body;

  if (!mode || !name) {
    return res.status(400).json({ error: 'Both "mode" and "name" are required.' });
  }

  try {
    const zipBuffer = await getLayoutZipBuffer({
      mode,
      name,
      repo,
      owner,
      branch
    });

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${name}.zip`
    });

    res.send(zipBuffer);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
