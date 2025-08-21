"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const donorSchema = z.object({
  donorName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  donorEmail: z.string().email({ message: "Invalid email address." }),
  donorPhone: z.string().regex(/^[0-9]{10,15}$/, { message: "Invalid phone number." }),
  donorBloodGroup: z.string({ required_error: "Please select a blood group." }),
  donorLastDonation: z.date().optional(),
  donorLocation: z.string().min(2, { message: "Location is required." }),
  donorConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to continue.",
  }),
});

export default function DonorPortal() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof donorSchema>>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      donorLocation: "",
      donorConsent: false,
    },
  });

  function onSubmit(values: z.infer<typeof donorSchema>) {
    console.log(values);
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering as a donor. You will receive alerts based on your blood group and location.",
    });
    form.reset();
  }

  return (
    <section aria-label="Donor Portal Section" className="glass-container p-10 shadow-lg" id="donor" tabIndex={0}>
      <h2 className="text-5xl font-extrabold font-headline text-red-300 mb-10 text-center drop-shadow-lg">
        Donor Portal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <h3 className="text-3xl font-bold font-headline mb-6 text-red-400 drop-shadow-md">
            Register as a Donor
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="donorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="donorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="donorPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+911234567890" type="tel" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="donorBloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Blood Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="form-input">
                          <SelectValue placeholder="Select your blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-red-900 text-white">
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Bombay (hh)"].map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="donorLastDonation"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="block font-semibold mb-2 text-white">Last Donation Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "form-input justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-red-800 border-red-600" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                     <p className="text-sm text-red-300 mt-1 italic select-none">Leave blank if never donated before.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="donorLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block font-semibold mb-2 text-white">Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State or ZIP" {...field} className="form-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="donorConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-6 w-6 text-red-400 rounded focus:ring-red-300 focus:ring-2 border-white data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-red-300 select-none">
                        I consent to share my data for blood donation alerts and understand the privacy policy.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="btn-gradient w-full text-white font-extrabold py-4 h-auto text-base rounded-xl shadow-lg transition duration-300">
                Register
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <h3 className="text-3xl font-bold font-headline mb-6 text-red-400 drop-shadow-md text-center md:text-left">
            Nearby Blood Donation Camps & Hospitals
          </h3>
          <div className="w-full h-96 rounded-3xl overflow-hidden border-4 border-red-600 shadow-2xl">
            <Image 
              src="https://storage.googleapis.com/a1aa/image/8f5f08f3-586d-42f4-2389-df9c58e9e8ac.jpg" 
              alt="Map showing nearby blood donation camps and hospitals with markers indicating locations" 
              width={600} 
              height={384} 
              className="w-full h-full object-cover"
              data-ai-hint="map donation"
            />
          </div>
          <p className="mt-5 text-red-300 text-sm italic select-none text-center md:text-left max-w-md mx-auto md:mx-0">
            The map displays verified blood donation camps and hospitals near your location. You will receive alerts based on your blood group and proximity.
          </p>
        </div>
      </div>
    </section>
  );
}
