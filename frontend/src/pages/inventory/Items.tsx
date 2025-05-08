import React, { useState, ChangeEvent } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import Table, { Column } from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { Form, Input, Select, TextArea, Button } from '../../components/forms';
import { Item } from '../../types/inventory.types';

const UNIT_OPTIONS = [
  { value: '', label: 'Select Unit' },
  { value: 'pcs', label: 'Pieces' },
  { value: 'kg', label: 'Kilograms' },
  { value: 'liter', label: 'Liters' },
  { value: 'box', label: 'Boxes' },
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'category-1', label: 'Electronics' },
  { value: 'category-2', label: 'Office Supplies' },
  { value: 'category-3', label: 'Furniture' },
  { value: 'category-4', label: 'Raw Materials' },
  { value: 'category-5', label: 'Packaging' },
];

const Items: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  // Mock data for demonstration
  const items: Item[] = Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i + 1}`,
    name: `Item ${i + 1}`,
    description: `Description for Item ${i + 1}`,
    unitPrice: Math.round(Math.random() * 1000) / 10,
    unitMeasurement: ['pcs', 'kg', 'liter', 'box'][Math.floor(Math.random() * 4)],
    categoryId: `category-${Math.floor(Math.random() * 5) + 1}`,
    category: {
      id: `category-${Math.floor(Math.random() * 5) + 1}`,
      name: ['Electronics', 'Office Supplies', 'Furniture', 'Raw Materials', 'Packaging'][Math.floor(Math.random() * 5)],
      description: 'Category description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddItem = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };
  
  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const handleViewItem = (item: Item) => {
    // View item details
    console.log('View item', item);
  };
  
  const handleDeleteItem = (item: Item) => {
    // Delete item
    console.log('Delete item', item);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save item
    console.log('Save item', selectedItem);
    setIsModalOpen(false);
  };
  
  const columns: Column<Item>[] = [
    { header: 'Name', accessor: (item: Item) => item.name },
    { header: 'Category', accessor: (item: Item) => item.category?.name },
    { header: 'Price', accessor: (item: Item) => `$${item.unitPrice.toFixed(2)}` },
    { header: 'Unit', accessor: (item: Item) => item.unitMeasurement },
    {
      header: 'Actions',
      accessor: (item: Item) => (
        <div className="flex space-x-2">
          <button
            className="p-1 text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              handleViewItem(item);
            }}
          >
            <Eye size={18} />
          </button>
          <button
            className="p-1 text-yellow-600 hover:text-yellow-800"
            onClick={(e) => {
              e.stopPropagation();
              handleEditItem(item);
            }}
          >
            <Edit size={18} />
          </button>
          <button
            className="p-1 text-red-600 hover:text-red-800"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteItem(item);
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Items</h1>
        <Button
          variant="primary"
          onClick={handleAddItem}
        >
          <Plus className="mr-2" size={16} />
          Add Item
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Input
                label="Search"
                icon={<Search size={18} />}
                name="search"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                onClick={() => {}}
              >
                <Filter className="mr-2" size={16} />
                Filter
              </Button>
              
              <Select
                label="Category Filter"
                name="categoryFilter"
                options={CATEGORY_OPTIONS}
                onChange={() => {}}
                value=""
              />
            </div>
          </div>
        </div>
        
        <Table
          columns={columns}
          data={filteredItems}
          keyExtractor={(item) => item.id}
          onRowClick={handleViewItem}
        />
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem ? 'Edit Item' : 'Add New Item'}
      >
        <Form
          onSubmit={handleSubmit}
          title={selectedItem ? 'Edit Item' : 'Add New Item'}
          description="Fill in the item details below"
        >
          <Input
            label="Item Name"
            name="name"
            value={selectedItem?.name || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedItem(prev => prev ? { ...prev, name: e.target.value } : null)}
            placeholder="Enter item name"
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Unit Price"
              name="unitPrice"
              type="number"
              step="0.01"
              value={selectedItem?.unitPrice || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedItem(prev => prev ? { ...prev, unitPrice: parseFloat(e.target.value) } : null)}
              placeholder="0.00"
              required
            />
            
            <Select
              label="Unit Measurement"
              name="unitMeasurement"
              value={selectedItem?.unitMeasurement || ''}
              onChange={(value: string) => setSelectedItem(prev => prev ? { ...prev, unitMeasurement: value } : null)}
              required
              options={UNIT_OPTIONS}
            />
          </div>
          
          <Select
            label="Category"
            name="category"
            value={selectedItem?.categoryId || ''}
            onChange={(value: string) => setSelectedItem(prev => prev ? { ...prev, categoryId: value } : null)}
            required
            options={CATEGORY_OPTIONS.slice(1)}
          />
          
          <TextArea
            label="Description"
            name="description"
            value={selectedItem?.description || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSelectedItem(prev => prev ? { ...prev, description: e.target.value } : null)}
            placeholder="Enter item description"
            rows={3}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default Items;