'use strict'

const Models = require("../models");

const parseNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildPostPayload = (raw) => {
  const authorId =
    parseNumber(raw.author_id ?? raw.authorId ?? raw.user_id ?? raw.userId);

  if (authorId === null) {
    throw new Error('author_id must be a number');
  }

  const postId = parseNumber(raw.post_id ?? raw.postId) ?? Date.now();

  const body = raw.body ?? raw.description;
  if (!raw.title || !body) {
    throw new Error('title and body are required');
  }

  return {
    post_id: postId,
    author_id: authorId,
    title: raw.title,
    body,
    image_url: raw.image_url ?? raw.imgURL,
    created_at: raw.created_at ? new Date(raw.created_at) : new Date(),
    updated_at: raw.updated_at ? new Date(raw.updated_at) : new Date(),
  };
};

const getUserPosts = (req, res) => {
  const authorId = parseNumber(req.params.uid);

  if (authorId === null) {
    res.status(400);
    res.json({ result: 400, error: 'author_id must be a number' });
    return;
  }

  Models.Post.find({ author_id: authorId })
    .then((data) => {
      res.status(200);
      res.json({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({ result: 500, error: err.message });
    });
}

const createPost = (req, res) => {
  console.log("createPost Controller:", req.body);
  let payload;

  try {
    payload = buildPostPayload(req.body);
  } catch (err) {
    res.status(400);
    res.json({ result: 400, error: err.message });
    return;
  }

  new Models.Post(payload)
    .save()
    .then((data) => {
      res.status(200);
      res.json({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({ result: 500, error: err.message });
    });
};

module.exports = {
  getUserPosts,
  createPost
}
