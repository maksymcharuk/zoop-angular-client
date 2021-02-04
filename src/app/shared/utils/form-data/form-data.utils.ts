export class FormDataUtils {
  static objToFormData(obj): FormData {
    const formData = new FormData();
    for (const field of Object.keys(obj)) {
      if (obj[field] !== undefined || obj[field] != null) {
        formData.append(field, obj[field]);
      }
    }
    return formData;
  }
}
