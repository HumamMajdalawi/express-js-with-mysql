exports.succeed = (res, data, response_code) => {
  return res.status(response_code).send({
    status: 'success',
    message: '',
    data: data,
    response_code: response_code,
  })
}

exports.validation = (res, data) => {
  return res.status(422).send({
    status: 'fail',
    message: 'validation error',
    data: data,
    response_code: 422,
  })
}

exports.failed = (res) => {
  return res.status(500).send({
    status: 'fail',
    message: 'Something went wrong',
    data: [],
    response_code: 500,
  })
}

exports.notFound = (res) => {
  return res.status(404).send({
    status: 'fail',
    message: 'resource not found',
    data: [],
    response_code: 404,
  })
}
