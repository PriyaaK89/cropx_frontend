const BASE_URL = `${process.env.REACT_APP_BASE_URL}`
console.log(BASE_URL,"base_url")

export const Config = {
    Signup_url: `${BASE_URL}signup`,
    Login_url: `${BASE_URL}login`,
    DistributorRequest_url: `${BASE_URL}distributorRequest`,
    Get_Banner_url: `${BASE_URL}banner/get-banners`,
    Get_Categories: `${BASE_URL}category/get-category`,
    Get_Products: `${BASE_URL}product/get-products`,
    Get_Product_Details: `${BASE_URL}product/get-product-details`,
    Add_to_cart: `${BASE_URL}cart/add-item`,
    decrease_item: `${BASE_URL}cart/decrease-quanity`,
    get_cart_items: `${BASE_URL}cart`,
    remove_cart_item: `${BASE_URL}cart/remove-all-items`
}