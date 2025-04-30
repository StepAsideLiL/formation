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

export default function TextareaFieldPreview() {
  return (
    <div className="w-full">
      <div className="border">
        <div className="flex items-center justify-between border-b p-1">
          <span>Field Type: Textarea</span>

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
                    <Icons.OneLine /> <span>Paragraph Text</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input type="text" placeholder="Field Label" />
          </div>

          <div className="space-y-2">
            <Separator />

            <Input type="text" placeholder="Placeholder Text" />

            <Input type="text" placeholder="Field Description" />
          </div>
        </div>
      </div>
    </div>
  );
}
