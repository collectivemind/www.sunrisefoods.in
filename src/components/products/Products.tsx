import React, { useState } from 'react';
import { 
  CakeSlice, 
  Search, 
  Plus,
  Filter,
  Grid,
  List,
  Edit,
  Trash2,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { Select } from '../ui/Select';
import { BreadProduct } from '../../types';

// Sample products data
const sampleProducts: BreadProduct[] = [
  {
    id: 'PRD-001',
    name: 'Sourdough Loaf',
    price: 6.50,
    category: 'loaf',
    imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'
  },
  {
    id: 'PRD-002',
    name: 'Ciabatta Rolls',
    price: 4.25,
    category: 'roll',
    imageUrl: 'https://images.pexels.com/photos/1387075/pexels-photo-1387075.jpeg'
  },
  {
    id: 'PRD-003',
    name: 'Chocolate Croissant',
    price: 3.75,
    category: 'pastry',
    imageUrl: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg'
  },
  {
    id: 'PRD-004',
    name: 'Artisan Baguette',
    price: 5.00,
    category: 'specialty',
    imageUrl: 'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg'
  },
  {
    id: 'PRD-005',
    name: 'Whole Wheat Bread',
    price: 5.75,
    category: 'loaf',
    imageUrl: 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg'
  },
  {
    id: 'PRD-006',
    name: 'Dinner Rolls',
    price: 4.50,
    category: 'roll',
    imageUrl: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg'
  }
];

export const Products: React.FC = () => {
  const [products] = useState<BreadProduct[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'loaf', label: 'Loaves' },
    { value: 'roll', label: 'Rolls' },
    { value: 'pastry', label: 'Pastries' },
    { value: 'specialty', label: 'Specialty' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue = sortBy === 'name' 
        ? a.name.localeCompare(b.name)
        : a.price - b.price;
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

  const handleSort = (value: string) => {
    if (value === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value as 'name' | 'price');
      setSortOrder('asc');
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <CakeSlice size={24} className="mr-2 text-amber-700" />
              Products
            </h1>
            <p className="text-gray-600 mt-1">Manage your bread products</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search products..."
            />
          </div>
          <div className="flex gap-2">
            <div className="w-48">
              <Select
                label="Category"
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
            <div className="w-40">
              <Select
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={handleSort}
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                size="md"
                icon={sortOrder === 'asc' ? <ArrowUpDown size={16} /> : <ArrowUpDown size={16} />}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              />
            </div>
            <div className="flex items-end gap-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                size="md"
                icon={<Grid size={16} />}
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'outline'}
                size="md"
                icon={<List size={16} />}
                onClick={() => setViewMode('list')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-lg font-bold text-amber-700">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 capitalize mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 size={14} />}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Edit size={14} />}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 size={14} />}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};