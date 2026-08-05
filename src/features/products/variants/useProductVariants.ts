import { useState, useCallback, useEffect, useRef } from "react";
import type { PreviewImage } from "@/features/products/create/useProductMediaUpload";

export interface DraftVariant {
    id: string;
    title: string;
    sku: string;
    price: string;
    quantity: string;
    images: PreviewImage[];
}

export function useProductVariants() {
    const [variants, setVariants] = useState<DraftVariant[]>([]);
    const variantsRef = useRef(variants);

    useEffect(() => {
        variantsRef.current = variants;
    }, [variants]);

    const addVariant = useCallback(() => {
        const newVariant: DraftVariant = {
            id: crypto.randomUUID(),
            title: "",
            sku: "",
            price: "",
            quantity: "1",
            images: []
        };
        setVariants((prev) => [...prev, newVariant]);
    }, []);

    const removeVariant = useCallback((variantId: string) => {
        setVariants((prev) => {
            const target = prev.find((v) => v.id === variantId);
            if (target) {
                target.images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
            }
            return prev.filter((v) => v.id !== variantId);
        });
    }, []);

    const updateVariant = useCallback((variantId: string, field: keyof DraftVariant, value: string) => {
        setVariants((prev) =>
            prev.map((v) => (v.id === variantId ? { ...v, [field]: value } : v))
        );
    }, []);

    const handleVariantImageUpload = useCallback((variantId: string, files: FileList | null) => {
        if (!files?.length) return;

        const newImages: PreviewImage[] = Array.from(files).map((file) => ({
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setVariants((prev) =>
            prev.map((v) =>
                v.id === variantId
                    ? { ...v, images: [...v.images, ...newImages] }
                    : v
            )
        );
    }, []);

    const handleRemoveVariantImage = useCallback((variantId: string, imageId: string) => {
        setVariants((prev) =>
            prev.map((v) => {
                if (v.id !== variantId) return v;
                const imgToRemove = v.images.find((img) => img.id === imageId);
                if (imgToRemove) {
                    URL.revokeObjectURL(imgToRemove.previewUrl);
                }
                return {
                    ...v,
                    images: v.images.filter((img) => img.id !== imageId)
                };
            })
        );
    }, []);

    const clearVariants = useCallback(() => {
        variantsRef.current.forEach((v) => {
            v.images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        });
        setVariants([]);
    }, []);

    useEffect(() => {
        return () => {
            variantsRef.current.forEach((v) => {
                v.images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
            });
        };
    }, []);

    return {
        variants,
        addVariant,
        removeVariant,
        updateVariant,
        handleVariantImageUpload,
        handleRemoveVariantImage,
        clearVariants
    };
}
