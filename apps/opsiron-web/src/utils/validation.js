/**
 * Opsiron Validation Utils
 * Form doğrulama kuralları ve yardımcı fonksiyonlar.
 */

// ============================================
// REGEX PATTERNS
// ============================================

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// TR Telefon Formatı: 5xxxxxxxxx, 05xxxxxxxxx, +905xxxxxxxxx kabul eder.
// Boşlukları ve parantezleri temizleyip kontrol edeceğiz.
const PHONE_REGEX = /^(05|5|\+905)\d{9}$/; 

// ============================================
// ATOMIC VALIDATORS (Tekil Kontroller)
// ============================================

export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
};

export const isEmail = (value) => {
  return value && EMAIL_REGEX.test(value);
};

export const isPhone = (value) => {
  // Sadece rakamları bırak
  const cleanPhone = String(value).replace(/[\s()-]/g, '');
  return cleanPhone && PHONE_REGEX.test(cleanPhone);
};

export const minLength = (value, min) => {
  return value && value.length >= min;
};

export const maxLength = (value, max) => {
  return value && value.length <= max;
};

// ============================================
// FORM SCHEMAS (Özel Form Validasyonları)
// ============================================

/**
 * İletişim Formu Validasyonu
 * (Contact.jsx için)
 */
export const validateContactForm = (values) => {
  let errors = {};

  // Ad Soyad
  if (isEmpty(values.name)) {
    errors.name = "Ad Soyad alanı zorunludur.";
  } else if (!minLength(values.name, 3)) {
    errors.name = "Ad Soyad en az 3 karakter olmalıdır.";
  }

  // Şirket Adı
  if (isEmpty(values.company)) {
    errors.company = "İşletme adı zorunludur.";
  }

  // E-posta
  if (isEmpty(values.email)) {
    errors.email = "E-posta adresi zorunludur.";
  } else if (!isEmail(values.email)) {
    errors.email = "Geçerli bir e-posta adresi giriniz.";
  }

  // Telefon
  if (isEmpty(values.phone)) {
    errors.phone = "Telefon numarası zorunludur.";
  } else if (!isPhone(values.phone)) {
    errors.phone = "Geçerli bir telefon numarası giriniz (5XX...).";
  }

  // İlgi Alanı
  if (isEmpty(values.interest)) {
    errors.interest = "Lütfen bir ilgi alanı seçiniz.";
  }

  // Mesaj (Opsiyonel olabilir ama biz zorunlu tutalım)
  if (isEmpty(values.message)) {
    errors.message = "Lütfen operasyonel zorluklarınızı kısaca anlatın.";
  } else if (!minLength(values.message, 10)) {
    errors.message = "Mesajınız çok kısa, lütfen biraz daha detay verin.";
  }

  return errors;
};

/**
 * ServeOps Pilot Başvuru Formu Validasyonu
 * (ServeOps.jsx için)
 */
export const validateServeOpsForm = (values) => {
  let errors = {};

  if (isEmpty(values.name)) errors.name = "Ad Soyad zorunludur.";
  
  if (isEmpty(values.businessName)) errors.businessName = "İşletme adı zorunludur.";
  
  if (isEmpty(values.posSystem)) errors.posSystem = "Kullandığınız POS sistemi bilgisi gereklidir.";
  
  if (isEmpty(values.problem)) {
    errors.problem = "Lütfen en büyük sorununuzu belirtin.";
  }

  return errors;
};