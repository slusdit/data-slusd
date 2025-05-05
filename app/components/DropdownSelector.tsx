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
import { Check } from "lucide-react";

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownSelectorProps {
  items: DropdownItem[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  width?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  items,
  value,
  onChange,
  placeholder = "Select an item",
  label,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  width = "w-full",
  side = "bottom",
  align = "start",
}) => {
  const [open, setOpen] = React.useState(false);
  
  const selectedItem = React.useMemo(() => {
    return items.find((item) => item.id === value);
  }, [items, value]);

  const handleSelect = (itemId: string) => {
    onChange(itemId);
    setOpen(false);
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
            className={`${width} justify-between`}
            disabled={disabled}
          >
            {selectedItem ? (
              <div className="flex items-center">
                {selectedItem.icon && <span className="mr-2">{selectedItem.icon}</span>}
                <span>{selectedItem.label}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side={side} align={align}>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={handleSelect}
                  >
                    <div className="flex items-center flex-1">
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.label}</span>
                    </div>
                    {item.id === value && (
                      <Check className="ml-2 h-4 w-4" />
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

export default DropdownSelector;