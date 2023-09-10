
import { when } from 'jest-when'
import { getData } from '../getdata'
import {passWordValidate} from '../passwordValidate'

jest.mock('../components/getdata')


const testEmail = "test@gmail.com"
const userFixture = {
                    email: testEmail,
                    fullname: "Test Test",
                    password: "testing1234",
                    status: "unlocked"
}

describe("test passwordValidate function success", () => {

    test("test with fixture", async () => {
        when(getData).calledWith(testEmail).mockReturnValue(userFixture)
        let result = passWordValidate(testEmail,"testing1234")
        expect(result).toBe(true)

       
    });
})


describe("test passwordValidate function fail", () => {

    test("test with fixture", async () => {
        when(getData).calledWith(testEmail).mockReturnValue(userFixture)
        let result = passWordValidate(testEmail,"nottesting1234")
        expect(result).toBe(false)

       
    });
    test("test with undefined", async () => {
        when(getData).calledWith(testEmail).mockReturnValue(userFixture)
        let result = passWordValidate("notexisting@gmail.com","nottesting1234")
        expect(result).toBe(false)

       
    });
})

