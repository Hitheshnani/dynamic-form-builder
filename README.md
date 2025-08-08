# Dynamic Form Builder

A powerful React-based form builder application that allows users to create, configure, and manage dynamic forms with advanced features like validation, derived fields, and drag-and-drop reordering.

## Features

- **Dynamic Form Creation**: Build forms with various field types (text, number, textarea, select, radio, checkbox, date)
- **Field Configuration**: Configure labels, required status, default values, and validation rules
- **Advanced Validation**: Support for required fields, min/max length, email format, password rules, and numeric constraints
- **Derived Fields**: Create fields that automatically calculate values based on other fields (e.g., age from date of birth)
- **Drag & Drop Reordering**: Intuitive field reordering with visual feedback
- **Form Preview**: Real-time preview of forms with validation and derived field updates
- **Form Management**: Save, load, and manage multiple forms with localStorage persistence
- **Responsive Design**: Modern Material-UI interface that works on all devices

## Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for UI components
- **React Router DOM** for navigation
- **React Beautiful DnD** for drag-and-drop functionality
- **Vite** for build tooling
- **localStorage** for data persistence

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

### Creating Forms

1. Navigate to the "Create Form" page
2. Enter a form name
3. Click "Add Field" to add form fields
4. Configure each field:
   - Set the field type (text, number, textarea, etc.)
   - Add a label and default value
   - Toggle required status
   - Add validation rules
   - Configure derived field logic if needed
5. Drag and drop fields to reorder them
6. Save the form when complete

### Field Types

- **Text Input**: Single-line text input
- **Number Input**: Numeric input with validation
- **Text Area**: Multi-line text input
- **Dropdown**: Select from predefined options
- **Radio Buttons**: Single selection from options
- **Checkbox**: Boolean true/false input
- **Date Picker**: Date selection input

### Validation Rules

- **Required**: Field must have a value
- **Min/Max Length**: String length constraints
- **Email Format**: Validates email address format
- **Password Rules**: Minimum 8 characters with at least one number
- **Min/Max Value**: Numeric value constraints

### Derived Fields

Create fields that automatically calculate values based on other fields:
- Select parent fields that the derived field depends on
- Define a formula or logic (e.g., "Age derived from DOB")
- The field will update automatically when parent fields change

### Previewing Forms

1. Click "Preview" in the navigation to see the current form
2. Fill out the form to test validation and derived fields
3. Submit the form to see the collected data

### Managing Forms

1. Go to "My Forms" to see all saved forms
2. Click "Preview" on any form to load it
3. Delete forms you no longer need

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── FieldEditor.tsx  # Field configuration component
│   └── FormRenderer.tsx # Form display component
├── pages/              # Page components
│   ├── CreateForm.tsx  # Form builder page
│   ├── PreviewForm.tsx # Form preview page
│   └── MyForms.tsx     # Form management page
├── store/              # Redux store configuration
│   ├── store.ts        # Main store setup
│   └── slices/         # Redux slices
│       ├── formBuilderSlice.ts    # Current form state
│       └── savedFormsSlice.ts     # Saved forms state
├── types/              # TypeScript type definitions
│   └── form.ts         # Form-related types
├── utils/              # Utility functions
│   ├── storage.ts      # localStorage utilities
│   ├── validation.ts   # Field validation logic
│   └── derivedFields.ts # Derived field calculations
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Development

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Redux Toolkit for state management
- Material-UI for consistent styling
- Responsive design principles

### Key Features Implementation

- **Drag & Drop**: Uses react-beautiful-dnd for smooth field reordering
- **Validation**: Real-time validation with custom error messages
- **Derived Fields**: Automatic calculation and updates based on parent field changes
- **Persistence**: localStorage integration for form storage
- **State Management**: Redux Toolkit slices for organized state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.
