import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { FormSchema } from "./types";
import FormRenderer from "./FormRenderer";

const defaultSchema: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },

        { value: "51-200", label: "51-200 employees" },

        { value: "201-1000", label: "201-1000 employees" },

        { value: "1000+", label: "1000+ employees" },
      ],
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },

        { value: "healthcare", label: "Healthcare" },

        { value: "finance", label: "Finance" },

        { value: "retail", label: "Retail" },

        { value: "other", label: "Other" },
      ],
    },
    {
      id: "timeline",
      type: "select",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },

        { value: "short", label: "Short-term (1-3 months)" },

        { value: "medium", label: "Medium-term (3-6 months)" },

        { value: "long", label: "Long-term (6+ months)" },
      ],
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share...",
    },
  ],
};

function App() {
  const [schema, setSchema] = useState<FormSchema>(defaultSchema);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleEditorChange = (newValue: string) => {
    try {
      const parsedSchema = JSON.parse(newValue);
      setSchema(parsedSchema);
      setJsonError(null);
    } catch (error) {
      setJsonError("Invalid JSON format.");
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold pt-5">
        <b>Dynamic Form Generator</b>
      </h1>
      <div className="flex flex-col md:flex-row h-screen pt-5">
        <div className="w-full md:w-1/2 p-4 border-r h-full md:h-auto">
          <h2 className="text-lg font-bold mb-2">JSON Editor</h2>
          <AceEditor
            mode="json"
            theme="github"
            value={JSON.stringify(schema, null, 2)}
            onChange={handleEditorChange}
            name="json-editor"
            width="100%"
            height="100%"
            style={{ minHeight: "400px" }}
          />
          {jsonError && <p className="text-red-500 mt-2">{jsonError}</p>}
        </div>
        <div className="w-full md:w-1/2 p-4">
          <FormRenderer schema={schema} />
        </div>
      </div>
    </>
  );
}

export default App;
