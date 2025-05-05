"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface MultiDropdownSelectorProps {
  items: DropdownItem[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  width?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  maxDisplayItems?: number;
}

const MultiDropdownSelector: React.FC<MultiDropdownSelectorProps> = ({
  items,
  values = [],
  onChange,
  placeholder = "Select items",
  label,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  width = "w-full",
  side = "bottom",
  align = "start",
  maxDisplayItems = 3,
}) => {
  const [open, setOpen] = React.useState(false);
  
  const selectedItems = React.useMemo(() => {
    return items.filter((item) => values.includes(item.id));
  }, [items, values]);

  const handleSelect = (itemId: string) => {

    if (values.includes(itemId)) {
      onChange(values.filter((id) => id !== itemId));
    } else {
      onChange([...values, itemId]);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const handleRemoveItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(values.filter((id) => id !== itemId));
  };

  const displayBadges = () => {
    if (selectedItems.length === 0) {
      return null;
    }

    const displayItems = selectedItems.slice(0, maxDisplayItems);
    const remainingCount = selectedItems.length - maxDisplayItems;

    return (
      <div className="flex flex-wrap gap-1">
        {displayItems.map((item) => (
          <Badge 
            key={item.id} 
            
            className="flex items-center gap-1 px-2 py-0.5 bg-primary/80 text-white"
          >
            {item.label}
            <X 
              className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
              onClick={(e) => handleRemoveItem(item.id, e)} 
            />
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="secondary">+{remainingCount} more</Badge>
        )}
      </div>
    );
  };

  const displayText = () => {
    if (selectedItems.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    } else if (selectedItems.length === 1) {
      return selectedItems[0].label;
    } else {
      return `${selectedItems.length} items selected`;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {label && <label className="font-medium text-sm">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`${width} justify-between relative min-h-10`}
            disabled={disabled}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 text-left overflow-hidden">
                {selectedItems.length > 0 && selectedItems.length <= maxDisplayItems
                  ? displayBadges()
                  : displayText()}
              </div>
              {selectedItems.length > 0 && (
                <X
                  className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
                  onClick={handleClearAll}
                />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 min-w-[200px]" side={side} align={align}>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.id)}
                  >
                    <div className="flex items-center flex-1">
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.label}</span>
                    </div>
                    {values.includes(item.id) && (
                      <Check className="ml-2 h-4 w-4 shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiDropdownSelector;