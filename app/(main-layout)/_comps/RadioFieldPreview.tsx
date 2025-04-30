import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Icons from "@/lib/icons";
import { TRadioMetadata } from "@/lib/store";

export default function RadioFieldPreview() {
  const metadata: TRadioMetadata = {
    description: "",
    options: ["New Option 1", "New Option 2"],
  };

  return (
    <div className="w-full">
      <div className="border">
        <div className="flex items-center justify-between border-b p-1">
          <span>Field Type: Radio</span>

          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="is-required"
                className="cursor-pointer"
                checked={true}
              />
              <Label
                htmlFor="is-required"
                className="cursor-pointer font-normal"
              >
                Field Required
              </Label>
            </div>

            <Button
              variant={"outline"}
              size={"icon"}
              className="size-4 cursor-pointer"
              asChild
            >
              <span className="p-3">
                <Icons.Trash className="text-destructive" />
              </span>
            </Button>
          </div>
        </div>

        <div className="space-y-2 p-1">
          <div className="flex items-center gap-3">
            <div className="w-56">
              <Select defaultValue={"input"}>
                <SelectTrigger className="w-56 cursor-pointer">
                  <SelectValue placeholder={"Select a field type"} />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    className="cursor-pointer items-center"
                    value={"input"}
                  >
                    <Icons.Choice /> <span>Multiple Choice</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input type="text" placeholder="Field Label" />
          </div>

          <div className="space-y-2">
            <Separator />

            <Input type="text" placeholder="Field Description" />

            <div className="space-y-1">
              <h2 className="text-xs">Multiple Choice Options</h2>
              {metadata.options?.map((option, i) => {
                return (
                  <div key={i} className="relative">
                    <Input
                      placeholder="Option"
                      className="w-full"
                      defaultValue={option}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="text-destructive size-4 cursor-pointer"
                      asChild
                    >
                      <Icons.Trash className="absolute top-2 right-2" />
                    </Button>
                  </div>
                );
              })}
              <Button variant={"outline"} className="cursor-pointer">
                Add Option
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
