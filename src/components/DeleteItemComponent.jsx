import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeleteItemComponent() {
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
  ]);
  const [itemToDelete, setItemToDelete] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    if (!itemToDelete.trim()) {
      alert("Please enter an item to delete");
      return;
    }

    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    setItems(items.filter((item) => item !== itemToDelete));
    setItemToDelete("");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Current Items</h2>
      <ul className="mb-4">
        {items.map((item, index) => (
          <li key={index} className="py-1">
            {item}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={itemToDelete}
          onChange={(e) => setItemToDelete(e.target.value)}
          placeholder="Enter item to delete"
          className="flex-1"
        />
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{itemToDelete}" from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}