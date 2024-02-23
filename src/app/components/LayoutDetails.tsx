import { useEffect, useState } from "react";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface LayoutDetailsProps {
  user_id: number;
}

interface WidgetData {
  widget_id: string;
}

const items = [
  {
    id: "1",
    label: "Analog Clocks",
  },
  {
    id: "2",
    label: "Embed Widget",
  },
  {
    id: "3",
    label: "Quotes",
  },
  {
    id: "4",
    label: "RSS News Reader",
  },
  {
    id: "5",
    label: "Crypto StockChart",
  },
  {
    id: "6",
    label: "Crypto Price Ticker",
  },
  {
    id: "7",
    label: "Crypto Portfolio Tracker",
  },
] as const;

const FormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function LayoutDetails({ user_id }: LayoutDetailsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [layoutId, setLayoutId] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      items: [],
    },
  });

  useEffect(() => {
    if (user_id) {
      axios
        .get(`/api/layout/${user_id}`)
        .then((response) => {
          const userData = response.data;
          setLayoutId(userData.layout_id);
          form.setValue("name", userData.layout_name);

          // Fetch layout widget details based on layout_id
          axios
            .get(`/api/layoutWidget/${userData.layout_id}`)
            .then((widgetResponse) => {
              const widgetData: WidgetData[] = widgetResponse.data;
              const widgetIds = widgetData.map((widget) =>
                widget.widget_id.toString()
              );
              const widgetIdsAsString = widgetIds.map((id) => id.toString());

              form.setValue("items", widgetIdsAsString);
            })
            .catch((widgetError) => {
              if (widgetError.response && widgetError.response.status === 404) {
              } else {
                console.error(
                  "Error fetching layout widget details:",
                  widgetError
                );
              }
            });
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            form.setValue("name", "");
          } else {
            console.error("Error fetching user details:", error);
          }
        });
    }
  }, [user_id, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      if (!user_id) {
        throw new Error("User ID is missing");
      }
      if (layoutId !== 0) {
        const layoutData = {
          layout_id: layoutId,
          layout_name: data.name,
          widgets: data.items.map((item) => ({
            widget_id: parseInt(item),
          })),
        };
        const response = await axios.put(
          `/api/layout/update/${user_id}`,
          layoutData
        );
        toast({
          title: "Layout submitted successfully",
          description: `Widgets have been modified to ${response.data.layout_name}!`,
        });
      } else {
        const layoutData = {
          user_id: user_id,
          layout_name: data.name,
          widgets: data.items.map((item) => ({
            widget_id: parseInt(item),
          })),
        };
        const response = await axios.post("/api/layout/create", layoutData);
        toast({
          title: "Layout submitted successfully",
          description: `Widgets have been added to ${response.data.layout_name}!`,
        });
      }
    } catch (error) {
      console.error("Error submitting layout:", error);
      toast({
        title: "Error submitting layout",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Layout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Layout</DialogTitle>
          <DialogDescription>
            Make changes to your Layout here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Layout name" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Widgets</FormLabel>
                      <FormDescription>
                        Select the items you want to display.
                      </FormDescription>
                    </div>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: boolean) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
