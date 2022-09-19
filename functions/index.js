const users = {name: 'Jamal', age: 22}

exports.handler = async (event, context, cb) => {
    return {
      statusCode: 200,
      body: JSON.stringify(users)
    }
  }