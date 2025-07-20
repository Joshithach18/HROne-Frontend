# JSON Schema Builder

A modern, interactive web application for dynamically creating and editing JSON schemas with real-time preview capabilities.

## Live Demo

**[View Live Application](https://json-schema-builder-flax.vercel.app/)**

## Features

- **Dynamic Field Management**: Add, edit, and remove fields with intuitive controls
- **Multiple Data Types**: Support for String, Number, and Nested object types
- **Recursive Nesting**: Create deeply nested structures with unlimited hierarchy levels
- **Real-time Preview**: Live JSON output that updates instantly as you build your schema
- **Professional UI**: Clean, responsive interface built with Ant Design components
- **Tabbed Interface**: Separate views for schema building and JSON preview
- **Field Name Editing**: Inline editing of field names with immediate feedback

## Technology Stack

- **Frontend**: React.js
- **UI Library**: Ant Design
- **Icons**: Ant Design Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/json-schema-builder.git
cd json-schema-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Dependencies

```json
{
  "antd": "^5.x.x",
  "@ant-design/icons": "^5.x.x",
  "react": "^18.x.x",
  "react-dom": "^18.x.x"
}
```

## Usage

### Building a Schema

1. **Add Fields**: Click the "Add Field" button to create new top-level fields
2. **Edit Field Names**: Click on any field name input to modify the key name
3. **Select Types**: Choose from String, Number, or Nested using the dropdown menu
4. **Create Nested Structures**: Select "Nested" type and use "Add Nested" to create sub-fields
5. **Remove Fields**: Use the delete button to remove unwanted fields

### Viewing Results

Switch to the "JSON Preview" tab to see the real-time generated JSON schema based on your field configuration.

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styles
├── index.js        # Entry point
└── index.css       # Global styles
```

## Features in Detail

### Field Types

- **String**: Basic text field type
- **Number**: Numeric field type
- **Nested**: Object type that can contain other fields

### Nested Field Support

The application supports unlimited nesting levels. Each nested field can contain its own set of sub-fields, allowing for complex hierarchical data structures.

### Real-time Updates

All changes to the schema are reflected immediately in the JSON preview, providing instant feedback during the building process.

## Deployment

This application is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project and deploy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Support

For support, please open an issue in the GitHub repository or contact the maintainer.

## Acknowledgments

- Built with React.js for optimal performance and user experience
- UI components provided by Ant Design
- Deployed using Vercel's seamless deployment platform
