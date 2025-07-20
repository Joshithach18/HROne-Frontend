import React, { useState, useCallback } from 'react';
import { Card, Input, Select, Button, Space, Tabs, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

const createField = (name = '', type = 'Field Type', nested = []) => ({
  id: Date.now() + Math.random(),
  name,
  type,
  ...(type === 'Nested' && { nested })
});

const getDefaultValue = (type) => {
  switch (type) {
    case 'String':
      return '';
    case 'Number':
      return 0;
    case 'Nested':
      return {};
    case 'Boolean':
      return false;
    case 'Array':
      return [];
    case 'ObjectID':
      return {};
    case 'Date':
      return new Date().toISOString();
    case 'Email':
      return '';
    case 'URL':
      return '';
    case 'Phone':
      return '';
    case 'float':
      return 0.0;
    default:
      return '';
  }
};

const fieldsToJson = (fields) => {
  const result = {};
  
  fields.forEach(field => {
    if (field.name.trim()) {
      if (field.type === 'Nested' && field.nested && field.nested.length > 0) {
        result[field.name] = fieldsToJson(field.nested);
      } else {
        result[field.name] = getDefaultValue(field.type);
      }
    }
  });
  
  return result;
};

const FieldRow = ({ field, onUpdate, onDelete, onAddField, onAddNested, level = 0, isLast = false }) => {
  const handleNameChange = (value) => {
    onUpdate({ ...field, name: value });
  };

  const handleTypeChange = (value) => {
    const updatedField = { ...field, type: value };
    if (value === 'Nested' && !field.nested) {
      updatedField.nested = [];
    } else if (value !== 'Nested') {
      delete updatedField.nested;
    }
    onUpdate(updatedField);
  };

  const handleNestedUpdate = (index, updatedNestedField) => {
    const newNested = [...(field.nested || [])];
    newNested[index] = updatedNestedField;
    onUpdate({ ...field, nested: newNested });
  };

  const handleNestedDelete = (index) => {
    const newNested = [...(field.nested || [])];
    newNested.splice(index, 1);
    onUpdate({ ...field, nested: newNested });
  };

  const handleAddNestedField = () => {
    const newNested = [...(field.nested || []), createField()];
    onUpdate({ ...field, nested: newNested });
  };

  return (
    <div style={{ marginLeft: level * 20, marginBottom: 16 }}>
      <Card size="small" style={{ backgroundColor: level > 0 ? '#fafafa' : 'white' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="Field name"
              value={field.name}
              onChange={(e) => handleNameChange(e.target.value)}
              style={{ width: 150 }}
            />
            <Select
              value={field.type}
              onChange={handleTypeChange}
              style={{ width: 120 }}
            >
              <Option value="String">String</Option>
              <Option value="Number">Number</Option>
              <Option value="Nested">Nested</Option>
              <Option value="Boolean">Boolean</Option>
              <Option value="Array">Array</Option>
              <Option value="ObjectID">ObjectID</Option>
              <Option value="Date">Date</Option>
              <Option value="Email">Email</Option>
              <Option value="URL">URL</Option>
              <Option value="Phone">Phone</Option>
              <Option value="float">float</Option>
            </Select>
          </Space>
          <Space>
            {field.type === 'Nested' && (
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddNestedField}
                size="small"
              >
                Add Nested
              </Button>
            )}
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(field.id)}
              size="small"
            />
          </Space>
        </Space>
      </Card>

      {field.type === 'Nested' && field.nested && field.nested.length > 0 && (
        <div style={{ marginTop: 8, marginLeft: 10, borderLeft: '2px solid #e8e8e8', paddingLeft: 10 }}>
          {field.nested.map((nestedField, index) => (
            <div key={nestedField.id}>
              <FieldRow
                field={nestedField}
                onUpdate={(updatedField) => handleNestedUpdate(index, updatedField)}
                onDelete={() => handleNestedDelete(index)}
                onAddField={() => {
                  const newNested = [...(field.nested || [])];
                  newNested.splice(index + 1, 0, createField());
                  onUpdate({ ...field, nested: newNested });
                }}
                onAddNested={handleAddNestedField}
                level={level + 1}
                isLast={index === field.nested.length - 1}
              />
              {/* Add Field button after each nested field */}
              <div style={{ 
                marginLeft: (level + 1) * 20, 
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: '#f0f0f0',
                  zIndex: 1
                }} />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const newNested = [...(field.nested || [])];
                    newNested.splice(index + 1, 0, createField());
                    onUpdate({ ...field, nested: newNested });
                  }}
                  size="small"
                  style={{ 
                    backgroundColor: '#fafafa',
                    border: '1px solid #f0f0f0',
                    color: '#999',
                    zIndex: 2,
                    fontSize: '11px',
                    height: '24px',
                    borderRadius: '12px',
                    padding: '0 8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0f8ff';
                    e.target.style.borderColor = '#1890ff';
                    e.target.style.color = '#1890ff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#fafafa';
                    e.target.style.borderColor = '#f0f0f0';
                    e.target.style.color = '#999';
                  }}
                >
                  Add Field
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Field button after each top-level field */}
      {level === 0 && (
        <div style={{ 
          marginTop: 12, 
          marginBottom: 12,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: '#e8e8e8',
            zIndex: 1
          }} />
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={onAddField}
            size="small"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e8e8e8',
              color: '#666',
              zIndex: 2,
              fontSize: '12px',
              height: '28px',
              borderRadius: '14px',
              padding: '0 12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f8ff';
              e.target.style.borderColor = '#1890ff';
              e.target.style.color = '#1890ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#e8e8e8';
              e.target.style.color = '#666';
            }}
          >
            Add Field
          </Button>
        </div>
      )}
    </div>
  );
};

const JsonSchemaBuilder = () => {
  const [fields, setFields] = useState([createField()]);
  const [activeTab, setActiveTab] = useState('1');

  const handleFieldUpdate = useCallback((index, updatedField) => {
    setFields(prev => {
      const newFields = [...prev];
      newFields[index] = updatedField;
      return newFields;
    });
  }, []);

  const handleFieldDelete = useCallback((fieldId) => {
    setFields(prev => {
      const newFields = prev.filter(field => field.id !== fieldId);
      return newFields.length > 0 ? newFields : [createField()];
    });
  }, []);

  const handleAddField = useCallback((afterIndex) => {
    setFields(prev => {
      const newFields = [...prev];
      const insertIndex = afterIndex !== undefined ? afterIndex + 1 : newFields.length;
      newFields.splice(insertIndex, 0, createField());
      return newFields;
    });
  }, []);

  const jsonOutput = fieldsToJson(fields);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>JSON Schema Builder</h1>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Schema Builder" key="1">
          <Card>

            
            <Divider orientation="left"></Divider>
            
            <div>
              {fields.map((field, index) => (
                <FieldRow
                  key={field.id}
                  field={field}
                  onUpdate={(updatedField) => handleFieldUpdate(index, updatedField)}
                  onDelete={handleFieldDelete}
                  onAddField={() => handleAddField(index)}
                  level={0}
                  isLast={index === fields.length - 1}
                />
              ))}
            </div>
          </Card>
        </TabPane>
        
        <TabPane tab="JSON Preview" key="2">
          <Card>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: 16,
                borderRadius: 6,
                overflow: 'auto',
                maxHeight: 500,
                fontSize: 14,
                lineHeight: 1.5
              }}
            >
              {JSON.stringify(jsonOutput, null, 2)}
            </pre>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default JsonSchemaBuilder;