// importamos la funcion que vamos a testear
import { signInWithPassword } from '../src/lib/auth/authetication';
jest.mock("../src/lib/auth/__mocks__/authetication")

describe('signInWithPassword', () => {
  it('debería ser una función', () => {
    expect(typeof signInWithPassword).toBe('function');
  });

  it('debería logearse y que el usuario verifico su email', () => {
    signInWithPassword('nataly.fariasg@gmail.com', '12345679').then(res => {
      // const responseSign = JSON.parse(JSON.stringify(res));
      expect(res.user.emailVerified).toBe(true)
    })
  });
  it('es una funcion', () => {
    expect(typeof currentUser).toBe('function')
  })
  it('retornar user', () => {
    expect(currentUser).toBe(user)
  })


});
