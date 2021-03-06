const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(root, args, context, info) {
  const password = await bcrypt.hash(args.passord, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`);
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  }
}

async function login(root, args, context, info) {
  const user = await context.db.query.user({
    where: { email: args.email }
  }, `{ id password }`);
  if (!user) {
    throw new Error('No user found.');
  }

  const valid = await bycrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password.');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

function post(root, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.createLink({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {
        connect: { id: userId }
      }
    }
  }, info);
}

module.exports = {
  signup,
  login,
  post,
}