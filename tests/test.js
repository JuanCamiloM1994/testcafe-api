fixture`API testing with Testcafe`

test('Status code', async t => {
    const response = await t.request('https://reqres.in/api/users/2')
    const invalidResponse = await t.request('https://reqres.in/api/users/invalidID')
    console.log(response)
    await t.expect(response.status).eql(200)
    await t.expect(invalidResponse.status).eql(404)

})

test('Get request', async t => {
    const response = await t.request({
        url: 'https://reqres.in/api/users/2',
        method: 'GET',
        timeout: 10000,
    })
    await t.expect(response.status).eql(200)
    await t.expect(response.body.data.id).eql(2)
    await t.expect(response.body.data.first_name).contains('Janet')

})

test('POST request', async t => {
    const response = await t.request({
        url: 'https://reqres.in/api/login',
        method: 'POST',
        timeout: 10000,
        body: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        },
    })
    await t.expect(response.status).eql(200)
    await t.expect(response.body.token).contains('QpwL5tke4Pnpja7X4')
})

test('POST request negative', async t => {
    const response = await t.request({
        url: 'https://reqres.in/api/login',
        method: 'POST',
        timeout: 10000,
        body: {
            "email": "eve.holt@reqres.in"
        },
    })
    await t.expect(response.status).eql(400)
    await t.expect(response.body.error).contains('Missing password')
})

test('PUT request', async t => {
    const response = await t.request({
        url: 'https://reqres.in/api/users/2',
        method: 'PUT',
        timeout: 10000,
        body: {
            "name": "morpheus",
            "job": "zion resident"
        },
    })

    await t.expect(response.status).eql(200)
    await t.expect(response.body.updatedAt).ok()
})

test('DELETE request', async t => {
    const response = await t.request({
        url: 'https://reqres.in/api/users/2',
        method: 'DELETE',
        timeout: 10000,
    })

    await t.expect(response.status).eql(204)
})

test('Authentication positive', async t => {
    const response = await t.request({
        url: 'https://airportgap.com/api/favorites',
        method: 'GET',
        timeout: 10000,
        headers: {
            Authorization: "Bearer token=TxQzMGgHy1RtQnBTD8ThYmN4"
        }
    })

    await t.expect(response.status).eql(200)
})

test('Authentication Negative', async t => {
    const response = await t.request({
        url: 'https://airportgap.com/api/favorites',
        method: 'GET',
        timeout: 10000,
    })

    await t.expect(response.status).eql(401) //401 means unauthorized
})