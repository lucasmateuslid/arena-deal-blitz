import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

interface Car {
  id: string;
  titulo: string;
  imagem_url: string;
  preco_original: number;
  preco_venda: number;
}

export const CarManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [precoOriginal, setPrecoOriginal] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const { data, error } = await supabase
      .from("car_deals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar carros");
      return;
    }

    setCars(data || []);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Por favor, selecione uma imagem");
      return;
    }

    setLoading(true);

    try {
      // Upload image
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("car-deals")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("car-deals")
        .getPublicUrl(fileName);

      // Insert car
      const { error: insertError } = await supabase.from("car_deals").insert({
        titulo,
        imagem_url: publicUrl,
        preco_original: parseFloat(precoOriginal),
        preco_venda: parseFloat(precoVenda),
      });

      if (insertError) throw insertError;

      toast.success("Carro adicionado com sucesso!");
      setTitulo("");
      setPrecoOriginal("");
      setPrecoVenda("");
      setImageFile(null);
      setImagePreview("");
      loadCars();
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar carro");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id: string, imageUrl: string) => {
    if (!confirm("Tem certeza que deseja deletar este carro?")) return;

    try {
      // Delete from storage
      const fileName = imageUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("car-deals").remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from("car_deals")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Carro deletado com sucesso!");
      loadCars();
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar carro");
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Carro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCar} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preco-original">Preço Original (R$)</Label>
                <Input
                  id="preco-original"
                  type="number"
                  step="0.01"
                  value={precoOriginal}
                  onChange={(e) => setPrecoOriginal(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco-venda">Preço de Venda (R$)</Label>
                <Input
                  id="preco-venda"
                  type="number"
                  step="0.01"
                  value={precoVenda}
                  onChange={(e) => setPrecoVenda(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagem">Imagem do Carro</Label>
              <Input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full max-w-xs rounded-lg"
                />
              )}
            </div>

            <Button type="submit" disabled={loading}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Adicionando..." : "Adicionar Carro"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carros Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <Card key={car.id}>
                <CardContent className="p-4">
                  <img
                    src={car.imagem_url}
                    alt={car.titulo}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold mb-2">{car.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    De: R$ {car.preco_original.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-lg font-bold text-primary mb-4">
                    Por: R$ {car.preco_venda.toLocaleString("pt-BR")}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCar(car.id, car.imagem_url)}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deletar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
