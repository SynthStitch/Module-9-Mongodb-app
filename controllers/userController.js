'use strict'

const Models = require("../models")

const parseNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildUserPayload = (data) => {
  const rawId = data.user_id ?? data.userId;
  const parsedId = parseNumber(rawId);
  if (rawId !== undefined && parsedId === null) {
    throw new Error('user_id must be a number');
  }

  const finalId = parsedId ?? Date.now();

  const username = data.username ?? data.firstName ?? data.email;
  if (!username) {
    throw new Error('username is required');
  }

  const passwordHash = data.password_hash ?? data.password;
  if (!passwordHash) {
    throw new Error('password_hash is required');
  }

  const nameFromParts = `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim();
  const displayName =
    (data.display_name != null && data.display_name !== '')
      ? data.display_name
      : (nameFromParts !== '' ? nameFromParts : username);

  return {
    user_id: finalId,
    username,
    email: data.email,
    password_hash: passwordHash,
    display_name: displayName,
    avatar_url: data.avatar_url,
    created_at: data.created_at ? new Date(data.created_at) : new Date(),
  };
};

const getUsers = (res) => {
  Models.User.find({})
    .then(data => {
      res.status(200)
      res.json({result: 200, data: data})
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.json({result: 500, error: err.message})
    })
}

const createUser = (data, res) => {
  console.log("createUser Controller:", data)

  let payload;

  try {
    payload = buildUserPayload(data);
  } catch (err) {
    res.status(400);
    res.json({ result: 400, error: err.message });
    return;
  }

  new Models.User(payload).save()
    .then(data => {
      res.status(201)
      res.json({result: 201, data: data})
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.json({result: 500, error: err.message})
    })
}

const updateUser = (req, res) => {
    console.log("updateUser controller:", req.body)

    const update = { ...req.body };

    if (update.user_id ?? update.userId) {
      const parsed = parseNumber(update.user_id ?? update.userId);
      if (parsed === null) {
        res.status(400);
        res.json({ result: 400, error: 'user_id must be a number' });
        return;
      }
      update.user_id = parsed;
    }

    if (update.password) {
      update.password_hash = update.password_hash ?? update.password;
      delete update.password;
    }

    Models.User.findByIdAndUpdate(req.params.id, update, {new: true})
        .then(data => {
            res.status(200)
            res.json({result: 200, data: data})
        })
        .catch(err => {
            console.log(err)
            res.status(500)
            res.json({result: 500, error: err.message})
        })
}

const deleteUser = (req, res) => {
    console.log("deleteUser controller:", req.body)
    Models.User.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200)
            res.json({result: 200, data: data})
        })
        .catch(err => {
            console.log(err)
            res.status(500)
            res.json({result: 500, error: err.message})
        })
}

module.exports = {
  getUsers, createUser, updateUser, deleteUser
}
