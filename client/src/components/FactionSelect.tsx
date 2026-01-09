import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { FACTIONS } from "@shared/schema";

interface FactionSelectProps {
  value: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function FactionSelect({ value, onSelect, className }: FactionSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between bg-card/50 border-white/10 hover:bg-card hover:border-primary/50 text-left font-normal", className)}
        >
          <span className="truncate">
            {value ? value : "Select Faction..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-popover border-white/10">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search faction..." className="h-9" />
          <CommandList>
            <CommandEmpty>No faction found.</CommandEmpty>
            <CommandGroup>
              {FACTIONS.map((faction) => (
                <CommandItem
                  key={faction}
                  value={faction}
                  onSelect={(currentValue) => {
                    onSelect(currentValue); // Using exact string match from array
                    setOpen(false);
                  }}
                  className="cursor-pointer hover:bg-white/5 data-[selected=true]:bg-primary/20"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      value === faction ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {faction}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
