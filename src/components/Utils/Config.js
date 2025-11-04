const BASE_URL = `${process.env.REACT_APP_BASE_URL}`
console.log(BASE_URL,"base_url")

export const Config = {
    Signup_url: `${BASE_URL}api/signup`,
    Login_url: `${BASE_URL}api/login`,
    DistributorRequest_url: `${BASE_URL}api/distributorRequest`
}