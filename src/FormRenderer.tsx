import React, { useState } from "react";
import { FormSchema, Field } from "./types";

interface FormRendererProps {
  schema: FormSchema;
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    schema.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (field.validation) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(formData[field.id] || "")) {
          newErrors[field.id] = field.validation.message;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const downloadAsJSON = () => {
    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "form-submission.json"; // Set the filename
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <div key={field.id} className="mb-4">
            <label className="block font-medium mb-1">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div key={field.id} className="mb-4">
            <label className="block font-medium mb-1">{field.label}</label>
            <select
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        );
      case "radio":
        return (
          <div key={field.id} className="mb-4">
            <label className="block font-medium mb-1">{field.label}</label>
            <div className="flex flex-wrap gap-4">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={formData[field.id] === option.value}
                    onChange={() => handleChange(field.id, option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        );
      case "textarea":
        return (
          <div key={field.id} className="mb-4">
            <label className="block font-medium mb-1">{field.label}</label>
            <textarea
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">{schema.formTitle}</h1>
        <p className="mb-6">{schema.formDescription}</p>
        {schema.fields.map((field) => renderField(field))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {formData && (
        <div className="mt-4">
          <button
            onClick={downloadAsJSON}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          >
            Download as JSON
          </button>
        </div>
      )}
    </>
  );
};

export default FormRenderer;
