
import { when } from 'jest-when'
import { getData } from '../components/getdata'
import {accountStatus} from '../components/accountStatus'

jest.mock('../components/getdata')


const testEmail = "test@gmail.com"
const testEmail2 = "test2@gmail.com"
const userFixture = {
                    email: testEmail,
                    fullname: "Test Test",
                    password: "testing1234",
                    status: "unlocked"
}
const userFixture2 = {
                    email: testEmail2,
                    fullname: "Test Test",
                    password: "testing1234",
                    status: "locked"
}

describe("test acountStatus function success", () => {

    test("test with unlocked fixture", async () => {
        when(getData).calledWith(testEmail).mockReturnValue(userFixture)
        let result = accountStatus(testEmail)
        expect(result).toBe(true)

       
    });
})


describe("test accountStatus function fail", () => {

    test("test with locked fixture", async () => {
        when(getData).calledWith(testEmail2).mockReturnValue(userFixture2)
        let result = accountStatus(testEmail2)
        expect(result).toBe(false)

       
    });
    test("test with undefined", async () => {
        when(getData).calledWith(testEmail).mockReturnValue(userFixture)
        let result = accountStatus("notexisting@gmail.com")
        expect(result).toBe(false)

       
    });
})

