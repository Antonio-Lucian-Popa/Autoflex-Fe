import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: string[];
  disabled?: boolean;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select
        value={value}
        onValueChange={(selectedValue) => onChange(name, selectedValue)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Alege ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
