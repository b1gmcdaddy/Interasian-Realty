"use client";

import {useState} from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<
    (result: boolean) => void
  >(() => () => {});
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
  }>({
    title: "",
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
  });

  const confirm = ({
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
  }: {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
  }) => {
    setDialogContent({title, description, confirmText, cancelText});
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setOpen(false);
    resolvePromise(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resolvePromise(false);
  };

  const dialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
          {dialogContent.description && (
            <AlertDialogDescription>
              {dialogContent.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} className="cursor-pointer">
            {dialogContent.cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="cursor-pointer">
            {dialogContent.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {confirm, dialog};
}
