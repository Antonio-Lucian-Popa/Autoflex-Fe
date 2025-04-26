/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createReview } from "@/services/api"; // sau unde ai definit `createReview`
import { Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { BASE_PATH } from "@/lib/constant";

export default function AddReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Eroare", { description: "Te rugăm să selectezi un rating" });
      return;
    }

    if (!id) {
      toast.error("Eroare", { description: "ID-ul mașinii nu a fost găsit." });
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview({
        carId: id,
        rating,
        comment,
      });
      toast.success("Recenzie adăugată", { description: "Îți mulțumim pentru feedback!" });
      navigate(`${BASE_PATH}/cars/${id}`);
    } catch (error: any) {
      toast.error("Eroare", {
        description: error.response?.data?.message || "A apărut o eroare la adăugarea recenziei",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Adaugă o recenzie</h1>
        <p className="text-xl text-muted-foreground">
          Spune-ne părerea ta despre experiența cu această mașină
        </p>
      </div>

      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(value)}
                  disabled={isSubmitting}
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comentariu</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setComment(e.target.value)}
              required
              className="min-h-[150px]"
              placeholder="Spune-ne mai multe despre experiența ta..."
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Se procesează..." : "Adaugă recenzie"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
