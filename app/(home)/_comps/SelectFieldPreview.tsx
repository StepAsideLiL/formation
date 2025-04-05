import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { TSelectMetadata } from "@/lib/store";

export default function SelectFieldPreview() {
  const metadata: TSelectMetadata = {
    placeholder: "",
    description: "",
    options: ["New Option 1", "New Option 2"],
    defaultOption: "New Option 1",
  };

  return (
    <div className="w-full">
      <div className="border">
        <div className="flex items-center justify-between border-b p-1">
          <span>Field Type: Select</span>

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
                    <Icons.Select /> <span>Dropdown Options</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input type="text" placeholder="Field Label" />
          </div>

          <div className="space-y-2">
            <Separator />

            <Input type="text" placeholder="Dropdown Placeholder Text" />

            <Input type="text" placeholder="Field Description" />

            <div className="flex w-full gap-2">
              <div className="w-1/2 space-y-1">
                <h2 className="text-xs">Options</h2>
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

              <div className="w-1/2 space-y-1">
                <h2 className="text-xs">Select default option</h2>

                <RadioGroup
                  value={metadata.defaultOption}
                  className="space-x-2"
                >
                  {metadata.options?.map((option, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="cursor-pointer"
                      />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
