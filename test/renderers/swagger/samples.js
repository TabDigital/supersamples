module.exports = [
  {
    id: 0,
    summary: 'something',
    hierarchy: [
      '1. a',
      '2. b'
    ],
    request: {
      route: '/v1/foo/bar',
      path: '/v1/foo/bar?foo=bar&num=1',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        foo: 'bar',
        arr: ['foo'],
        obj: {
          foo: 'bar'
        }
      }
    },
    response: {
      status: 200,
      headers: {
        'X-Rate-Limit-Limit': 100
      },
      body: {
        foo: 'bar',
        arr: [
          {
            foo: 'bar'
          }  
        ]
      }
    }
  },
  {
    id: 1,
    summary: 'something',
    hierarchy: [
      '1. a',
      '2. b'
    ],
    request: {
      route: '/v1/foo/bar',
      path: '/v1/foo/bar',
      headers: {
        'content-type': 'text/html'
      },
      method: 'POST',
      data: {
        foo: 'bar',
        arr: ['foo'],
        obj: {
          foo: 'bar'
        }
      }
    },
    response: {
      status: 200,
      headers: {
        'X-Rate-Limit-Limit': 100
      },
      body: {
        foo: 'bar',
        arr: [
          {
            foo: 'bar'
          }  
        ]
      }
    }
  },
  {
    id: 3,
    summary: 'something',
    hierarchy: [
      '1. a',
      '2. b'
    ],
    request: {
      route: '/v1/hello/world',
      path: '/v1/hello/world',
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET'
    },
    response: {
      status: 200,
      headers: {},
      body: {
        foo: 'bar',
        arr: [
          {
            foo: 'bar'
          }  
        ]
      }
    }
  },
  {
    id: 4,
    summary: 'something',
    hierarchy: [
      '1. a',
      '2. b'
    ],
    request: {
      route: '/v1/:something/special',
      path: '/v1/something/special',
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET'
    },
    response: {
      status: 200,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        foo: 'bar',
        arr: [
          {
            foo: 'bar'
          }  
        ]
      }
    }
  }
];

