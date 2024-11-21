Dynamic Form Generator

This project is a dynamic form generator application that allows users to define JSON schemas to create forms dynamically. The forms are rendered in real-time, and submissions can be downloaded as JSON.

Features
Real-time form rendering based on JSON schema.
JSON validation in the integrated editor.
Download form submissions as JSON files.
Supports text, email, select, radio, and textarea fields.
Responsive layout for better usability on all devices.

Setup Instructions
Prerequisites
Ensure you have the following installed:
Node.js (v14 or later)
npm (v6 or later) 

Clone the Repository
git clone https://github.com/your-username/dynamic-form-generator.git
cd dynamic-form-generator

Install Dependencies
npm install

Run the Application
npm start

* Open your browser and navigate to: http://localhost:3000 *

Sample JSON Schema
{

  "formTitle": "Project Requirements Survey",

  "formDescription": "Please fill out this survey about your project needs",

  "fields": [

    {

      "id": "name",

      "type": "text",

      "label": "Full Name",

      "required": true,

      "placeholder": "Enter your full name"

    },

    {

      "id": "email",

      "type": "email",

      "label": "Email Address",

      "required": true,

      "placeholder": "you@example.com",

      "validation": {

        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",

        "message": "Please enter a valid email address"

      }

    },

    {

      "id": "companySize",

      "type": "select",

      "label": "Company Size",

      "required": true,

      "options": [

        { "value": "1-50", "label": "1-50 employees" },

        { "value": "51-200", "label": "51-200 employees" },

        { "value": "201-1000", "label": "201-1000 employees" },

        { "value": "1000+", "label": "1000+ employees" }

      ]

    },

    {

      "id": "industry",

      "type": "radio",

      "label": "Industry",

      "required": true,

      "options": [

        { "value": "tech", "label": "Technology" },

        { "value": "healthcare", "label": "Healthcare" },

        { "value": "finance", "label": "Finance" },

        { "value": "retail", "label": "Retail" },

        { "value": "other", "label": "Other" }

      ]

    },

    {

      "id": "timeline",

      "type": "select",

      "label": "Project Timeline",

      "required": true,

      "options": [

        { "value": "immediate", "label": "Immediate (within 1 month)" },

        { "value": "short", "label": "Short-term (1-3 months)" },

        { "value": "medium", "label": "Medium-term (3-6 months)" },

        { "value": "long", "label": "Long-term (6+ months)" }

      ]

    },

    {

      "id": "comments",

      "type": "textarea",

      "label": "Additional Comments",

      "required": false,

      "placeholder": "Any other details you'd like to share..."

    }

  ]

}

Local Development Guide

File Structure
src/
├── App.tsx             # Main application entry point
├── FormRenderer.tsx    # Component to render forms dynamically
├── types.ts            # Types for JSON schema and form data
├── index.css           # CSS and styling files
└── utils/              # Utility functions

Key Commands
Start Development Server: npm start or yarn start
Run Tests: npm test or yarn test
Build for Production: npm run build or yarn build

Modify JSON Schema
Edit the JSON schema in the integrated editor on the left pane of the application.

Contributing
Contributions are welcome! Please open an issue or submit a pull request.







