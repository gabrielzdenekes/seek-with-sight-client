import { useState, useRef, useEffect, useCallback } from "react";

export interface PreviewImage {
    id: string;
    file: File;
    previewUrl: string;
}

export function useProductMediaUpload() {
    const [images, setImages] = useState<PreviewImage[]>([]);
    const imagesRef = useRef(images);

    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const newImages: PreviewImage[] = Array.from(e.target.files).map((file) => ({
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
        e.target.value = "";
    };

    const handleRemoveImage = (idToRemove: string) => {
        setImages((prev) => {
            const imageToRemove = prev.find((img) => img.id === idToRemove);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.previewUrl);
            }
            return prev.filter((img) => img.id !== idToRemove);
        });
    };

    const clearImages = useCallback(() => {
        imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        setImages([]);
    }, []);

    useEffect(() => {
        return () => {
            imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        };
    }, []);

    return {
        images,
        rawFiles: images.map((img) => img.file),
        handleImageUpload,
        handleRemoveImage,
        clearImages,
    };
}
