const request = require('supertest');

module.exports = (app) => {
  const server = app.listen();

  return {
    server,
    post: ({
      path = '/',
      params = {},
      headers = {},
      auth = '',
    }) => request(app)
      .post(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .send(params || {}),

    put: ({
      path = '/',
      params = {},
      auth = '',
      headers = {},
    }) => request(app)
      .put(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .send(params || {}),

    patch: ({
      path = '/',
      params = {},
      auth = '',
      headers = {},
    }) => request(app)
      .patch(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .send(params || {}),

    get: ({
      path = '/',
      auth = '',
      headers = {},
      query = {},
    }) => request(app)
      .get(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .query(query || ''),

    del: ({
      path = '/',
      auth = '',
      headers = {},
    }) => request(app)
      .delete(path)
      .set(headers || {})
      .set('Authorization', auth || ''),
  };
};
