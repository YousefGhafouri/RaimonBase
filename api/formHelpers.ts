/**
 * Recursively converts a nested JavaScript object into FormData
 * using dot notation (e.g., images[0].file), which ASP.NET Core expects.
 *
 * @param obj - The input object to convert.
 * @param form - An optional FormData instance to append to.
 * @param parentKey - Internal use for recursive key construction.
 * @returns FormData object with dot-notation keys.
 */
export function objectToFormDataDotNotation(obj: any, form?: FormData, parentKey?: string): FormData {
  const formData = form || new FormData();

  // Loop through each key/value pair in the object
  Object.entries(obj).forEach(([key, value]) => {
      // Build full key with dot notation, e.g., "images[0].file"
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(value)) {
          // If value is an array, iterate over its items
          value.forEach((item, index) => {
              const arrayKey = `${fullKey}[${index}]`;

              if (item instanceof File || item instanceof Blob) {
                  // Append file directly
                  formData.append(arrayKey, item);
              } else if (typeof item === 'object' && item !== null) {
                  // Recurse for nested objects inside the array
                  objectToFormDataDotNotation(item, formData, arrayKey);
              } else {
                  // Append primitive array values
                  formData.append(arrayKey, item as any);
              }
          });
      } else if (value instanceof Blob ) {
        formData.append(fullKey, value);
      } else if (value instanceof File) {
          // Append individual file or blob
          formData.append(fullKey, value, value.name);
      } else if (typeof value === 'object' && value !== null) {
          // Recurse for nested objects
          objectToFormDataDotNotation(value, formData, fullKey);
      } else if (value !== undefined && value !== null) {
          // Append primitive values (string, number, boolean)
          formData.append(fullKey, value as string);
      }
  });

  return formData;
}
