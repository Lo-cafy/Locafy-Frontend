import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { Eye,  MoreHorizontal, Mail,  AlertCircle } from 'lucide-react';
import type { User } from '@/types/auth.types';
import { Card } from '@/ui/card'; 

interface UserTableProps {
  users: User[];
  onStatusUpdate: (userId: string, isActive: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onStatusUpdate }) => {
  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50 min-w-[800px]">
          <Table>
            <TableHeader className="bg-gray-700/30">
              <TableRow className="border-gray-700/50">
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300 hidden sm:table-cell">Join Date</TableHead>
                <TableHead className="text-gray-300 hidden sm:table-cell">Verified</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-700/30 transition-colors border-gray-700/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 sm:w-10 h-8 sm:h-10 border-2 border-gray-700/50">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.role === 'admin' 
                      ? 'bg-blue-600/20 text-blue-300 border-blue-400/30' 
                      : 'bg-gray-600/20 text-gray-300 border-gray-400/30'
                    }>
                      {user.role === 'admin' ? 'Service Provider' : 'Customer'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${user.isVerified ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <Badge className={user.isVerified 
                        ? 'bg-green-600/20 text-green-300 border-green-400/30'
                        : 'bg-red-600/20 text-red-300 border-red-400/30'
                      }>
                        {user.isVerified ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.isVerified ? (
                      <Badge className="bg-green-600/20 text-green-300 border-green-400/30">
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-600/20 text-orange-300 border-orange-400/30">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50 text-white">
                          <p>View profile</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700/50" />
                          <DropdownMenuItem 
                            className={user.isVerified 
                              ? "text-red-400 hover:text-red-300 hover:bg-red-900/20"
                              : "text-green-400 hover:text-green-300 hover:bg-green-900/20"
                            }
                            onClick={() => onStatusUpdate(user.id, !user.isVerified)}
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {user.isVerified ? 'Suspend User' : 'Activate User'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default UserTable;