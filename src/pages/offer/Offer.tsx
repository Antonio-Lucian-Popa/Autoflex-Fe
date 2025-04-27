/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createCar } from "@/services/api";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import { TextareaField } from "@/components/common/TextareaField";

export default function Offer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    power: "",       // <-- adăugat
    seats: "",      // <-- adăugat
    transmission: "",
    fuelType: "",
    price: "",
    location: "",
    description: "",
    features: [] as string[],
    feature: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Eroare", { description: "Te rugăm să încarci cel puțin o imagine." });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      const carData = {
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        power: parseInt(formData.power), // <-- adăugat
        seats: parseInt(formData.seats), // <-- adăugat
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        price: parseFloat(formData.price),
        location: formData.location,
        description: formData.description,
        features: formData.features,
      };

      formDataToSend.append('car', new Blob([JSON.stringify(carData)], { type: 'application/json' }));
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await createCar(formDataToSend);

      toast.success("Mașină adăugată cu succes", {
        description: "Vei fi redirecționat către pagina ta de mașini...",
      });

      setTimeout(() => {
        navigate(`/cars`);
      }, 3000);

      setFormData({
        brand: "",
        model: "",
        year: "",
        power: "",       // <-- adăugat
        seats: "",      // <-- adăugat  
        transmission: "",
        fuelType: "",
        price: "",
        location: "",
        description: "",
        features: [],
        feature: "",
      });
      setImages([]);
      setImagesPreviews([]);

    } catch (error: any) {
      toast.error("Eroare", {
        description: error.response?.data?.message || "A apărut o eroare la adăugarea mașinii.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      toast.error("Eroare", { description: "Poți încărca maxim 10 imagini." });
      return;
    }
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagesPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagesPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const addFeature = () => {
    if (formData.feature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, prev.feature.trim()],
        feature: "",
      }));
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Oferă mașina ta spre închiriere</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Câștigă bani extra oferind mașina ta spre închiriere în perioada în care nu o folosești.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Imagini upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium mb-2 block">Imagini</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagesPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-lg" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {images.length < 10 && (
                <div className="aspect-square relative border-2 border-dashed rounded-lg flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm mt-2">Adaugă imagini</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Câmpuri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="brand" label="Marcă" value={formData.brand} onChange={handleChange} disabled={isSubmitting} />
            <InputField id="model" label="Model" value={formData.model} onChange={handleChange} disabled={isSubmitting} />
            <InputField id="year" label="An fabricație" value={formData.year} type="number" onChange={handleChange} disabled={isSubmitting} min={1900} max={new Date().getFullYear()} />
            <InputField id="power" label="Putere (CP)" value={formData.power} type="number" onChange={handleChange} disabled={isSubmitting} />  {/* <-- Nou */}
            <InputField id="seats" label="Număr locuri" value={formData.seats} type="number" onChange={handleChange} disabled={isSubmitting} />  {/* <-- Nou */}
            <SelectField label="Cutie de viteze" name="transmission" value={formData.transmission} onChange={handleSelectChange} options={["AUTOMATIC", "MANUAL"]} disabled={isSubmitting} />
            <SelectField label="Combustibil" name="fuelType" value={formData.fuelType} onChange={handleSelectChange} options={["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"]} disabled={isSubmitting} />
            <InputField id="price" label="Preț pe zi (RON)" value={formData.price} type="number" onChange={handleChange} disabled={isSubmitting} />
          </div>

          <SelectField label="Locație" name="location" value={formData.location} onChange={handleSelectChange} options={["București", "Cluj-Napoca", "Timișoara", "Iași", "Brașov", "Constanța"]} disabled={isSubmitting} />

          <TextareaField id="description" label="Descriere" value={formData.description} onChange={handleChange} disabled={isSubmitting} />

          {/* Dotări */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Dotări</label>
            <div className="flex items-end gap-2">
              <InputField id="feature" label="" value={formData.feature} onChange={handleChange} disabled={isSubmitting} />
              <Button type="button" onClick={addFeature} disabled={!formData.feature.trim() || isSubmitting}>
                Adaugă
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="hover:text-destructive"
                    disabled={isSubmitting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se procesează...
              </>
            ) : (
              "Adaugă mașina"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
