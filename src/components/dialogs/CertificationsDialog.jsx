import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeInfoContext";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const formField = {
  name: "",
  organization: "",
  issueMonth: "",
  issueYear: "",
};

export default function CertificationsDialog({ isOpen, onClose }) {
  const { resumeInfo, setResumeInfo } = useResume();
  const [certificationsList, setCertificationsList] = useState(
    resumeInfo.certifications ? resumeInfo.certifications : [formField]
  );

  const handleChange = (index, eOrValue, fieldName = null) => {
    setCertificationsList((prevList) => {
      const updatedList = [...prevList];
      if (typeof eOrValue === "object" && eOrValue.target) {
        const { name, value } = eOrValue.target;
        updatedList[index] = { ...updatedList[index], [name]: value };
      } else if (fieldName) {
        updatedList[index] = { ...updatedList[index], [fieldName]: eOrValue };
      }
      return updatedList;
    });
  };

  const addMore = () => {
    setCertificationsList([...certificationsList, formField]);
  };

  const handleSave = () => {
    setResumeInfo((prev) => ({
      ...prev,
      certifications: [...certificationsList],
    }));
    toast.info("Certifications Updated");
    onClose();
  };

  const haschanges = () => {
    if (certificationsList.length !== resumeInfo.certifications.length) {
      return true;
    }
    return certificationsList.some((cert, index) => {
      const originalCert = resumeInfo.certifications[index];
      if (!originalCert) return true;

      return (
        cert.name !== originalCert.name ||
        cert.organization !== originalCert.organization ||
        cert.issueMonth !== originalCert.issueMonth ||
        cert.issueYear !== originalCert.issueYear
      );
    });
  };

  const deleteThis = (index) => {
    const newList = certificationsList.filter((_, i) => i !== index);
    setCertificationsList(newList);
    /*setResumeInfo((prev) => ({
      ...prev,
      certifications: newList,
    }));*/
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] sm:min-w-[700px] sm:min-h-[550px] p-0 gap-0">
        <DialogHeader className="border-b px-6 pt-6 pb-3">
          <DialogTitle>Certifications</DialogTitle>
          <DialogDescription>Add or edit your certifications</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[450px]">
          <div className="space-y-3 md:space-y-4 p-3 md:p-6">
            {certificationsList?.map((item, index) => (
              <div
                className="space-y-3 md:space-y-4 p-3 md:p-4 bg-accent/30 border rounded-lg relative"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-primary text-sm md:text-base">
                    #{index + 1}
                  </h3>
                  {/* Delete button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 cursor-pointer text-muted-foreground hover:text-destructive"
                    onClick={() => deleteThis(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* Certification Name */}
                  <div className="col-span-2 sm:col-span-1">
                    <Label className="text-xs md:text-sm">
                      Certification Name
                    </Label>
                    <Input
                      onChange={(e) => handleChange(index, e)}
                      value={item.name}
                      name="name"
                      className="mt-1 md:mt-2 text-sm h-9"
                      placeholder="e.g., AWS Certified Solutions Architect"
                    />
                  </div>

                  {/* Issuing Organization */}
                  <div>
                    <Label className="text-xs md:text-sm">
                      Issuing Organization
                    </Label>
                    <Input
                      onChange={(e) => handleChange(index, e)}
                      value={item.organization}
                      name="organization"
                      className="mt-1 md:mt-2 text-sm h-9"
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* Issue Month */}
                  <div>
                    <Label className="text-xs md:text-sm">Issue Month</Label>
                    <Select
                      onValueChange={(value) =>
                        handleChange(index, value, "issueMonth")
                      }
                      value={item.issueMonth}
                    >
                      <SelectTrigger className="mt-1 md:mt-2 text-sm !h-9">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <SelectItem
                            key={month}
                            value={month}
                            className="text-sm"
                          >
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Issue Year */}
                  <div>
                    <Label className="text-xs md:text-sm">Issue Year</Label>
                    <Select
                      onValueChange={(value) =>
                        handleChange(index, value, "issueYear")
                      }
                      value={item.issueYear}
                    >
                      <SelectTrigger className="mt-1 md:mt-2 text-sm !h-9">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 20 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <SelectItem
                            key={year}
                            value={year.toString()}
                            className="text-sm"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Certification Button */}
            <Button
              variant="ghost"
              onClick={addMore}
              className="mt-4"
              size="sm"
            >
              <Plus size={16} className="mr-2" />
              Add Certification
            </Button>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t px-6 py-3">
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={!haschanges()}
            size="sm"
            className="min-w-[100px]"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
