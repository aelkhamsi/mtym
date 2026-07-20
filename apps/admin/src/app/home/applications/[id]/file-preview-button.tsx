'use client'

import {
  Dialog,
  DialogContent,
} from "@/components/shared/dialog"
import { getSignedPreviewURL } from "@/api/MediaApi";
import { useState } from "react";
import { Button } from "@/components/shared/button";
import { Link1Icon } from "@radix-ui/react-icons";

const EXTENSION_TO_MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  pdf: 'application/pdf',
};

const FilePreview = ({ url, mimeType, filename }:{
  url: string;
  mimeType: string;
  filename?: string;
}) => {
  const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (IMAGE_TYPES.includes(mimeType)) {
    return (
      <img
        src={url}
        alt={filename ?? 'preview'}
        className="max-w-full max-h-[600px] object-contain rounded-md border"
      />
    );
  }

  if (mimeType === 'application/pdf') {
    return (
      <iframe
        src={url}
        title={filename ?? 'PDF preview'}
        className="w-full h-[600px] rounded-md border"
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-[300px] border rounded-md text-sm text-muted-foreground">
      Preview not available —{' '}
      <a href={url} target="_blank" rel="noreferrer" className="underline ml-1">
        open file
      </a>
    </div>
  );
}

const getMimeTypeFromFilename = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  if (!extension) return 'application/octet-stream';
  return EXTENSION_TO_MIME[extension] ?? 'application/octet-stream';
}

const FilePreviewButton = ({
  filename,
}:{
  filename: string,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPreview = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { url } = await getSignedPreviewURL(filename) as { url: string };
      setPreviewUrl(url);
      setIsPreviewOpen(true);
    } catch (err) {
      console.error('Failed to fetch preview URL', err);
      setError('Could not load preview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const onClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewUrl(null);
  };

  return (
    <>
      <Button
        onClick={onPreview}
        disabled={isLoading}
      >
        Preview <Link1Icon className="ml-1"/>
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Dialog open={isPreviewOpen} onOpenChange={(open: boolean) => !open && onClosePreview()}>
        <DialogContent>
          {previewUrl && <FilePreview url={previewUrl} mimeType={getMimeTypeFromFilename(filename)} filename={filename} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FilePreviewButton;