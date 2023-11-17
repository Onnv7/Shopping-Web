import { useState } from "react";
import { ZodType, z } from "zod";

type ValidationResult<T> = {
  [K in keyof T]?: string;
};

export function useValidator<T>(validationSchema: ZodType<T>) {
  const [errors, setErrors] = useState<ValidationResult<T>>({});

  const validate = (dataToValidate: T): boolean => {
    try {
      validationSchema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("🚀 ~ file: useValidator.ts:18 ~ validate ~ error:", error);
        const newErrors: ValidationResult<T> = {};

        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const fieldName = err.path[0] as keyof T;
            newErrors[fieldName] = err.message;
          }
        });

        setErrors(newErrors);
      }
      return false;
    }
  };

  return {
    errors,
    validate,
  };
}

export default useValidator;
