import React, { useState } from 'react';
import { Button, Form, Input, Select, Switch } from '../../components/forms';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog } from '../../components/overlays';

type Permission = 'read' | 'write' | 'manage_users' | 'manage_roles' | 'manage_settings' | 'all';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface NewUser {
  name: string;
  email: string;
  role: string;
  password: string;
  status: 'active' | 'inactive';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface NewRole {
  name: string;
  description: string;
  permissions: Permission[];
}

const UsersAndRoles: React.FC = () => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    role: '',
    password: '',
    status: 'active'
  });

  const [newRole, setNewRole] = useState<NewRole>({
    name: '',
    description: '',
    permissions: []
  });

  const permissions: Permission[] = [
    'read',
    'write',
    'manage_users',
    'manage_roles',
    'manage_settings',
    'all'
  ];

  // Sample data - replace with actual API calls
  const [users] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@warehouse.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@warehouse.com', role: 'Manager', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@warehouse.com', role: 'Staff', status: 'inactive' },
  ]);

  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['all'],
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Department management access',
      permissions: ['read', 'write', 'manage_users'],
    },
    {
      id: '3',
      name: 'Staff',
      description: 'Basic access',
      permissions: ['read', 'write'],
    },
  ]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement user update
    console.log('Updating user:', editingUser?.id, newUser);
    setShowUserDialog(false);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      role: '',
      password: '',
      status: 'active'
    });
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement role update
    console.log('Updating role:', editingRole?.id, newRole);
    setShowRoleDialog(false);
    setEditingRole(null);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement user creation
    console.log('Creating user:', newUser);
    setShowUserDialog(false);
    setNewUser({
      name: '',
      email: '',
      role: '',
      password: '',
      status: 'active'
    });
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement role creation
    console.log('Creating role:', newRole);
    setShowRoleDialog(false);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  return (
    <div className="space-y-8">
      {/* Users Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Users</h2>
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setShowUserDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Roles</h2>
          <Button 
            variant="primary" 
            className="flex items-center"
            onClick={() => setShowRoleDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{role.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{role.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add User Dialog */}
      <Dialog
        open={showUserDialog}
        onClose={() => setShowUserDialog(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <Form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="space-y-4">
          <Input
            label="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <Select
            label="Role"
            value={newUser.role}
            onChange={value => setNewUser({ ...newUser, role: value })}
            options={roles.map(role => ({ value: role.name, label: role.name }))}
            required
          />
          {!editingUser && (
            <Input
              label="Password"
              type="password"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          )}
          <Switch
            label="Active"
            checked={newUser.status === 'active'}
            onChange={checked => setNewUser({ ...newUser, status: checked ? 'active' : 'inactive' })}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowUserDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </div>
        </Form>
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog
        open={showRoleDialog}
        onClose={() => setShowRoleDialog(false)}
        title={editingRole ? 'Edit Role' : 'Add New Role'}
      >
        <Form onSubmit={editingRole ? handleUpdateRole : handleAddRole} className="space-y-4">
          <Input
            label="Role Name"
            value={newRole.name}
            onChange={e => setNewRole({ ...newRole, name: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={newRole.description}
            onChange={e => setNewRole({ ...newRole, description: e.target.value })}
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="grid grid-cols-2 gap-2">
              {permissions.map(permission => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    checked={newRole.permissions.includes(permission)}
                    onChange={e => {
                      const updatedPermissions = e.target.checked
                        ? [...newRole.permissions, permission]
                        : newRole.permissions.filter(p => p !== permission);
                      setNewRole({ ...newRole, permissions: updatedPermissions as Permission[] });
                    }}
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowRoleDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

export default UsersAndRoles;
