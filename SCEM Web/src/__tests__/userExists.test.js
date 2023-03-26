
import { when } from 'jest-when'
import { userExist } from '../components/userExist'
import { getData } from '../components/getdata'

jest.mock('../components/getdata')


const testEmail = "test@gmail.com"
const userFixture = {
    email: testEmail,
    fullname: "Test Test",
    password: "testing1234",
    status: "unlocked"
}

describe("test userExists function success", () => {

    test("test with fixture", async () => {
        when(getData).calledWith(testEmail).mockReturnValue(userFixture)
        let result = userExist(testEmail)
        expect(result).toBe(true)

       
    });
})

describe("test userExists function fail", () => {

    test("test with undefined", async () => {
        when(getData).calledWith(testEmail).mockReturnValue()
        let result = userExist(testEmail)
        expect(result).toBe(false)

       
    });
})
