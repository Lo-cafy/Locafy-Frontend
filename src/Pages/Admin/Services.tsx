 
import React, { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { Download, Plus, RefreshCw } from 'lucide-react';
import ServiceStats from '@/Components/Admin/Services/ServiceStats';
import ServiceFilters from '@/Components/Admin/Services/ServiceFilters';
import ServiceGrid from '@/Components/Admin/Services/ServiceGrid';
import { adminService } from '@/services/admin.service';
import type { Service } from '@/types/service.types';

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchServices();
  }, [currentPage, statusFilter]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await adminService.getServices({
        page: currentPage,
        limit: 9,
        status: statusFilter === 'all' ? undefined : statusFilter
      });
      if (response.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveService = async (serviceId: string) => {
    try {
      const response = await adminService.approveService(serviceId);
      if (response.success) {
        fetchServices();
      }
    } catch (error) {
      console.error('Failed to approve service:', error);
    }
  };

  const handleRejectService = async (serviceId: string, reason: string) => {
    try {
      const response = await adminService.rejectService(serviceId, reason);
      if (response.success) {
        fetchServices();
      }
    } catch (error) {
      console.error('Failed to reject service:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Service Management</h1>
          <p className="text-gray-400 text-base sm:text-lg">Manage all available services</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50 flex-1 sm:flex-initial">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white shadow-sm flex-1 sm:flex-initial">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ServiceStats />

      {/* Filters */}
      <ServiceFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Services Grid */}
      {loading ? (
        <div className="col-span-3 text-center py-12 text-gray-400">Loading services...</div>
      ) : (
        <ServiceGrid 
          services={services}
          onApprove={handleApproveService}
          onReject={handleRejectService}
        />
      )}

      {/* Load More */}
      <div className="text-center">
        <Button 
          variant="outline" 
          className="bg-gray-800/30 backdrop-blur border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={loading}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Load More Services
        </Button>
      </div>
    </div>
  );
};

export default AdminServices;