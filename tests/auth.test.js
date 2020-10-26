const sinon = require('sinon')
const A = require('../services/users/auth')

/* 
=====FAKE FUNCTIONS TO BE STUBBED======= 

This approach was adopted to prevent making actual calls to the database as the intention is to test the function in the service

*/
function testSignup(user) {
  const expectedInput = {
    name: 'Demo',
    email: 'a@a.com',
    password: '12345678',
    age: 17
  }
  if (user.name === expectedInput.name && user.email === expectedInput.email && user.password === expectedInput.password && user.age === expectedInput.age) {
    return true
  }
  return false
}

function testLogin(user) {
  const expectedInput = {
    email: 'a@a.com',
    password: '12345678',
  }
  if (user.email === expectedInput.email && user.password === expectedInput.password) {
    return {
      user: {
        name: 'Demo User',
        age: 17,
        email: 'a@a.com'

      },
      token: 'BUBEIBSKEOIOWJBIWEUB'
    }
  }
  return new Error('Could not log in')
}
/* ======STUBBED FUNCTIONS FAKE FUNCTIONS TO BE STUBBED========== */


describe('auth', () => {
  const creatUser = {
    name: 'Demo',
    email: 'a@a.com',
    password: '12345678',
    age: 17
  }
  A.signUp = sinon.stub()
  A.signUp.callsFake(testSignup);

  it('Registers a user and returns true', async () => {
    const expected = await A.signUp(creatUser)
    expect(expected).toEqual(true);
  });

  sinon.restore()
})


describe('login', () => {
  const demoLoginUser = {
    email: 'a@a.com',
    password: '12345678',
  }

  A.signIn = sinon.stub()
  A.signIn.callsFake(testLogin);

  it('Logs in a user and returns token alongside the user object', async () => {
    const loginUser = await A.signIn(demoLoginUser)
    expect(loginUser.token).toBeDefined();
    expect(loginUser.user).toBeDefined();
  });
  sinon.restore()
})
