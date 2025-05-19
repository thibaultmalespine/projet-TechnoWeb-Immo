"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Annonce, createAnnonce } from "@/lib/services/annoncesServices";
import { uploadMultipleImages } from "@/lib/services/uploadServices";
import { validateImageFile } from "@/lib/utils";
import { AlertCircle, ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const typeBiens = [
  "Appartement",
  "Maison",
  "Villa",
  "Terrain",
  "Local commercial",
];

export default function CreateAnnoncePage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const form = useForm<Annonce>({
    defaultValues: {
      nomannonce: "",
      urloriginale: "",
      descriptionbien: "",
      typedebien: "",
      codepostal: "",
      nomville: "",
      prix: 0,
      m2habitable: 0,
      m2terrains: 0,
      meuble: false,
      particulierpro: "Particulier",
      garage: false,
      piscine: false,
      lecompte: "",
      cheminsimages: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const newFiles = e.target.files;
    if (!newFiles) return;

    handleFiles(Array.from(newFiles));
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];
    let hasError = false;

    for (const file of files) {
      if (validateImageFile(file)) {
        validFiles.push(file);
      } else {
        hasError = true;
      }
    }

    if (hasError) {
      setUploadError(
        "Certains fichiers n'ont pas été acceptés. Formats autorisés: JPG, PNG, GIF, WEBP. Taille max: 5MB"
      );
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  async function onSubmit(values: Annonce) {
    setSubmitError(null);
    setLoading(true);

    try {
      if (uploadedFiles.length > 0) {
        const imagePaths = await uploadMultipleImages(uploadedFiles);
        values.cheminsimages = imagePaths;
      }

      await createAnnonce(values);
      router.push("/annonce");
    } catch (err) {
      setSubmitError(
        (err as Error).message || "Erreur lors de la création de l'annonce"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/annonce")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux annonces
      </Button>

      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Créer une nouvelle annonce</h1>

        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nomannonce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l&apos;annonce *</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Ex: Bel appartement avec vue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typedebien"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de bien</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de bien" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeBiens.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descriptionbien"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre bien..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Images du bien</FormLabel>

              {uploadError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              <div
                className={`border-2 border-dashed rounded-md p-6 text-center ${
                  dragActive ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-500" />
                  <p className="text-sm text-gray-600">
                    Glissez et déposez vos images ici ou
                  </p>
                  <label className="cursor-pointer text-sm text-primary hover:text-primary/80">
                    Parcourir vos fichiers
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, GIF, WEBP (max 5MB)
                  </p>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border">
                        <div className="h-full w-full relative">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-xs mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nomville"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Paris" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codepostal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 75001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 250000"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="particulierpro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de vendeur</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type de vendeur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Particulier">Particulier</SelectItem>
                        <SelectItem value="Professionnel">
                          Professionnel
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="m2habitable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface habitable (m²)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 75"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="m2terrains"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surface terrain (m²)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 500"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="urloriginale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL originale</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://www.exemple.com/annonce"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    L&apos;URL d&apos;origine de l&apos;annonce si applicable
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="meuble"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Meublé</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="garage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Garage</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="piscine"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Piscine</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Création en cours..." : "Créer l'annonce"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}