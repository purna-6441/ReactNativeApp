import axios from 'axios';
import { Alert } from 'react-native';

// const BASE_API_URL = 'http://10.0.2.2:44382/Product'; // Use your actual API base URL

// export const fetchProducts = async (startIndex = 1, endIndex = 10) => {
//   const url = `${BASE_API_URL}/GetProduct?iStartIndex=${startIndex}&iEndIndex=${endIndex}`;
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

//export const fetchProductsByGender = async (gender: string, startIndex = 1, endIndex = 10) => {
  //const url = `${BASE_API_URL}/GetProduct?gender=${encodeURIComponent(gender)}&iStartIndex=${startIndex}&iEndIndex=${endIndex}`;
 // try {
    //const response = await axios.get(url);
    //return response.data;
  //} catch (error) {
    //console.error('Error fetching products by gender:', error);
    //throw error;
  //}
//};

//export const fetchProductById = async (id: number | string) => {
  //const url = `${BASE_API_URL}/GetProductById?id=${id}`;
  //try {
    //const response = await axios.get(url);
    //return response.data;
  //} catch (error) {
    //console.error('Error fetching product by id:', error);
    //throw error;
  // }
//};

const BASE_COMPANY_API_URL = 'http://172.16.0.52:5272/Company' // 'http://172.16.0.52:44306/Company'; // Assumed company API base URL

export const fetchCompanyList = async () => {
  const url = `${BASE_COMPANY_API_URL}/GetCompanyList`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching company list:', error);
    throw error;
  }
};

const BASE_API_URL = 'http://172.16.0.52:5272/Company'; // Use your actual API base URL

export const fetchProductsByCategory = async (categoryName: string, startIndex: number) => {
  const url = `${BASE_API_URL}/GetProductList?categoryName=${encodeURIComponent(categoryName)}&startingIndex=${startIndex}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};
