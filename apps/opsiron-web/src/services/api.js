/**
 * Opsiron API Service
 * * Tüm dış veri alışverişinin yönetildiği merkezi katman.
 * * Fetch API üzerine kurulu wrapper, interceptor ve hata yönetimi içerir.
 */

// Environment variable'dan URL al, yoksa development fallback kullan
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Özelleştirilmiş API Hatası
 * Backend'den dönen hata mesajlarını ve status kodlarını taşır.
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data; // Backend'den dönen validasyon hataları vb.
  }
}

/**
 * Request Interceptor (İstek öncesi işlemler)
 * Örn: Token ekleme, Content-Type belirleme
 */
const prepareHeaders = (options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  // İleride Auth eklenirse Token burada inject edilir:
  const token = localStorage.getItem('opsiron_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Response Interceptor (Cevap sonrası işlemler)
 * Hata kodlarını yakalar, JSON parse eder.
 */
const handleResponse = async (response) => {
  // 204 No Content durumunu handle et
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.indexOf("application/json") !== -1;
  
  const data = isJson ? await response.json() : await response.text();

  // Fetch API 4xx ve 5xx hatalarında reject etmez, manuel kontrol gerekir
  if (!response.ok) {
    // 401 Unauthorized durumunda kullanıcıyı log out yapabiliriz
    if (response.status === 401) {
      // window.location.href = '/login'; // Opsiyonel yönlendirme
      console.warn('Oturum süresi doldu.');
    }

    const errorMessage = (data && data.message) || response.statusText || 'Bir hata oluştu';
    throw new ApiError(errorMessage, response.status, data);
  }

  return data;
};

/**
 * Core Request Wrapper
 * Tüm metodların kullandığı ana fonksiyon
 */
const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = prepareHeaders(options);

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    // Network hataları (İnternet yok, sunucu kapalı) burada yakalanır
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new ApiError('Sunucuya erişilemiyor. Lütfen internet bağlantınızı kontrol edin.', 0);
    }
    throw error;
  }
};

// ============================================
// API METODLARI
// ============================================

export const api = {
  /**
   * GET İsteği
   * @param {string} endpoint - örn: '/products'
   */
  get: (endpoint) => request(endpoint, { method: 'GET' }),

  /**
   * POST İsteği
   * @param {string} endpoint - örn: '/contact'
   * @param {object} data - Gönderilecek veri
   */
  post: (endpoint, data) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  /**
   * PUT İsteği
   * @param {string} endpoint 
   * @param {object} data 
   */
  put: (endpoint, data) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  /**
   * DELETE İsteği
   * @param {string} endpoint 
   */
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;