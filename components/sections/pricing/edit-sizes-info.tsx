"use client";

import { CircleHelp } from "lucide-react";
import { useState, type ComponentType } from "react";

import { cn } from "@/lib/utils";

type EditSizesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditSizesInfo() {
  const [open, setOpen] = useState(false);
  const [Dialog, setDialog] = useState<ComponentType<EditSizesDialogProps> | null>(null);

  function openDialog() {
    if (Dialog) {
      setOpen(true);
      return;
    }

    void import("./edit-sizes-dialog").then((mod) => {
      setDialog(() => mod.EditSizesDialog);
      setOpen(true);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground",
          "transition-hairline hover:text-foreground",
          "underline decoration-border underline-offset-4 hover:decoration-foreground/40"
        )}
      >
        <CircleHelp className="size-3.5" aria-hidden />
        What counts as an edit?
      </button>
      {Dialog ? <Dialog open={open} onOpenChange={setOpen} /> : null}
    </>
  );
}
