// src/Components/Dashboard/SettingsRow.tsx
import React from 'react';
import { Switch } from '@/ui/switch';
import { Button } from '@/ui/button';
import { ChevronRight } from 'lucide-react';

interface SettingsRowProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action: 'button' | 'switch' | 'navigation';
  actionLabel?: string;
  onAction?: () => void;
  switchState?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

export default function SettingsRow({
    icon: Icon,
    title,
    description,
    action,
    actionLabel,
    onAction,
    switchState,
    onSwitchChange
}: SettingsRowProps) {

  const renderAction = () => {
    switch (action) {
      case 'button':
        return <Button variant="outline" size="sm" onClick={onAction} className="bg-white/50 border-gray-300/70 hover:bg-white">{actionLabel}</Button>;
      case 'switch':
        return <Switch checked={switchState} onCheckedChange={onSwitchChange} />;
      case 'navigation':
        return <ChevronRight className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="w-6 h-6 text-emerald-700" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {renderAction()}
    </div>
  );
}