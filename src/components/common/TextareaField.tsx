import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export function TextareaField({
  id,
  label,
  value,
  onChange,
  disabled = false,
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="min-h-[150px]"
      />
    </div>
  );
}
