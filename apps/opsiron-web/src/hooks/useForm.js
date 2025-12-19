import { useState, useCallback } from 'react';

/**
 * useForm - Custom Hook for Form Management
 * * @param {Object} initialValues - Formun başlangıç değerleri
 * @param {Function} validate - (Opsiyonel) Değerleri kontrol edip hata objesi döndüren fonksiyon
 * @returns {Object} Form yönetimi için gerekli metodlar ve state'ler
 */
export default function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // Kullanıcı bir şeye dokundu mu?
  const [isSuccess, setIsSuccess] = useState(false); // Başarılı gönderim durumu

  // Tek bir alanın değişimini yönetir
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Checkbox desteği de ekleyelim
    const val = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    setIsDirty(true);

    // Kullanıcı yazarken o alanın hatasını temizle (UX iyileştirmesi)
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Manuel olarak bir alanı set etmek için (Select box vb. custom componentler için)
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Form gönderimi
  const handleSubmit = useCallback(async (onSubmitHandler, e) => {
    if (e) e.preventDefault(); // Sayfa yenilenmesini engelle

    setIsSubmitting(true);
    setIsSuccess(false);

    // 1. Validasyon Kontrolü
    let validationErrors = {};
    if (validate) {
      validationErrors = validate(values);
    }

    // Hata varsa işlemi durdur ve hataları set et
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // 2. Hata yoksa dışarıdan gelen submit fonksiyonunu çalıştır
    try {
      await onSubmitHandler(values);
      setIsSuccess(true);
      setErrors({}); // Hataları temizle
    } catch (err) {
      // API hatası vs. olursa genel bir hata mesajı set edilebilir
      console.error("Form submission error:", err);
      setErrors({ submit: "Bir hata oluştu. Lütfen tekrar deneyin." });
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  // Formu sıfırla
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
    setIsSuccess(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    isSuccess,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    setValues // Gerekirse toplu update için
  };
}